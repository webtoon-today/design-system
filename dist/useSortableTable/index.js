'use strict';

var react = require('react');

const isVaildKeysType = (data, keys) => {
    const dataKeys = Object.keys(data);
    if (dataKeys.every((dataKey) => keys.includes(dataKey))) {
        return true;
    }
    return false;
};
const useSortableTable = (data) => {
    const [convertedData, setConvertedData] = react.useState(undefined);
    const [sortableData, setSortableData] = react.useState(data);
    const keys = react.useMemo(() => {
        const objectKeys = data.reduce((acc, currentValue) => {
            const currentValueKeys = Object.keys(currentValue);
            const newObjectKeys = currentValueKeys.filter((key) => !acc.includes(key));
            return [...acc, ...newObjectKeys];
        }, []);
        if (!data.every((d) => isVaildKeysType(d, objectKeys))) {
            throw new Error("key is not valid");
        }
        return objectKeys;
    }, [data]);
    const _initalizeConvertedData = react.useCallback(() => {
        const initTableData = new Map();
        keys.forEach((key) => {
            initTableData.set(key, []);
        });
        data.forEach((rowData) => {
            Object.keys(rowData).forEach((key) => {
                const targetMapArray = initTableData.get(keys.find((k) => k === key));
                if (targetMapArray === undefined) {
                    throw new Error("Can not find key in data");
                }
                const value = rowData[key];
                targetMapArray.push(value);
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
        const validKey = keys.find((k) => k === key.toString());
        if (!validKey) {
            throw new Error("key is not valid");
        }
        const targetColumn = convertedData.get(validKey);
        if (targetColumn === undefined) {
            throw new Error("Can not find key in data");
        }
        const sortedIndex = targetColumn.map((v, i) => ({ v, i }))
            .sort((a, b) => compareFn(a.v, b.v))
            .map((sorted) => sorted.i);
        const sortedData = sortedIndex.map((index) => keys.reduce((obj, key) => {
            const targetMapArray = convertedData.get(key);
            if (targetMapArray === undefined) {
                throw new Error("Can not find key in data");
            }
            obj[key] = targetMapArray[index];
            return obj;
        }, Object.assign({})));
        setSortableData(sortedData);
    }, [convertedData, keys]);
    const initializeSort = react.useCallback(() => {
        if (keys.length === 0) {
            return;
        }
        _initalizeConvertedData();
        setSortableData(data);
    }, [_initalizeConvertedData, data, keys]);
    return {
        sort,
        sortableData,
        initializeSort
    };
};

exports.useSortableTable = useSortableTable;
