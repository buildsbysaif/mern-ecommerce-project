import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const CategoryNav = () => {
  const categories = ['Fashion', 'Electronics', 'Bags', 'Footwear', 'Groceries', 'Beauty'];

  return (
    <nav className="bg-white shadow-sm border-t border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="relative group">
            <button className="bg-slate-800 text-white font-bold py-3 px-4 inline-flex items-center">
              <FaBars className="mr-2" />
              All Categories
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-6 ml-6">
            {categories.map((category) => (
              
              <Link key={category} to={`/category/${category.toLowerCase()}`} className="text-gray-600 hover:text-indigo-600 font-semibold">
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CategoryNav;