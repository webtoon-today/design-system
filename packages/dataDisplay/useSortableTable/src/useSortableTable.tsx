import { useCallback, useEffect, useMemo, useState } from 'react';

type SortableTableDataType<V extends Object> = Map<keyof V, Array<V[keyof V]>>;

const unique = <T,>(val: T, idx: number, arr: T[]) => arr.indexOf(val) === idx;

const _initalizeConvertedData = <V extends Object,>(data: V[], keys: (keyof V)[]) => {
    const initTableData: SortableTableDataType<V> = new Map();

    keys.forEach((key) => {
        initTableData.set(key, []);
    });

    data.forEach((rowData) => {
        (Object.keys(rowData) as (keyof V)[]).forEach((key) => {
            const targetMapArray = initTableData.get(key);

            if (targetMapArray === undefined) {
                throw new Error('Can not find key in data');
            }

            targetMapArray.push(rowData[key]);
        });
    });
    return initTableData;
}

const useSortableTable = <V extends Object>(data: V[]) => {
    type K = keyof V;

    const [convertedData, setConvertedData] = useState<SortableTableDataType<V> | undefined>(undefined);
    const [sortedData, setSortedData] = useState<V[]>(() => data);
    const [key, setKey] = useState<K>();
    const [compareFn, setCompareFn] = useState<(a: any, b: any) => number>();

    useEffect(() => {
        if (data.length === 0) {
            return;
        }
        const keys = data.map(row => Object.keys(row) as K[]).flat().filter(unique);

        setConvertedData(_initalizeConvertedData(data, keys));
    }, [data]);
    
    /** validate params and pass key, compareFn */
    const sort = useCallback((key: K, compareFn: (a: any, b: any) => number) => {
        if (convertedData === undefined) {
            throw new Error('tableData is not initialized');
        }

        if (!key || !compareFn){
            throw new Error('sort parameters are not given');
        }

        const keys = [...convertedData.keys()];

        if (keys.length === 0) {
            return;
        }

        const targetColumn = convertedData.get(key);

        if (targetColumn === undefined) {
            throw new Error('Can not find key in data');
        }

        setKey(key);
        setCompareFn(()=>compareFn);

    }, [convertedData]);

    /** sort data depends on convertedData, key, compareFn */
    useEffect(()=>{
        if (!convertedData || !key || !compareFn){
            return;
        }
        
        const keys = [...convertedData.keys()];
        
        const targetColumn = convertedData.get(key);

        if (targetColumn === undefined) {
            setKey(undefined);
            setCompareFn(undefined);
            console.error('Can not find key in data');
            return;
        }

        const sortedIndex = targetColumn
            .map((v, i) => ({ v, i }))
            .sort((a, b) => compareFn(a.v, b.v))
            .map((sorted) => sorted.i);

        const newSortedData = sortedIndex.map((index) =>
            keys.map((key) => {
                return { [key]: targetColumn[index] };
            }).reduce((lhs, rhs) => {
                return {...lhs, ...rhs}; 
            }, {} as V)
        );
        
        setSortedData(newSortedData);
    
    },[convertedData, key, compareFn])

    const initializeSort = useCallback(() => {

        const keys = data.map(row => Object.keys(row) as K[]).flat().filter(unique);

        if (keys.length === 0) {
            return;
        }
        setConvertedData(_initalizeConvertedData(data, keys));
        setSortedData(data);
    }, [data]);

    const sortableTable = {
        sort,
        initializeSort,
        sortedData
    };

    return sortableTable;
}

export default useSortableTable;