import { ChangeEvent, useState } from "react";

const CITIES=['Seoul', 'Busan', 'Incheon']; //리렌더링을 피해가도록 바깥쪽으로 뺌

export default function Sample(){
    const [nickname, setNickname] = useState('HONG');
    const [address, setAddress] = useState('Seoul');
    const [age, setAge] = useState(0);

    const changeNickname = (e:ChangeEvent<HTMLInputElement>)=> setNickname(e.currentTarget.value);
    return (
    <>
    <div>
        <h1>Sample</h1>
        <h5>nickname = {nickname} ({age})세 </h5>
        <input value={nickname} type="text" onChange={changeNickname} /> 
        <input value={age} type="number" onChange={(e)=>setAge(e.currentTarget.valueAsNumber)} /> 
        <h5>address = {address}</h5>
        <input value={address} type="text" onChange={(e) => setAddress(e.currentTarget.value)} />
        <br/>
        <select onChange={(e) => setAddress(e.currentTarget.value)}>
            
            {/* <option value="Seoul" > Seoul</option>
            <option value="Incheon" > Incheon</option>
            <option value="Busan" > Busan</option>  */}
            
            {
                CITIES.map((item)=>(<option value={item}>{item}</option>))
            }
        </select>
    </div>
    </>
    );
}