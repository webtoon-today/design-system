import { useCallback, useEffect, useMemo, useState } from "react";

type SortableTableDataType<V extends Object, K extends keyof V> = Map<K, V[K][]>;

const useSortableTable = <V extends Object, K extends keyof V>(data: V[]) => {
    const [convertedData, setConvertedData] = useState<SortableTableDataType<V, K> | undefined>(undefined);
    const [sortableData, setSortableData] = useState<V[]>(data);

    const keys = useMemo(()=> Object.keys(data[0]) as K[], [data]);

    const _initalizeConvertedData = useCallback(() => {
    
        const initTableData: SortableTableDataType<V, K> = new Map();

        keys.forEach((key) => {
            initTableData.set(key, []);
        })
    
        data.forEach((rowData) => {
            Object.values(rowData).forEach((value, columnIndex) => {
                const targetMapArray = initTableData.get(keys[columnIndex]);

                if (targetMapArray === undefined) {
                    throw new Error("Can not find key in data");
                }
                
                targetMapArray.push(value);
            });
        });
    
        setConvertedData(initTableData);
    },[]);

    useEffect(() => {
        _initalizeConvertedData();
    },[]);

    const sort = useCallback((key: K, compareFn: (a: V[K], b: V[K])=>number) => {
        if (convertedData === undefined) {
            throw new Error("tableData is not initialized");
        }

        const validKey = keys.find((k) => k === key);

        if (!validKey) {
            throw new Error("key is not valid");
        }

        const targetColumn = convertedData.get(validKey);
        
        if (targetColumn === undefined) {
            throw new Error("Can not find key in data");
        }

        const sortedIndex = targetColumn.map((v, i) => ({v, i}))
            .sort((a, b) => compareFn(a.v, b.v))
            .map((sorted) => sorted.i);
            
        const sortedData = sortedIndex.map((index) => 
            keys.reduce((obj, key) => {
                const targetMapArray = convertedData.get(key);
                if (targetMapArray === undefined) {
                    throw new Error("Can not find key in data");
                }                
                obj[key] = targetMapArray[index];
                return obj;
            }, Object.assign({}))
        );
        setSortableData(sortedData);
    }, [convertedData]);

    const initializeSort = useCallback(() => {
        _initalizeConvertedData();
        setSortableData(data);
    },[]);

    return {
        sort,
        sortableData,
        initializeSort
    };
}

export default useSortableTable;