import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const items = useSelector((store) => store.cart.items);
  return (
    <div className="flex justify-around py-6 bg-green-100">
      <Link to="/">
        <div className="hover:underline text-xl font-semibold font-serif tracking-wider">
          Shoppy-Globe
        </div>
      </Link>
      <Link to="/checkout">
        <div className="text-xl hover:underline font-semibold font-serif tracking-wider">
          Check-out
        </div>
      </Link>
      <Link to="/cart">
        <div className="text-xl hover:underline font-semibold font-serif tracking-wider">
          Cart
        </div>
      </Link>
      <div className="text-xl font-semibold font-serif tracking-wider">
        items in cart: {items.length}
      </div>
    </div>
  );
}

export default Header;
