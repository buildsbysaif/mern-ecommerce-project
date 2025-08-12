import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import Loader from './Loader';

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterTopProducts = async () => {
      try {
        const { data: topProducts } = await axios.get('http://localhost:5000/api/products/top');

        const desiredCategories = ['Electronics', 'Footwear', 'Bags', 'Fashion'];
        const featuredProducts = [];
        const seenCategories = new Set();

        for (const product of topProducts) {
          if (desiredCategories.includes(product.category) && !seenCategories.has(product.category)) {
            featuredProducts.push(product);
            seenCategories.add(product.category);
          }
        }

        for (const product of topProducts) {
            if (featuredProducts.length >= 5) break;
            if (!featuredProducts.find(p => p._id === product._id)) {
                featuredProducts.push(product);
            }
        }
        
        setProducts(featuredProducts);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAndFilterTopProducts();
  }, []);

  return loading ? <Loader /> : (
    <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      className="mb-8"
    >
      {products.map((product) => (
        <div key={product._id} className="relative">
          <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} className="h-96 object-contain"/>
            <p className="legend">{product.name} (Rs {product.price}/-)</p>
          </Link>
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;