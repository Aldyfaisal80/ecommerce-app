import { PiCaretUpDown } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteProduct } from "../../../features/product";
import Pagination from "../../../components/elements/Pagination";
import { useEffect, useState } from "react";

export default function DashboardProduct() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [limit] = useState(10);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:4455/products?key=aldypanteq&limit=${limit}&page=${page}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        if (!result.data) {
          navigate(-1);
          return;
        }
        setProducts(result.data.products);
        setTotalPages(Math.ceil(result.data.total / limit));
      } catch (error) {
        setError(error instanceof Error ? error.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [page, limit, navigate]);

  const { deleteProduct } = useDeleteProduct();

  const renderElements = () => {
    return products.map((product, index) => (
      <tr key={index}>
        <td className="py-4">{(page - 1) * limit + index + 1}</td> {/* Menghitung nomor urut produk berdasarkan halaman */}
        <td className="py-4">{product.name}</td>
        <td className="py-4">{product.category}</td>
        <td className="py-4">{product.price}</td>
        <td className="text-center p-1 font-semibold">
          <div className="flex justify-evenly items-center gap-2">
            <Link to={`/dashboard/edit/${product.id}`} className="bg-gray-100 text-gray-600 shadow-md px-4 py-2 rounded-l hover:bg-gray-300 transition-all ease-in-out duration-300 w-[90px]">Edit</Link>
            <Link to={`/dashboard/detail/${product.id}`} className="bg-gray-100 text-gray-600 shadow-md px-4 py-2 rounded-l hover:bg-gray-300 transition-all ease-in-out duration-300 w-[90px]">View</Link>
            <button className="bg-gray-100 text-gray-600 shadow-md px-4 py-2 rounded-l hover:bg-gray-300 transition-all ease-in-out duration-300 w-[90px]" onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="flex w-[1600px] h-screen container justify-center font-poppins">
      <div className="flex w-full justify-center">
        <table className="w-3/4 p-20 text-center rounded-xl shadow-lg bg-white divide-y-2 divide-gray-200">
          <thead className="text-center text-text-gray bg-bg-gray">
            <tr className="">
              <th className="p-4">
                <p className="flex justify-evenly pl-8 items-center cursor-pointer">No<PiCaretUpDown className="" /></p>
              </th>
              <th className="p-4">
                <p className="flex justify-evenly pl-8 items-center cursor-pointer">Name<PiCaretUpDown className="" /></p>
              </th>
              <th className="p-4">
                <p className="flex justify-evenly pl-8 items-center cursor-pointer">Category<PiCaretUpDown className="" /></p>
              </th>
              <th className="p-4">
                <p className="flex justify-evenly pl-8 items-center cursor-pointer">Price<PiCaretUpDown className="" /></p>
              </th>
              <th className="p-4">
                <p className="flex justify-center items-center cursor-pointer">Action</p>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-gray-200">
            {renderElements()}
            <tr>
              <td colSpan={5} className="py-3">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
