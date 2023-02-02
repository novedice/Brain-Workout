// import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { CartContext } from '../Context/CartContext';
// import { useProducts } from '../hooks/products';
// import { styleText } from '../styleClassNames/styleConstants';

export function Navigation() {
  return (
    <nav className="mb-3 flex h-11 w-[100%] items-center justify-around bg-gray-400 text-center text-lg text-white ">
      <Link to="/" className="hover:text-red-200">
        MAIN PAGE
      </Link>
      <Link to="/game" className="hover:text-red-200">
        BRAIN GAME
      </Link>
      <Link to="/statistic" className="hover:text-red-200">
        STATISTIC
      </Link>
      <Link to="/signup" className="hover:text-red-200">
        SIGN UP
      </Link>
      <Link to="/account" className="hover:text-red-200">
        ACCOUNT
      </Link>
    </nav>
  );
}
