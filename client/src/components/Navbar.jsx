import React from "react";
import { Link } from "react-router-dom";
import FollowCursor from "./FlowCursor"


function Navbar() {
  return (

    <nav className="navbar">
      <h1 className="logo">Antique Jewelry</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/auctions">Auctions</Link></li>
        <li><Link to="/collections">Collections</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div className="auth-buttons">
        <button className="btn">Sign In</button>
        <button className="btn primary">Register</button>
      </div>
    </nav>
  );
}

export default Navbar;
