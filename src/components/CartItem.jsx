import React from "react";

function CartItem({ product }) {
  const {
    thumbnail,
    title,
    brand,
    price,
    discountPercentage,
    availabilityStatus,
  } = product;

  // Calculate discounted price
  const discountedPrice = (price - (price * discountPercentage) / 100).toFixed(
    2
  );

  return (
    <div className="flex gap-4 items-start border-b py-4">
      <img
        src={thumbnail}
        alt={title}
        className="w-24 h-24 object-cover rounded-md"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{brand}</p>
        <div className="mt-2">
          <span className="text-green-600 font-medium">
            {availabilityStatus}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            ${discountedPrice}
          </span>
          <span className="text-sm line-through text-gray-500">${price}</span>
          <span className="text-sm text-red-500">-{discountPercentage}%</span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
