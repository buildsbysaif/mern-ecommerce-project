import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import API from '../api';
import { addToCart } from '../store/slices/cartSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/api/products/${productId}`);
      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await API.post(`/api/products/${productId}/reviews`, { rating, comment }, config);
      toast.success('Review Submitted!');
      setRating(0);
      setComment('');
      fetchProduct();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Link to='/' className='inline-block mb-4 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded'>
        Go Back
      </Link>
      
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Image Column */}
        <div className="lg:col-span-1">
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>

        {/* Details Column */}
        <div className="md:col-span-1 lg:col-span-1">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-lg mb-4 border-b pb-4">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </div>
          <p className="text-xl mb-4">Price: Rs {product.price}/-</p>
          <p className="leading-relaxed">{product.description}</p>
        </div>

        {/* Add to Cart Column */}
        <div className="md:col-span-2 lg:col-span-1">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between py-2 border-b">
              <span>Price:</span>
              <strong>Rs {product.price}/-</strong>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>Status:</span>
              <strong>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
            </div>
            {product.countInStock > 0 && (
              <div className="flex justify-between py-2 border-b">
                <span>Qty</span>
                <select value={qty} onChange={(e) => setQty(Number(e.target.value))} className="p-1 border rounded">
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            )}
            <button
              className="w-full bg-gray-800 text-white py-2 mt-4 rounded hover:bg-gray-700 disabled:bg-gray-400"
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        
      </div>
    </>
  );
};

export default ProductPage;