import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import SearchBox from './SearchBox';
import LocationModal from './LocationModal';
import { FaShoppingCart, FaUser, FaMapMarkerAlt, FaCaretDown } from 'react-icons/fa';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [location, setLocation] = useState('Your Location'); 

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
    setIsMenuOpen(false);
    setIsAdminMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white text-gray-800 shadow-md py-2 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/">
                <img src="/e-logo.png" alt="E-Commerce Pro Logo" className="h-14 w-auto" />
              </Link>
              <div className="ml-4 hidden md:block">
                <button onClick={() => setIsLocationModalOpen(true)} className="flex items-center text-sm text-gray-500 hover:text-indigo-600">
                  <FaMapMarkerAlt className="mr-1" />
                  {location} 
                </button>
              </div>
            </div>
            <div className="flex-1 mx-4 max-w-lg">
              <SearchBox />
            </div>
            <div className="flex items-center">
              <nav className="flex items-center">
                {userInfo ? (
                  <div className="relative ml-4">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="font-bold flex items-center">
                      {userInfo.name} <FaCaretDown className="ml-1" />
                    </button>
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-black border">
                        <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                        <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login" className="ml-4 hidden sm:inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700">
                    <FaUser className="inline-block mr-2" />
                    Sign In
                  </Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <div className="relative ml-4">
                    <button onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)} className="font-bold flex items-center">
                      Admin <FaCaretDown className="ml-1" />
                    </button>
                    {isAdminMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 text-black border">
                        <Link to="/admin/userlist" onClick={() => setIsAdminMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">Users</Link>
                        <Link to="/admin/productlist" onClick={() => setIsAdminMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">Products</Link>
                        <Link to="/admin/orderlist" onClick={() => setIsAdminMenuOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">Orders</Link>
                      </div>
                    )}
                  </div>
                )}
                <Link to="/cart" className="ml-4 relative">
                  <FaShoppingCart className="text-2xl" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </span>
                  )}
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
      
      {isLocationModalOpen && <LocationModal setLocation={setLocation} onClose={() => setIsLocationModalOpen(false)} />}
    </>
  );
};

export default Header;