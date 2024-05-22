import { useCallback, useEffect, useMemo, useState } from "react";

type SortableTableDataType<K extends keyof V, V extends Object> = Map<K, Array<V[K]>>;

const isValidKeysType = <K extends keyof V, V extends Object>(data: V, keys: (string | number | Symbol)[]): keys is K[] => {
    const dataKeys = Object.keys(data);
    if (dataKeys.every((dataKey) => keys.includes(dataKey))) {
        return true;
    }
    return false;
}

const isValidKeysTypeArray = <K extends keyof V, V extends Object>(data: V[], keys: (string | number | Symbol | K)[]): keys is K[] => data.every((d) => isValidKeysType<K, V>(d, keys));

const isValidKeyType = <K extends keyof V, V extends Object>(data: V, key: string | number | Symbol): key is K => {
    const dataKeys = Object.keys(data);
    if (dataKeys.includes(key.toString())) {
        return true;
    }
    return false;
}

const isSubType = <T, U extends T>(data: T): data is U => {
    const subTypeData = data as U;

    if (typeof data === "object" && data !== null && typeof subTypeData === "object" && subTypeData !== null) {

        const originDataKey = Object.keys(data);
        const subTypeDataKey = Object.keys(subTypeData);

        if (originDataKey.length === subTypeDataKey.length) {
            return originDataKey.every((key) => subTypeDataKey.includes(key));
        }
        return false;
    }

    if (typeof data === typeof subTypeData) {
        return true;
    }

    return false;
}

const isSubTypeArray = <T, U extends T>(data: T[]): data is U[] => data.every((d) => isSubType<T, U>(d));

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