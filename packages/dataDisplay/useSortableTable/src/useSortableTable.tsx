import { useCallback, useEffect, useMemo, useState } from 'react';

type SortableTableDataType<V extends Object> = Map<keyof V, Array<V[keyof V]>>;

const unique = <T,>(val: T, idx: number, arr: T[]) => arr.indexOf(val) === idx;

const _initalizeConvertedData = <V extends Object,>(data: V[]) => {
    type K = keyof V;
    const initTableData: SortableTableDataType<V> = new Map();
    const keys = data.map(row => Object.keys(row) as K[]).flat().filter(unique);

    if (keys.length === 0) {
        return initTableData;
    }

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


    /** sort data depends on convertedData, key, compareFn */
const _updateSortedData = <V extends object>(
    convertedData: SortableTableDataType<V>,
    setSortedData: React.Dispatch<React.SetStateAction<V[]>>,
    key?: keyof V,
    compareFn?: (a: any, b: any) => number
)=>{
    
    const revertDataInOrder = <V extends object>(convertedData: SortableTableDataType<V>, order?: number[]) => {

        const keys = [...convertedData.keys()];
            
        const sortedIndex = order
            ?? Array(convertedData.get(keys[0])?.length).fill(null).map((v,index) => index);

        const sortedData = sortedIndex.map((index) => 
            keys.map((key) => {
                return { [key]: (convertedData.get(key)||[])[index] };
            }).reduce((lhs, rhs) => {
                return {...lhs, ...rhs}; 
            }, {} as V)
        )

        return sortedData;
    }

    if (!convertedData || convertedData.size === 0){
        setSortedData([]);
        return;
    }
    
    if (!key || !compareFn){
        setSortedData(revertDataInOrder(convertedData));;
        return;
    }
    
    const targetColumn = convertedData.get(key);

    if (targetColumn === undefined) {
        console.error('Can not find key in data');
        return;
    }

    const sortedIndex = targetColumn
        .map((v, i) => ({ v, i }))
        .sort((a, b) => compareFn(a.v, b.v))
        .map((sorted) => sorted.i);
        
    setSortedData(revertDataInOrder(convertedData, sortedIndex));

}

const useSortableTable = <V extends Object>(data: V[]) => {
    type K = keyof V;

    const [convertedData, setConvertedData] = useState<SortableTableDataType<V> | undefined>(undefined);
    const [sortedData, setSortedData] = useState<V[]>(() => data);
    const [key, setKey] = useState<K>();
    const [compareFn, setCompareFn] = useState<(a: any, b: any) => number>();

    useEffect(() => {
        const newConvertedData = _initalizeConvertedData(data);
        setConvertedData(newConvertedData);
        
        _updateSortedData(newConvertedData, setSortedData, key, compareFn);
    }, [data]);
    
    /** validate params and pass key, compareFn */
    const sort = useCallback((key: K, compareFn: (a: any, b: any) => number) => {
        if (convertedData === undefined) {
            throw new Error('tableData is not initialized');
        }

        if (!key || !compareFn){
            throw new Error('sort parameters are not given');
        }

        if (convertedData.get(key) === undefined) {
            throw new Error('Can not find key in data or data has no key');
        }

        setKey(key);
        setCompareFn(()=>compareFn);
        
        _updateSortedData(convertedData, setSortedData, key, compareFn);

    }, [convertedData]);

    const initializeSort = useCallback(() => {

        setConvertedData(_initalizeConvertedData(data));
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