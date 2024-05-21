import { useCallback, useEffect, useMemo, useState } from "react";

type SortableTableDataType<K extends keyof V, V extends Object> = Map<K, V[]>;

const isVaildKeysType = <K extends keyof V, V extends Object>(data: V, keys: (string | number | Symbol)[]): keys is K[] => {
    const dataKeys = Object.keys(data);
    if (dataKeys.every((dataKey) => keys.includes(dataKey))) {
        return true;
    }
    return false;
}

const useSortableTable = <K extends keyof V, V extends Object>(data: V[]) => {
    const [convertedData, setConvertedData] = useState<SortableTableDataType<K, V> | undefined>(undefined);
    const [sortableData, setSortableData] = useState<V[]>(data);

    const keys = useMemo(()=> {
        const objectKeys = data.reduce((acc, currentValue) => {
            const currentValueKeys = Object.keys(currentValue);
            
            const newObjectKeys = currentValueKeys.filter((key) => !acc.includes(key));
        
            return [...acc, ...newObjectKeys];
        }, [] as string[]);

        if (!data.every((d) => isVaildKeysType(d, objectKeys))) {
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
                const targetMapArray = initTableData.get(keys.find((k) => k === key) as K);

                if (targetMapArray === undefined) {
                    throw new Error("Can not find key in data");
                }

                const value = rowData[key as K] as V;

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

        const targetColumn = convertedData.get(validKey) as T[] | undefined;
        
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