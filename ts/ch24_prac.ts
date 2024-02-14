const isStringNumber = (value: unknown): value is [string, number] =>
    Array.isArray(value) && typeof value[0]==='string' && value[1]==='number';



const f1 = (value: number | string | boolean | [string, number]) => {
  if (isStringNumber(value)) {
    console.log(value[0].toUpperCase(), value[1].toFixed());
  }
};


interface Animal {}
interface Dog extends Animal {
    name: string;
}
interface Cat extends Animal {
    punch(): void;
}

class Retriever implements Dog {
    constructor (public name:string){
        this.name=name;
    }
}

function isDog(a: Animal): a is Dog {
	return "name" in a;
}

// 문제1) 다음에서 T1과 동일한 타입으로 T2를 정의하시오.
const cart = {
  X: 1,
  Y: 2,
  Z: 3,
};

type T1 = "X" | "Y" | "Z";
type T2 = keyof typeof cart;

// 문제2) 다음에서 T3과 동일한 타입으로 T4를 정의하시오.
const constCart = {
  X: 1,
  Y: 2,
  Z: 3,
} as const;

type T3 = 1 | 2 | 3;
type T4 = typeof constCart[keyof typeof constCart];
