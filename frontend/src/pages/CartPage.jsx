import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <h1 className="text-3xl mb-6">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty <Link to='/' className="text-blue-500 hover:underline">Go Back</Link></p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <Link to={`/product/${item._id}`} className="hover:underline">{item.name}</Link>
                </div>
                
                <div className="font-bold">Rs {item.price}/-</div>
                <div>
                  <select
                    value={item.qty}
                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                    className="p-1 border rounded"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button onClick={() => removeFromCartHandler(item._id)}>
                  <i className="fas fa-trash text-red-500"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart summary block with GST */}
      <div>
        <div className="border border-gray-200 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 uppercase">
            Price Details
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b">
              <span>Price ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
              <span>Rs {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}/-</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span>GST (18%)</span>
              <span>+ Rs {(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * 0.18).toFixed(2)}/-</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg border-t mt-2">
              <span>Total Amount</span>
              <span>Rs {(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0) * 1.18).toFixed(2)}/-</span>
            </div>
          </div>
          <button
            className="w-full bg-gray-800 text-white py-2 mt-4 rounded hover:bg-gray-700 disabled:bg-gray-400"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;