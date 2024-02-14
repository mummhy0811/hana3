interface IUser {
  id: number;
  age: number;
  name: string;
}

interface IDept {
  id: number;
  age: string;
  dname: string;
  captain: string;
}

type Combine<T, U> = {
  [k in keyof (T & U)]: k extends keyof T & keyof U ? T[k] | U[k] : (T & U)[k];
};

type ICombined = Combine<IUser, IDept>;

//-----------------------2
function add(a: number, b: string) {
  return;
}

type FirstArgs<F> = F extends (a: infer First, ...b: any) => any ? First : any;
type SecondArgs<F> = F extends (a: any, b: infer Second, ...r: any) => any ? Second : any;
type Args<F> = F extends (...any: infer P) => any ? P[number] : any;

type A = FirstArgs<typeof add>; // number
type B = SecondArgs<typeof add>; // string
type C = Args<typeof add>; // number | string
type AX = Args<typeof String.prototype.endsWith>; // ⇒ string | number | undefined
type AX2 = Args<typeof String.prototype.charAt>; // ⇒ number
