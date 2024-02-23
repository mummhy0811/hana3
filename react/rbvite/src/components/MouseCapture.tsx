import { useLayoutEffect, useState } from "react";

type Position = {
    x: number;
    y: number;
  }

export default function MouseCapture(){
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  
    const catchMousePosition = ({ x, y }: Position) => {
      setPosition({ x, y });
    }
    
    useLayoutEffect(() => { // useEffect로 하면?? 거의(컴이 빠르면 찰나의 차이) 동일
      window.addEventListener('mousemove', catchMousePosition);
    
      return () => window.removeEventListener('mousemove', catchMousePosition);
    });

    return(
        <>
            <small>{JSON.stringify(position)}</small>
        </>
    )
}