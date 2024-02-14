declare const isStringNumber: (value: unknown) => value is [string, number];
declare const f1: (value: number | string | boolean | [string, number]) => void;
interface Animal {
}
interface Dog extends Animal {
    name: string;
}
interface Cat extends Animal {
    punch(): void;
}
declare class Retriever implements Dog {
    name: string;
    constructor(name: string);
}
declare function isDog(a: Animal): a is Dog;
declare const cart: {
    X: number;
    Y: number;
    Z: number;
};
type T1 = "X" | "Y" | "Z";
type T2 = keyof typeof cart;
declare const constCart: {
    readonly X: 1;
    readonly Y: 2;
    readonly Z: 3;
};
type T3 = 1 | 2 | 3;
type T4 = typeof constCart[keyof typeof constCart];
