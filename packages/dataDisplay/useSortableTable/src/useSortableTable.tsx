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
        const objectKeys = Object.keys(data[0]);
        if (isVaildKeysType(data[0], objectKeys)) {
            return objectKeys as K[];
        }
        throw new Error("key is not valid");
    }, [data]);

    const _initalizeConvertedData = useCallback(() => {
        const initTableData: SortableTableDataType<K, V> = new Map();

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
    },[data, keys]);

    useEffect(() => {
        _initalizeConvertedData();
    },[_initalizeConvertedData]);

    const sort = useCallback(<T extends V[K]>(key: K, compareFn: (a: T, b: T)=>number) => {
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
    }, [convertedData]);

    const initializeSort = useCallback(() => {
        _initalizeConvertedData();
        setSortableData(data);
    },[_initalizeConvertedData, data]);

    return {
        sort,
        sortableData,
        initializeSort
    };
}

export default useSortableTable;