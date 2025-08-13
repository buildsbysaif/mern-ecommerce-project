import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import API from '../api';
import { addToCart } from '../store/slices/cartSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const [product, setProduct] = useState({ reviews: [] });
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
      toast.error(error?.response?.data?.message || error.message);
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
      // UPDATED: Removed manual headers config
      await API.post(`/api/products/${productId}/reviews`, { rating, comment });
      toast.success('Review Submitted!');
      setRating(0);
      setComment('');
      fetchProduct(); // Refetch product to show the new review
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
        <div className="lg:col-span-1">
          <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" />
        </div>

        <div className="md:col-span-1 lg:col-span-1">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-lg mb-4 border-b pb-4">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </div>
          <p className="text-xl mb-4">Price: Rs {product.price}/-</p>
          <p className="leading-relaxed">{product.description}</p>
        </div>

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
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {product.reviews.length === 0 && <p className="p-4 bg-gray-100 rounded">No Reviews</p>}
        <div className="space-y-4">
          {product.reviews.map((review) => (
            <div key={review._id} className="p-4 bg-gray-50 rounded-lg border">
              <strong className="font-semibold">{review.name}</strong>
              <Rating value={review.rating} />
              <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
              <p className="mt-2">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Write a Customer Review</h2>
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                <select required value={rating} onChange={(e) => setRating(Number(e.target.value))} className="p-2 border rounded w-full md:w-1/2">
                  <option value="">Select...</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Comment</label>
                <textarea required rows="3" value={comment} onChange={(e) => setComment(e.target.value)} className="p-2 border rounded w-full"></textarea>
              </div>
              <button type="submit" className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700">Submit</button>
            </form>
          ) : (
            <p className="p-4 bg-blue-50 rounded">
              Please <Link to="/login" className="text-blue-500 hover:underline font-semibold">sign in</Link> to write a review.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;