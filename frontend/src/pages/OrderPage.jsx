import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API from '../api';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';


const stripePromise = loadStripe('pk_test_51RunfJFdLyBYPhIQ8Aw6l9cqGx0HCKesunPu8kXKaOXDHNNEztkfCEg07mM20AKzVY6gub8MDs4K3PKS7mNtIDj900dja7tFQf');

const OrderPage = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector((state) => state.auth);

  const fetchOrder = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await API.get(`/api/orders/${orderId}`, config);
      setOrder(data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId, userInfo.token]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    order && (
      <>
        <h1 className="text-3xl font-bold mb-4">Order {order._id}</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="md:col-span-2">
             
          </div>

          {/* Right Column: Summary */}
          <div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4 uppercase">Order Summary</h2>
              

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