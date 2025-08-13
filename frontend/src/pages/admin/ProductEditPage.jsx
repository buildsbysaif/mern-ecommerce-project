import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API from '../../api';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/api/products/${productId}`);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const productData = { name, price, image, brand, category, countInStock, description };
      
      await API.put(`/api/products/${productId}`, productData);
      toast.success('Product updated successfully');
      navigate('/admin/productlist');
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    setUploading(true);
    try {
      
      const { data } = await API.post('/api/upload', formData);
      setImage(data.image);
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Link to="/admin/productlist" className="inline-block mb-4 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
        Go Back
      </Link>
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
          {loading ? <Loader /> : (
            <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3"/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3"/>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"/>
                <input type="file" onChange={uploadFileHandler} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"/>
                {uploading && <Loader />}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3"/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Count In Stock</label>
                <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3"/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3"/>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3"/>
              </div>

              <button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;