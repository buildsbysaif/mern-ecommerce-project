import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCartItems } from '../store/slices/cartSlice';
import API from '../api'; 
import { toast } from 'react-toastify';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  // Calculations
  const itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const taxPrice = itemsPrice * 0.18;
  const shippingPrice = 0;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const placeOrderHandler = async () => {
    try {
      
      const res = await API.post('/api/orders', {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice.toFixed(2),
        taxPrice: taxPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
      });
      

      dispatch(clearCartItems());
      navigate(`/order/${res.data._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Shipping</h2>
        <p>
          <strong>Address: </strong>
          {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
          {cart.shippingAddress.pincode}, {cart.shippingAddress.state}
        </p>
        <hr className="my-4" />

        <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
        <p>
          <strong>Method: </strong>
          {cart.paymentMethod}
        </p>
        <hr className="my-4" />

        <h2 className="text-2xl font-bold mb-4">Order Items</h2>
        {cart.cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <Link to={`/product/${item._id}`} className="hover:underline">{item.name}</Link>
                </div>
                <div>
                  {item.qty} x Rs {item.price}/- = <b>Rs {item.qty * item.price}/-</b>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 uppercase">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b">
              <span>Items</span>
              <span>Rs {itemsPrice.toFixed(2)}/-</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>GST (18%)</span>
              <span>Rs {taxPrice.toFixed(2)}/-</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg border-t mt-2">
              <span>Total</span>
              <span>Rs {totalPrice.toFixed(2)}/-</span>
            </div>
          </div>
          <button
            type="button"
            className="w-full bg-gray-800 text-white py-2 mt-4 rounded hover:bg-gray-700 disabled:bg-gray-400"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;