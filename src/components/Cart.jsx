import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="grid grid-cols-1 gap-6 p-6">
      {cartItems.map((item) => {
        return <CartItem key={item.id} product={item} />;
      })}
    </div>
  );
}

export default Cart;
