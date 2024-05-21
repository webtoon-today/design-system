declare const useSortableTable: <K extends keyof V, V extends Object>(data: V[]) => {
    sort: <T extends V[K]>(key: K, compareFn: (a: T, b: T) => number) => void;
    sortableData: V[];
    initializeSort: () => void;
};

export { useSortableTable };
