import { ChangeEvent, useEffect, useState, useTransition } from 'react';

type List = {
  id: number;
  value: string;
};

const useDebounce = (cb:() => void, delay:number, dependencies:unknown[] = []) => {
    useEffect(() => {
        const timer = setTimeout(cb, delay);
    
        return () => clearTimeout(timer);
      }, dependencies);
}

export default function DeferTrans() {
  const [searchStr, setSearchStr] = useState('');
  // const deferredSearchStr = useDeferredValue(searchStr);
  const [list, setList] = useState<List[]>([]);
  const [debounseStr, setDebounseStr] = useState('');

  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setSearchStr(value);
    startTransition(() => {
      const lst = [];
      for (let i = 0; i < 10000; i++) lst.push({ id: i + 1, value });
      // lst.push({ id: i + 1, value: deferredSearchStr });
      setList(lst);
    });
  };

  useDebounce(
    () => {
        setTimeout(() => setDebounseStr(searchStr))
    }, 
        500,
        [searchStr]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebounseStr(searchStr);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [searchStr]);

  return (
    <>
      <input
        type='text'
        onChange={handleChange}
        className='border border-red-500 rounded-lg'
      />
      <h2 className=' text-blue-500'>{searchStr}</h2>
      <h2 className=' text-green-500'>{debounseStr}</h2>
      {/* <h2 className=' text-red-500'>{deferredSearchStr}</h2> */}
      {isPending && <h1 className='text-lg'>Loading...</h1>}
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.value}</li>
        ))}
      </ul>
    </>
  );
}