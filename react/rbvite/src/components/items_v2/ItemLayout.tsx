import { useState } from "react";
import { Outlet } from "react-router-dom";

export const ItemLayout = () => {

  const [currItem] = useState<Cart | null>();

  return (
    <>
     <Outlet context={{ item: currItem }} />
    </>
  );
};
