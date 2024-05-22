import { 
    isValidKeysType,
    isValidKeysTypeArray,
    isValidKeyType,
    isSubType,
    isSubTypeArray,
} from "./useSortableTable";

describe("isValidKeysType", () => {
    it("should return true if keys is a subset of data keys", () => {
        expect(isValidKeysType({ a: 1, b: 2, c: 3 }, ["a", "b", "c"])).toBe(true);
    });
    it("should return false if keys is not a subset of data keys", () => {
        expect(isValidKeysType({ a: 1, b: 2, c: 3 }, ["a", "b", "d"])).toBe(false);
    });
});

describe("isValidKeysTypeArray", () => {
    it("should return true if keys is a subset of data keys", () => {
        expect(isValidKeysTypeArray([{ a: 1, b: 2, c: 3 }, {a:10, b:20, c:30}], ["a", "b", "c"])).toBe(true);
    });
    it("should return false if keys is not a subset of data keys", () => {
        expect(isValidKeysTypeArray([{ a: 1, b: 2, c: 3 }, { a: 1, b: 2, d: 3 }], ["a", "b", "d"])).toBe(false);
    });
});

describe("isValidKeyType", () => {
    it("should return true if key is a key of data", () => {
        expect(isValidKeyType({ a: 1, b: 2, c: 3 }, "a")).toBe(true);
    });
    it("should return false if key is not a key of data", () => {
        expect(isValidKeyType({ a: 1, b: 2, c: 3 }, "d")).toBe(false);
    });
});

describe("isSubType", () => {
    it("should return true if data is a subtype of U", () => {
        expect(isSubType<Object, number>(1)).toBe(true);
        expect(isSubType<Array<any>, Array<number>>([1, 2, 3] as any[])).toBe(true);
    });
});

describe("isSubTypeArray", () => {
    it("should return true if data is a subtype of U", () => {
        expect(isSubTypeArray<Object, number>([1, 2, 3])).toBe(true);
        expect(isSubTypeArray<Array<any>, Array<number>>([[1, 2, 3], [4, 5, 6]] as any[])).toBe(true);
    });
});