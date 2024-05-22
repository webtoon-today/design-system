declare const useSortableTable: <V extends Object>(data: V[]) => {
    sort: (key: keyof V, compareFn: (a: any, b: any) => number) => void;
    sortableData: V[];
    initializeSort: () => void;
};

export { useSortableTable };
