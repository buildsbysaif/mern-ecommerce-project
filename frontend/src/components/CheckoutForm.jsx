import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckoutForm = ({ order, refetchOrder }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { userInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // 1. Create a Payment Method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      // 2. Call backend to update the order to paid
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const paymentResult = {
          id: paymentMethod.id,
          status: 'COMPLETED',
          update_time: new Date().toISOString(),
          email_address: userInfo.email,
      };

      await axios.put(`http://localhost:5000/api/orders/${order._id}/pay`, paymentResult, config);

      toast.success('Payment Successful!');
      refetchOrder(); // Refetch to show the 'Paid' status
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 p-2 border rounded">
        <CardElement />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-green-500 text-white py-2 mt-2 rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : `Pay Rs ${order.totalPrice}/-`}
      </button>
    </form>
  );
};

export default CheckoutForm;