import React from "react";
import { useDispatch } from "react-redux";
import { addItems } from "../utils/CartSlice";
import { Link } from "react-router-dom";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItems(product));
  };

  return (
    <Link to={`/${product.id}`} className="block">
      <div className="max-w-sm border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition duration-300 space-y-3">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover rounded"
        />

        <div>
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-500">{product.brand}</p>
        </div>

        <div className="flex justify-between items-center text-sm">
          <p className="text-blue-600 font-medium">${product.price}</p>
          <p>⭐ {product.rating}</p>
        </div>

        <div>
          <button
            onClick={handleAddCart}
            className="text-xs font-semibold border bg-blue-200 px-2 py-1 rounded cursor-pointer"
          >
            Add To Cart
          </button>
        </div>

        <p
          className={`text-xs font-medium px-2 py-1 rounded inline-block ${
            product.availabilityStatus === "In Stock"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {product.availabilityStatus}
        </p>
      </div>
    </Link>
  );
}
