const isValidKeysType = <K extends keyof V, V extends Object>(data: V, keys: (string | number | Symbol)[]): keys is K[] => {
    const dataKeys = Object.keys(data);  
    return dataKeys.every((dataKey) => keys.includes(dataKey));
}

export const isValidKeysTypeArray = <K extends keyof V, V extends Object>(data: V[], keys: (string | number | Symbol | K)[]): keys is K[] => data.every((d) => isValidKeysType<K, V>(d, keys));

export const isValidKeyType = <K extends keyof V, V extends Object>(data: V, key: string | number | Symbol): key is K => {
    const dataKeys = Object.keys(data);  
    return dataKeys.includes(key.toString());
}

export const isSubType = <T, U extends T>(data: T): data is U => {
    const subTypeData = data as U;

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
}

export const isSubTypeArray = <T, U extends T>(data: T[]): data is U[] => data.every((d) => isSubType<T, U>(d));