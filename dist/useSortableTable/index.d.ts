declare const useSortableTable: <V extends Object>(data: V[]) => {
    toSorted: (key: keyof V, compareFn: (a: any, b: any) => number) => void;
    initializeSort: () => void;
    sortedData: V[];
};

export { useSortableTable };
