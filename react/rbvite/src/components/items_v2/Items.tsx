import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../contexts/session-context";

export default function Items() {
  const { saveItem } = useSession();
  const [currId, setCurrId] = useState(0);

  const {session: { cart }} = useSession();
  const [, setCurrItem] = useState<Cart | null>();

  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const goItem = (item: Cart) => {
    setCurrItem(item);
    navigate(`/items/${item.id}`);
  };

  const saveCartItem = (e: React.FormEvent) => {
    e.preventDefault();
    const id = currId;
    const name = itemNameRef.current?.value;
    const price = Number(itemPriceRef.current?.value);
    
    if (!name) {
      alert("상품명을 정확히 입력하세요!");
      itemNameRef.current?.focus();
      return;
    } else if (isNaN(price) || !price) {
      alert("가격을 정확히 입력하세요!");
      itemPriceRef.current?.focus();
      return;
    }

    saveItem({ id, name, price });
    setCurrId(0);
    itemNameRef.current.value = "";
    if (itemPriceRef.current) itemPriceRef.current.value = "0";
  };

  return (
    <div>
      <ul>
        {cart?.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => goItem(item)}
              className="hover:text-blue-300"
            >
              <small className="text-gray-300">#{item.id}</small>
              {item.name}
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={saveCartItem} onReset={() => setCurrId(0)}>
        <input type="text" ref={itemNameRef} placeholder="상품명..." />
        <input type="number" ref={itemPriceRef} placeholder="금액..." />
        <button type="reset">취소</button>
        <button type="submit">{currId ? "수정" : "추가"}</button>
      </form>
    </div>
  );
}
