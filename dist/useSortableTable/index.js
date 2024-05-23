'use strict';

var react = require('react');

const _initalizeConvertedData = (data, keys) => {
    const initTableData = new Map();
    keys.forEach((key) => {
        initTableData.set(key, []);
    });
    data.forEach((rowData) => {
        Object.keys(rowData).forEach((key) => {
            const targetMapArray = initTableData.get(key);
            if (targetMapArray === undefined) {
                throw new Error('Can not find key in data');
            }
            targetMapArray.push(rowData[key]);
        });
    });
    return initTableData;
};
const useSortableTable = (data) => {
    const [convertedData, setConvertedData] = react.useState(undefined);
    const [sortedData, setSortedData] = react.useState(() => data);
    react.useEffect(() => {
        if (data.length === 0) {
            return;
        }
        setSortedData(data);
        setConvertedData(_initalizeConvertedData(data, keys));
    }, [data]);
    const keys = react.useMemo(() => {
        const objectKeys = data.reduce((acc, currentValue) => {
            const currentValueKeys = Object.keys(currentValue);
            const newObjectKeys = currentValueKeys.filter((key) => !acc.includes(key));
            return [...acc, ...newObjectKeys];
        }, []);
        return objectKeys;
    }, [data]);
    const sort = react.useCallback((key, compareFn) => {
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
        const newSortedData = sortedIndex.map((index) => keys.map((key) => {
            const value = convertedData.get(key);
            if (!value) {
                throw new Error('Can not find key in data');
            }
            return { [key]: value[index] };
        }).reduce((acc, current) => {
            let ret = Object.assign({}, acc);
            ret = Object.assign(ret, current);
            return ret;
        }, {}));
        setSortedData(newSortedData);
    }, [convertedData, keys]);
    const initializeSort = react.useCallback(() => {
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
    return [sortableTable];
};

exports.useSortableTable = useSortableTable;
