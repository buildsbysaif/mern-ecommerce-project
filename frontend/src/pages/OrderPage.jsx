import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API from '../api';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const OrderPage = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);

  const fetchOrder = async () => {
    try {
      
      const { data } = await API.get(`/api/orders/${orderId}`);
      setOrder(data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    if (userInfo) {
      fetchOrder();
    }
  }, [orderId, userInfo]);
  
  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    order && (
      <>
        <h1 className="text-3xl font-bold mb-4">Order {order._id}</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="md:col-span-2">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold mb-2">Shipping</h2>
              <p><strong>Name: </strong> {order.user.name}</p>
              <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`} className="text-blue-500">{order.user.email}</a></p>
              <p><strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.pincode}</p>
              {order.isDelivered ? (
                <div className="mt-2 p-2 bg-green-100 text-green-800 rounded">Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</div>
              ) : (
                <div className="mt-2 p-2 bg-red-100 text-red-800 rounded">Not Delivered</div>
              )}
            </div>

            <div className="border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold mb-2">Payment Method</h2>
              <p><strong>Method: </strong>{order.paymentMethod}</p>
              {order.isPaid ? (
                <div className="mt-2 p-2 bg-green-100 text-green-800 rounded">Paid on {new Date(order.paidAt).toLocaleDateString()}</div>
              ) : (
                <div className="mt-2 p-2 bg-red-100 text-red-800 rounded">Not Paid</div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Order Items</h2>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <Link to={`/product/${item.product}`} className="hover:underline">{item.name}</Link>
                    </div>
                    <div>{item.qty} x Rs {item.price}/- = <b>Rs {(item.qty * item.price).toFixed(2)}/-</b></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4 uppercase">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b"><span>Items</span><span>Rs {order.itemsPrice}/-</span></div>
                <div className="flex justify-between py-2 border-b"><span>GST</span><span>Rs {order.taxPrice}/-</span></div>
                <div className="flex justify-between py-2 border-b"><span>Shipping</span><span>Rs {order.shippingPrice}/-</span></div>
                <div className="flex justify-between py-2 font-bold text-lg border-t mt-2"><span>Total</span><span>Rs {order.totalPrice}/-</span></div>
              </div>
              
              {/* STRIPE PAYMENT FORM */}
              {!order.isPaid && order.paymentMethod !== 'COD' && (
                <div className="mt-4">
                  <Elements stripe={stripePromise}>
                    <CheckoutForm order={order} refetchOrder={fetchOrder} />
                  </Elements>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default OrderPage;