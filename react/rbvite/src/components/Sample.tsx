import { ChangeEvent, useState } from "react";

export default function Sample(){
    const [nickname, setNickname] = useState('""');

    const changeNickname = (e:ChangeEvent<HTMLInputElement>)=> setNickname(e.currentTarget.value);
    return (
    <>
    <div>
        <h1>Sample</h1>
        <h5>nickname = {nickname}</h5>
        <input type="text" onChange={changeNickname} />
    </div>
    </>
    );
}