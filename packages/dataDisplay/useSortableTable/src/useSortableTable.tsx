import { useCallback, useEffect, useMemo, useState } from "react";
import { isValidKeysTypeArray, isValidKeyType, isSubTypeArray } from "./utils";

type SortableTableDataType<K extends keyof V, V extends Object> = Map<K, Array<V[K]>>;

const useSortableTable = <K extends keyof V, V extends Object>(data: V[]) => {
    const [convertedData, setConvertedData] = useState<SortableTableDataType<K, V> | undefined>(undefined);
    const [sortableData, setSortableData] = useState<V[]>(data);

    const keys = useMemo(()=> {
        const objectKeys = data.reduce((acc, currentValue) => {
            const currentValueKeys = Object.keys(currentValue);
            
            const newObjectKeys = currentValueKeys.filter((key) => !acc.includes(key));
        
            return [...acc, ...newObjectKeys];
        }, [] as string[]);

        if (!isValidKeysTypeArray(data, objectKeys)) {
            throw new Error("key is not valid");
        }

        return objectKeys as K[];
    }, [data]);

    const _initalizeConvertedData = useCallback(() => {
        const initTableData: SortableTableDataType<K, V> = new Map();

        keys.forEach((key) => {
            initTableData.set(key, []);
        })
    
        data.forEach((rowData) => {
            Object.keys(rowData).forEach((key) => {
                if (!isValidKeyType(rowData, key)) {
                    throw new Error("key is not valid");
                }

                const validKey = key as K;
                
                const targetMapArray = initTableData.get(validKey);

                if (targetMapArray === undefined) {
                    throw new Error("Can not find key in data");
                }

                const value = rowData[validKey];

                targetMapArray.push(value);
            });
        });
    
        setConvertedData(initTableData);
    },[data, keys]);
    
    useEffect(() => {
        _initalizeConvertedData();
    },[]);

    const sort = useCallback(<T extends V[K]>(key: K, compareFn: (a: T, b: T) => number) => {
        if (keys.length === 0) {
            return;
        }

        if (convertedData === undefined) {
            throw new Error("tableData is not initialized");
        }

        const validKey = keys.find((k) => k === key.toString());

        if (!validKey) {
            throw new Error("key is not valid");
        }

        const targetColumn = convertedData.get(validKey);

        if (targetColumn === undefined) {
            throw new Error("Can not find key in data");
        }

        if (!isSubTypeArray<V[K], T>(targetColumn)) {
            throw new Error("Type is not valid");
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
            }, {} as V)
        );
        setSortableData(sortedData);
    }, [convertedData, keys]);

    const initializeSort = useCallback(() => {
        if (keys.length === 0) {
            return;
        }
        _initalizeConvertedData();
        setSortableData(data);
    },[_initalizeConvertedData, data, keys]);

    return {
        sort,
        sortableData,
        initializeSort
    };
}

export default useSortableTable;