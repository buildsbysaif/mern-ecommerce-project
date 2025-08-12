import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Product from '../components/Product';
import Loader from '../components/Loader';
import ProductCarousel from '../components/ProductCarousel';
import FeaturedCategories from '../components/FeaturedCategories';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { keyword, category } = useParams(); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        
        const { data } = await axios.get(`/api/products`, {
        params: { keyword, category },
      });
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword, category]); 

  return (
    <>
      {!keyword && !category ? (
        <>
          <ProductCarousel />
          <FeaturedCategories />
        </>
      ) : (
        <Link to='/' className='inline-block mb-4 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded'>
          Go Back
        </Link>
      )}

      <div className="mt-12">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {keyword ? `Search Results for "${keyword}"` : category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'Latest Products'}
        </h1>
        {loading ? <Loader /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;