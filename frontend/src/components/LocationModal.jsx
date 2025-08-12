import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { countries } from '../data/countries.js';

const LocationModal = ({ setLocation, onClose }) => {
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleLocationSelect = (country) => {
    setLocation(country);
    onClose();
  };

  
  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <FaTimes size={20} />
        </button>
        <h2 className="text-xl font-bold mb-2">Choose your delivery location</h2>
        <p className="text-sm text-gray-500 mb-4">Enter your address and we will specify the offer for your area.</p>
        <div className="relative">
          
          <input 
            type="text"
            placeholder="Search your area..."
            className="w-full border rounded-md p-2 pl-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className="mt-4 h-64 overflow-y-auto">
          
          {filteredCountries.sort().map(country => (
            <li 
              key={country} 
              className="p-2 hover:bg-gray-100 cursor-pointer rounded-md"
              onClick={() => handleLocationSelect(country)}
            >
              {country}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationModal;