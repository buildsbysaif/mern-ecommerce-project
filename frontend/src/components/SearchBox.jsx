import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex w-full">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="text-black p-2 rounded-l-md w-full border-2 border-transparent focus:outline-none focus:border-indigo-500"
      />
      <button type="submit" className="p-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-700">
        Search
      </button>
    </form>
  );
};

export default SearchBox;