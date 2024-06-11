'use strict';

var react = require('react');

const unique = (val, idx, arr) => arr.indexOf(val) === idx;
const _initalizeConvertedData = (data) => {
    const initTableData = new Map();
    const keys = data.flatMap(row => Object.keys(row)).filter(unique);
    if (keys.length === 0) {
        return initTableData;
    }
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
/**
 *
 * @param convertedData
 * @param key key가 주어지지 않은 경우 아무 키(구현상에서는 첫번째 키)를 사용, 최초의 정렬을 반환
 * @param compareFn compareFn이 없는 경우 최초의 정렬을 반환
 * @returns
 */
const _revertDataInOrder = (convertedData, key, // 
compareFn) => {
    if (!convertedData || convertedData.size === 0) {
        return [];
    }
    const keys = [...convertedData.keys()];
    const order = (() => {
        var _a;
        const targetColumn = convertedData.get(key || keys[0]);
        if (targetColumn === undefined) {
            console.error('Can not find key in data');
            return ((_a = convertedData.get(key || keys[0])) === null || _a === void 0 ? void 0 : _a.map((_, i) => i)) || [];
        }
        if (!compareFn) {
            return targetColumn.map((_, i) => i);
        }
        const sortedIndex = targetColumn
            .map((v, i) => ({ v, i }))
            .sort((a, b) => compareFn(a.v, b.v))
            .map((sorted) => sorted.i);
        return sortedIndex;
    })();
    const sortedData = order.map((index) => keys.map((key) => {
        return { [key]: (convertedData.get(key) || [])[index] };
    }).reduce((lhs, rhs) => {
        return Object.assign(Object.assign({}, lhs), rhs);
    }, {}));
    return sortedData;
};
const useSortableTable = (data) => {
    const [convertedData, setConvertedData] = react.useState(_initalizeConvertedData(data));
    const [key, setKey] = react.useState();
    const [compareFn, setCompareFn] = react.useState();
    const sortedData = react.useMemo(() => _revertDataInOrder(convertedData, key, compareFn), [convertedData, key, compareFn]);
    react.useEffect(() => {
        setConvertedData(_initalizeConvertedData(data));
    }, [data]);
    /** validate params and pass key, compareFn */
    const sort = react.useCallback((key, compareFn) => {
        if (convertedData === undefined) {
            throw new Error('tableData is not initialized');
        }
        if (!key || !compareFn) {
            throw new Error('sort parameters are not given');
        }
        if (convertedData.get(key) === undefined) {
            throw new Error('Can not find key in data or data has no key');
        }
        setKey(key);
        setCompareFn(() => compareFn);
    }, [convertedData]);
    const initializeSort = react.useCallback(() => {
        setKey(undefined);
        setCompareFn(undefined);
    }, [data]);
    const sortableTable = {
        sort,
        initializeSort,
        sortedData
    };
    return sortableTable;
};

exports.useSortableTable = useSortableTable;
