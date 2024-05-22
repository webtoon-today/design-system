'use strict';

var react = require('react');

const useSortableTable = (data) => {
    const [convertedData, setConvertedData] = react.useState(undefined);
    const [sortedData, setSortedData] = react.useState(data);
    const keys = react.useMemo(() => {
        const objectKeys = data.reduce((acc, currentValue) => {
            const currentValueKeys = Object.keys(currentValue);
            const newObjectKeys = currentValueKeys.filter((key) => !acc.includes(key));
            return [...acc, ...newObjectKeys];
        }, []);
        return objectKeys;
    }, [data]);
    const _initalizeConvertedData = react.useCallback(() => {
        const initTableData = new Map();
        keys.forEach((key) => {
            initTableData.set(key, []);
        });
        data.forEach((rowData) => {
            Object.keys(rowData).forEach((key) => {
                const targetMapArray = initTableData.get(key);
                if (targetMapArray === undefined) {
                    throw new Error("Can not find key in data");
                }
                targetMapArray.push(rowData[key]);
            });
        });
        setConvertedData(initTableData);
    }, [data, keys]);
    react.useEffect(() => {
        _initalizeConvertedData();
    }, []);
    const sort = react.useCallback((key, compareFn) => {
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
        const sortedIndex = targetColumn.map((v, i) => ({ v, i }))
            .sort((a, b) => compareFn(a.v, b.v))
            .map((sorted) => sorted.i);
        const newSortedData = sortedIndex.map((index) => keys.reduce((obj, key) => {
            const targetMapArray = convertedData.get(key);
            if (targetMapArray === undefined) {
                throw new Error("Can not find key in data");
            }
            obj[key] = targetMapArray[index];
            return obj;
        }, {}));
        setSortedData(newSortedData);
    }, [convertedData, keys]);
    const initializeSort = react.useCallback(() => {
        if (keys.length === 0) {
            return;
        }
        _initalizeConvertedData();
        setSortedData(data);
    }, [_initalizeConvertedData, data, keys]);
    const sortableTable = {
        sort,
        initializeSort
    };
    return { sortableTable, sortedData };
};

exports.useSortableTable = useSortableTable;
