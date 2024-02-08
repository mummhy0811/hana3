interface User {
  id: number;
  name: string;
}

interface Dept {
  id: number;
  dname: string;
  captain: string;
}

//type Ud2 = (TUser | TDept) & {addr: string};
interface Ud2 {
  id: number;
  [key: string]: number | string;
  addr: string;
}

// 다음 코드가 오류가 없으면 통과!
const ud2: Ud2 = { id: 1, name: "HH", addr: "Seoul" };
const ud3: Ud2 = { id: 1, dname: "HH", captain: "HH", addr: "Seoul" };
