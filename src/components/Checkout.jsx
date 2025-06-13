import React from "react";
import { useSelector } from "react-redux";

export default function Checkout() {
  const cartItems = useSelector((store) => store.cart.items);

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 font-medium">
        Your cart is empty. Add some items to proceed.
      </div>
    );
  }

  const handleSubmit = () => {
    alert(`Congratulations!!!! You have purchased ${cartItems.length} items`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.brand}</p>
              </div>
            </div>
            <div className="text-blue-600 font-medium">${item.price}</div>
          </div>
        ))}
      </div>

      <div className="text-right pt-4 border-t mt-6">
        <p className="text-xl font-semibold">
          Total: <span className="text-blue-700">${totalPrice}</span>
        </p>
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-green-200  rounded hover:bg-green-300 cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
