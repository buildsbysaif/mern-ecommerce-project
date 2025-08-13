import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import API from '../api';
import { setCredentials } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoadingOrders(true);
      try {
        
        const { data } = await API.get('/api/orders/myorders');
        setOrders(data);
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      fetchOrders();
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      setLoadingUpdate(true);
      try {
        
        const { data } = await API.put('/api/users/profile', { name, email, password });
        dispatch(setCredentials(data));
        toast.success('Profile Updated Successfully');
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setLoadingUpdate(false);
      }
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      
      <div className="md:col-span-1">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        {loadingUpdate && <Loader />}
        <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3"/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3"/>
          </div>
          <button type="submit" className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" disabled={loadingUpdate}>
            Update
          </button>
        </form>
      </div>

      {/* My Orders Section */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        {loadingOrders ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
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
                    <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4">Rs {order.totalPrice}/-</td>
                    <td className="py-3 px-4">
                      {order.isPaid ? (
                        <span className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs">Paid</span>
                      ) : (
                        <span className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-xs">Not Paid</span>
                      )}
                    </td>
                     <td className="py-3 px-4">
                      {order.isDelivered ? (
                        <span className="bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs">Delivered</span>
                      ) : (
                        <span className="bg-red-200 text-red-800 py-1 px-3 rounded-full text-xs">Not Delivered</span>
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
    </div>
  );
};

export default ProfilePage;