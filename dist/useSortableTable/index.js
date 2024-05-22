'use strict';

var react = require('react');

const isValidKeysType = (data, keys) => {
    const dataKeys = Object.keys(data);
    if (dataKeys.every((dataKey) => keys.includes(dataKey))) {
        return true;
    }
    return false;
};
const isValidKeysTypeArray = (data, keys) => data.every((d) => isValidKeysType(d, keys));
const isValidKeyType = (data, key) => {
    const dataKeys = Object.keys(data);
    if (dataKeys.includes(key.toString())) {
        return true;
    }
    return false;
};
const isSubType = (data) => {
    const subTypeData = data;
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
};
const isSubTypeArray = (data) => data.every((d) => isSubType(d));
const useSortableTable = (data) => {
    const [convertedData, setConvertedData] = react.useState(undefined);
    const [sortableData, setSortableData] = react.useState(data);
    const keys = react.useMemo(() => {
        const objectKeys = data.reduce((acc, currentValue) => {
            const currentValueKeys = Object.keys(currentValue);
            const newObjectKeys = currentValueKeys.filter((key) => !acc.includes(key));
            return [...acc, ...newObjectKeys];
        }, []);
        if (!isValidKeysTypeArray(data, objectKeys)) {
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
                if (!isValidKeyType(rowData, key)) {
                    throw new Error("key is not valid");
                }
                const validKey = key;
                const targetMapArray = initTableData.get(validKey);
                if (targetMapArray === undefined) {
                    throw new Error("Can not find key in data");
                }
                const value = rowData[validKey];
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
        if (!isSubTypeArray(targetColumn)) {
            throw new Error("Type is not valid");
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
