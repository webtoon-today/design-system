import { useCallback, useEffect, useState } from "react";

type SortableTableDataType<T extends Object> = { 
    [key: string]: T[];
}

const useSortableTable = <T extends Object,>({ keys, data }:{ keys: string[], data: T[]}) => {

    const [convertedData, setConvertedData] = useState<SortableTableDataType<T>[] | undefined>(undefined);
    const [sortableData, setSortableData] = useState<T[]>(data);

    const rowLength = Object.keys(data[0]).length;

    const _initalizeConvertedData = useCallback(() => {
        if (keys.length !== rowLength) {
            console.error("keys length is not equal to row length");
            throw new Error("keys length is not equal to row length");
        }
    
        const initTableData = keys.map(key => {
            const obj = Object.assign({});
            obj[key] = [];
            return obj;
        });
    
        data.forEach((rowData) => {
            Object.values(rowData).forEach((value, columnIndex) => {
                initTableData[columnIndex][keys[columnIndex]].push(value);
            });
        });
    
        setConvertedData(initTableData);
    },[])

    useEffect(() => {
        _initalizeConvertedData();
    },[]);

    const sort = useCallback((key: string, compareFn: <T,>(a: T, b: T) => number) => {
        if (convertedData === undefined) {
            console.error("tableData is not defined");
            throw new Error("tableData is not defined");
        }

        const targetColumn = convertedData.find((obj) => obj[key] !== undefined)?.[key];

        if (targetColumn === undefined) {
            console.error("Can not find key in data");
            throw new Error("Can not find key in data");
        }

        const sortedIndex = targetColumn.map((v, i) => ({v, i}))
            .sort((a, b) => compareFn(a.v, b.v))
            .map((sorted) => sorted.i);
            
        const sortedData = sortedIndex.map((index) => 
            keys.reduce((obj, key, i) => {
                obj[key] = convertedData[i][key][index];
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