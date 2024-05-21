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
        const objectKeys = Object.keys(data[0]);
        if (isVaildKeysType(data[0], objectKeys)) {
            return objectKeys;
        }
        throw new Error("key is not valid");
    }, [data]);
    const _initalizeConvertedData = react.useCallback(() => {
        const initTableData = new Map();
        keys.forEach((key) => {
            initTableData.set(key, []);
        });
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
    }, [data, keys]);
    react.useEffect(() => {
        _initalizeConvertedData();
    }, [_initalizeConvertedData]);
    const sort = react.useCallback((key, compareFn) => {
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
    }, [convertedData]);
    const initializeSort = react.useCallback(() => {
        _initalizeConvertedData();
        setSortableData(data);
    }, [_initalizeConvertedData, data]);
    return {
        sort,
        sortableData,
        initializeSort
    };
};

exports.useSortableTable = useSortableTable;
