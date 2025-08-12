import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TopBar from './components/TopBar';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryNav from './components/CategoryNav';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <CategoryNav />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default App;