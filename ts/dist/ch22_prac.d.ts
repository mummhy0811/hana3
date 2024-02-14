interface User {
    id: number;
    name: string;
}
interface Dept {
    id: number;
    dname: string;
    captain: string;
}
interface Ud2 {
    id: number;
    [key: string]: number | string;
    addr: string;
}
declare const ud2: Ud2;
declare const ud3: Ud2;
