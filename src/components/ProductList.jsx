import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

function ProductList() {
  const [allProducts, setAllProducts] = useState([]);
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("https://dummyjson.com/products");
        if (!data.ok) throw new Error("Failed to fetch products");
        const res = await data.json();
        setAllProducts(res.products);
        setList(res.products);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setError("Unable to load products. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = allProducts.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setList(filtered);
  };

  if (error) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">{error}</div>
    );
  }

  if (list.length === 0 && !error) {
    return (
      <div className="p-6 text-center text-gray-600 font-medium">
        {search ? "No results found." : "Loading products..."}
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSearch} className="p-6 flex gap-2">
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          value={search}
          className="border px-3 py-1 rounded w-full max-w-xs"
          placeholder="Search by title..."
        />
        <button
          type="submit"
          className="bg-blue-200 cursor-pointer border text-black px-4 py-1 rounded"
        >
          Search
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {list.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
