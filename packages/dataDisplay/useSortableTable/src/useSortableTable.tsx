import { useCallback, useEffect, useMemo, useState } from 'react';

type SortableTableDataType<V extends Object> = Map<keyof V, Array<V[keyof V]>>;

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

    useEffect(() => {
        if (data.length === 0) {
            return;
        }
        setSortedData(data);
        setConvertedData(_initalizeConvertedData(data, keys));
    }, [data]);

    const keys = useMemo(() => {
        const objectKeys = data.reduce((lhs, rhs) => {
            const currentValueKeys = Object.keys(rhs) as K[];

            const newObjectKeys = currentValueKeys.filter((key) => !lhs.includes(key));

            return [...lhs, ...newObjectKeys];
        }, [] as K[]);

        return objectKeys;
    }, [data]);
    
    const sort = useCallback((key: K, compareFn: (a: any, b: any) => number) => {
        if (keys.length === 0) {
            return;
        }

        if (convertedData === undefined) {
            throw new Error('tableData is not initialized');
        }

        const targetColumn = convertedData.get(key);

        if (targetColumn === undefined) {
            throw new Error('Can not find key in data');
        }

        const sortedIndex = targetColumn
            .map((v, i) => ({ v, i }))
            .sort((a, b) => compareFn(a.v, b.v))
            .map((sorted) => sorted.i);

        const newSortedData = sortedIndex.map((index) =>
            keys.map((key) => {
                const value = convertedData.get(key);

                if (!value) {
                    throw new Error('Can not find key in data');
                }

                return { [key]: value[index] };
            }).reduce((lhs, rhs) => {
                return {...lhs, ...rhs}; 
            }, {} as V)
        );

            setSortedData(newSortedData);
        }, [convertedData, keys]);

    const initializeSort = useCallback(() => {
        if (keys.length === 0) {
            return;
        }
        setConvertedData(_initalizeConvertedData(data, keys));
        setSortedData(data);
    }, [data, keys]);

    const sortableTable = {
        sort,
        initializeSort,
        sortedData
    };

    return sortableTable;
}

export default useSortableTable;