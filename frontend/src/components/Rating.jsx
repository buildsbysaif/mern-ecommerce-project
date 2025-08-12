import React from 'react';

const Rating = ({ value, text }) => {
  return (
    <div className="flex items-center">
      <span>
        <i className={value >= 1 ? 'fas fa-star' : value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: '#f8e825' }}></i>
      </span>
      <span>
        <i className={value >= 2 ? 'fas fa-star' : value >= 1.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: '#f8e825' }}></i>
      </span>
      <span>
        <i className={value >= 3 ? 'fas fa-star' : value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: '#f8e825' }}></i>
      </span>
      <span>
        <i className={value >= 4 ? 'fas fa-star' : value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: '#f8e825' }}></i>
      </span>
      <span>
        <i className={value >= 5 ? 'fas fa-star' : value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'} style={{ color: '#f8e825' }}></i>
      </span>
      <span className="ml-2 text-gray-600">{text && text}</span>
    </div>
  );
};

export default Rating;