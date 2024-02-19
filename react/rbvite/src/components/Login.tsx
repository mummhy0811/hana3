import { FormEvent, useRef, useState } from "react";

type Props = {
  login: (id:number, name:string) =>void;
}
export const Login = ({ login }: Props) => {
  // const [id, setId] = useState(0);
  //const [name, setName] = useState(' ');
  const idRef=useRef<HTMLInputElement>(null);
  const nameRef=useRef<HTMLInputElement>(null);

  const makeLogin=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); //submit을 무력화
    if(!idRef.current?.value){
      alert('User ID를 입력하세요');
      idRef.current?.focus();//id 입력창으로 포커스 이동
      return;
    }
    
    if(!nameRef.current?.value){
      alert('User Name을 입력하세요');
      nameRef.current?.focus();//name 입력창으로 포커스 이동
      return;
    }
    const id=idRef.current.value;
    const name=nameRef.current.value;
    login(+id, name)
  }

  return (
    <>
      <form onSubmit={makeLogin}>
        <div>
          LoginID:
          {/* <input type='text' onChange={(e) => setId(+e.currentTarget.value)} /> */}
          <input type='number' ref={idRef} />
        </div>
        <div>
          LoginName:
          {/* <input type='text' onChange={(e) => setName(e.currentTarget.value)}/> */}
          <input type='text' ref={nameRef} />
        </div>
        <button type='submit'>Sign-in</button>
      </form>
    </>
  );
};
