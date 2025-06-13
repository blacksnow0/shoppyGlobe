import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        const found = data.products.find((item) => item.id === parseInt(id));
        if (!found) throw new Error("Product not found");
        setProduct(found);
      } catch (err) {
        console.log(err);
        setError("Unable to load product details.");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="text-center p-6 text-red-600 font-semibold">{error}</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center p-6 text-gray-600">Loading product...</div>
    );
  }

  const {
    title,
    description,
    brand,
    category,
    availabilityStatus,
    price,
    discountPercentage,
    rating,
    returnPolicy,
    shippingInformation,
    warrantyInformation,
    minimumOrderQuantity,
    stock,
    weight,
    dimensions,
    meta,
    sku,
    tags,
    images,
  } = product;

  const originalPrice = (price / (1 - discountPercentage / 100)).toFixed(2);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
          src={images?.[0]}
          alt={title}
          className="w-full rounded-xl object-cover border"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-600">{description}</p>

          <div className="text-sm text-gray-500">
            <p>
              Brand: <span className="font-medium text-black">{brand}</span>
            </p>
            <p>Category: {category}</p>
            <p>SKU: {sku}</p>
            <p>Barcode: {meta.barcode}</p>
          </div>

          <div className="flex gap-4 items-center text-lg font-semibold">
            <p className="text-blue-600">${price}</p>
            {discountPercentage > 0 && (
              <>
                <p className="line-through text-gray-400 text-sm">
                  ${originalPrice}
                </p>
                <span className="text-red-600 text-sm">
                  -{discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          <p className="text-yellow-600">⭐ {rating} / 5</p>

          <p
            className={`inline-block px-3 py-1 text-sm rounded-full font-medium ${
              availabilityStatus === "In Stock"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {availabilityStatus}
          </p>

          <div className="border-t pt-4 mt-4 space-y-2 text-sm">
            <p>
              <span className="font-medium">Return Policy:</span> {returnPolicy}
            </p>
            <p>
              <span className="font-medium">Warranty:</span>{" "}
              {warrantyInformation}
            </p>
            <p>
              <span className="font-medium">Shipping:</span>{" "}
              {shippingInformation}
            </p>
            <p>
              <span className="font-medium">Minimum Order Qty:</span>{" "}
              {minimumOrderQuantity}
            </p>
            <p>
              <span className="font-medium">Stock Left:</span> {stock}
            </p>
            <p>
              <span className="font-medium">Weight:</span> {weight}g
            </p>
            <p>
              <span className="font-medium">Dimensions:</span>{" "}
              {dimensions.width} x {dimensions.height} x {dimensions.depth} mm
            </p>
            <p>
              <span className="font-medium">Tags:</span> {tags?.join(", ")}
            </p>
          </div>

          <div className="pt-4">
            <img
              src={meta.qrCode}
              alt="QR Code"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
