import { useCallback, useEffect, useState } from 'react';

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

/**
 * 
 * @param convertedData 
 * @param key key가 주어지지 않은 경우 아무 키(구현상에서는 첫번째 키)를 사용, 최초의 정렬을 반환
 * @param compareFn compareFn이 없는 경우 최초의 정렬을 반환
 * @returns 
 */
const _revertDataInOrder = <V extends object>(
    convertedData?: SortableTableDataType<V>,
    key?: keyof V, // 
    compareFn?: (a: any, b: any) => number, // will use original order
) => {

    if (!convertedData || convertedData.size === 0){
        return [];
    }

    const keys = [...convertedData.keys()];

    const order = (()=>{
        const targetColumn = convertedData.get(key || keys[0]);
    
        if (targetColumn === undefined) {
            console.error('Can not find key in data');
            return Array(convertedData.get(key || keys[0])?.length).fill(null).map((_,i) => i);
        }

        if (!compareFn){
            return Array(targetColumn.length).fill(null).map((_,i) => i);
        }
    
        const sortedIndex = targetColumn
            .map((v, i) => ({ v, i }))
            .sort((a, b) => compareFn(a.v, b.v))
            .map((sorted) => sorted.i);
        
            return sortedIndex;
    })();
        
    const sortedData = order.map((index) => 
        keys.map((key) => {
            return { [key]: (convertedData.get(key)||[])[index] };
        }).reduce((lhs, rhs) => {
            return {...lhs, ...rhs}; 
        }, {} as V)
    )

    return sortedData;
}

const useSortableTable = <V extends Object>(data: V[]) => {
    type K = keyof V;

    const [convertedData, setConvertedData] = useState<SortableTableDataType<V> | undefined>(_initalizeConvertedData(data));
    const [key, setKey] = useState<K>();
    const [compareFn, setCompareFn] = useState<(a: any, b: any) => number>();

    useEffect(() => {

        setConvertedData(_initalizeConvertedData(data));
        
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
        
    }, [convertedData]);

    const initializeSort = useCallback(() => {

        setKey(undefined);
        setCompareFn(undefined);
        
    }, [data]);

    const sortableTable = {
        sort,
        initializeSort,
        sortedData: _revertDataInOrder(convertedData, key, compareFn)
    };

    return sortableTable;
}

export default useSortableTable;