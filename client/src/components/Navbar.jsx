import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between">
      <h1 className="text-xl font-bold">
        <Link to="/">Antique Jewelry</Link>
      </h1>
      <div className="space-x-4">
        <Link to="/auctions" className="hover:text-blue-600">Auctions</Link>
        <Link to="/collections" className="hover:text-blue-600">Collections</Link>
        <Link to="/contact" className="hover:text-blue-600">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
