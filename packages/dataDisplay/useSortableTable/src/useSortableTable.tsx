import { useCallback, useEffect, useMemo, useState } from "react";

type SortableTableDataType<V extends Object> = Map<keyof V, Array<V[keyof V]>>;

const useSortableTable = <V extends Object>(data: V[]) => {
    type K = keyof V;

    const [convertedData, setConvertedData] = useState<SortableTableDataType<V> | undefined>(undefined);
    const [sortedData, setSortedData] = useState<V[]>(data);

    const keys = useMemo(()=> {
        const objectKeys = data.reduce((acc, currentValue) => {
            const currentValueKeys = Object.keys(currentValue) as K[];
            
            const newObjectKeys = currentValueKeys.filter((key) => !acc.includes(key));
        
            return [...acc, ...newObjectKeys];
        }, [] as K[]);

        return objectKeys;
    }, [data]);

    const _initalizeConvertedData = useCallback(() => {
        const initTableData: SortableTableDataType<V> = new Map();

        keys.forEach((key) => {
            initTableData.set(key, []);
        })
    
        data.forEach((rowData) => {
            (Object.keys(rowData) as K[]).forEach((key) => {                
                const targetMapArray = initTableData.get(key);

                if (targetMapArray === undefined) {
                    throw new Error("Can not find key in data");
                }

                targetMapArray.push(rowData[key]);
            });
        });
    
        setConvertedData(initTableData);
    },[data, keys]);
    
    useEffect(() => {
        _initalizeConvertedData();
    },[]);

    const sort = useCallback((key: K, compareFn: (a: any, b: any) => number) => {
        if (keys.length === 0) {
            return;
        }

        if (convertedData === undefined) {
            throw new Error("tableData is not initialized");
        }

        const targetColumn = convertedData.get(key);

        if (targetColumn === undefined) {
            throw new Error("Can not find key in data");
        }
        
        const sortedIndex = targetColumn.map((v, i) => ({v, i}))
            .sort((a, b) => compareFn(a.v, b.v))
            .map((sorted) => sorted.i);

        const newSortedData = sortedIndex.map((index) => 
            keys.reduce((obj, key) => {
                const targetMapArray = convertedData.get(key);
                if (targetMapArray === undefined) {
                    throw new Error("Can not find key in data");
                }                
                obj[key] = targetMapArray[index];
                return obj;
            }, {} as V)
        );

        setSortedData(newSortedData);
    }, [convertedData, keys]);

    const initializeSort = useCallback(() => {
        if (keys.length === 0) {
            return;
        }
        _initalizeConvertedData();
        setSortedData(data);
    },[_initalizeConvertedData, data, keys]);

    const sortableTable = {
        sort,
        initializeSort
    };

    return { sortableTable, sortedData };
}

export default useSortableTable;