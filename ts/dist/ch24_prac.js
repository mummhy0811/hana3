"use strict";
const isStringNumber = (value) => Array.isArray(value) && typeof value[0] === 'string' && value[1] === 'number';
const f1 = (value) => {
    if (isStringNumber(value)) {
        console.log(value[0].toUpperCase(), value[1].toFixed());
    }
};
class Retriever {
    constructor(name) {
        this.name = name;
        this.name = name;
    }
}
function isDog(a) {
    return "name" in a;
}
// 문제1) 다음에서 T1과 동일한 타입으로 T2를 정의하시오.
const cart = {
    X: 1,
    Y: 2,
    Z: 3,
};
// 문제2) 다음에서 T3과 동일한 타입으로 T4를 정의하시오.
const constCart = {
    X: 1,
    Y: 2,
    Z: 3,
};
