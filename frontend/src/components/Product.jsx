import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        </Link>
        <div className="my-2">
          
          <span>{product.numReviews} reviews</span>
        </div>
        
        <h3 className="text-2xl font-bold">Rs {product.price}/-</h3>
      </div>
    </div>
  );
};

export default Product;