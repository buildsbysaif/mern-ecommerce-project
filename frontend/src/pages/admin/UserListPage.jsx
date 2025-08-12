import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API from '../../api';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
// --- IMPORT ICONS ---
import { FaCheck, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await API.get('/api/users', config);
        setUsers(data);
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [userInfo.token]);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await API.delete(`/api/users/${id}`, config);
        setUsers(users.filter((user) => user._id !== id));
        toast.success('User deleted');
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      {loading ? <Loader /> : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">Admin</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm"></th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{user._id}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4"><a href={`mailto:${user.email}`} className="text-blue-500">{user.email}</a></td>
                  <td className="py-3 px-4">
                    {/* --- UPDATED ICONS --- */}
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => deleteHandler(user._id)} className="text-red-500">
                      <FaTrash />
                    </button>
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

export default UserListPage;