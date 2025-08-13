import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API from '../../api';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import { FaTimes } from 'react-icons/fa';

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      
      const { data } = await API.get('/api/orders');
      setOrders(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deliverHandler = async (orderId) => {
    if (window.confirm('Mark this order as delivered?')) {
      try {
        
        await API.put(`/api/orders/${orderId}/deliver`, {});
        toast.success('Order marked as delivered');
        fetchOrders(); 
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      {loading ? <Loader /> : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">User</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Total</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Paid</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Delivered</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm"></th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{order._id}</td>
                  <td className="py-3 px-4">{order.user && order.user.name}</td>
                  <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">Rs {order.totalPrice}/-</td>
                  <td className="py-3 px-4">
                    {order.isPaid ? (
                      <span className="text-green-500 font-bold">{new Date(order.paidAt).toLocaleDateString()}</span>
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {order.isDelivered ? (
                      <span className="text-green-500 font-bold">{new Date(order.deliveredAt).toLocaleDateString()}</span>
                    ) : (
                      <button onClick={() => deliverHandler(order._id)} className="text-gray-500 hover:text-green-500">
                        Mark Delivered
                      </button>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded text-xs">
                        Details
                      </button>
                    </Link>
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

export default OrderListPage;