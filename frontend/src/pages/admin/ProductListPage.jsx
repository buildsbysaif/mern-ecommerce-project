import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API from '../../api';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/api/products');
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await API.delete(`/api/products/${id}`, config);
        setProducts(products.filter((p) => p._id !== id));
      } catch (error) {
        console.error(error?.response?.data?.message || error.message);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await API.post('/api/products', {}, config);
        navigate(`/admin/product/${data._id}/edit`);
      } catch (error) {
        console.error(error?.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button onClick={createProductHandler} className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">
          <i className="fas fa-plus"></i> Create Product
        </button>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Price</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Category</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Brand</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm"></th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{product._id}</td>
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">Rs {product.price}/-</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">{product.brand}</td>
                  <td className="py-3 px-4 flex items-center">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button className="text-blue-500 mr-4"><i className="fas fa-edit"></i></button>
                    </Link>
                    <button onClick={() => deleteHandler(product._id)} className="text-red-500">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;