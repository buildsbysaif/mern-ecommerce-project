import React from 'react';
import { Link } from 'react-router-dom';


const categories = [
  { name: 'Fashion', icon: '/images/icons/fashion.png', link: '/category/fashion' },
  { name: 'Electronics', icon: '/images/icons/electronics.png', link: '/category/electronics' },
  { name: 'Bags', icon: '/images/icons/bags.png', link: '/category/bags' },
  { name: 'Footwear', icon: '/images/icons/footwear.png', link: '/category/footwear' },
  { name: 'Groceries', icon: '/images/icons/groceries.png', link: '/category/groceries' },
  { name: 'Beauty', icon: '/images/icons/beauty.png', link: '/category/beauty' },
];

const FeaturedCategories = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Categories</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {categories.map((category) => (
            <Link to={category.link} key={category.name} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 p-4 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <img src={category.icon} alt={category.name} className="w-12 h-12 object-contain" />
              </div>
              <span className="mt-2 font-semibold text-gray-700">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;