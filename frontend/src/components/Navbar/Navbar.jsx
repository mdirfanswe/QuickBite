import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom"; // Ensure Link is imported

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  // Helper for mobile menu (if you added the hamburger logic)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="navbar">
      {/* 1. Wrap Logo in Link so clicking Logo also goes Home */}
      <Link to="/" onClick={() => setMenu("home")}>
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <ul className={`navbar-menu ${isMenuOpen ? "show-mobile-menu" : ""}`}>
        {/* 2. THE FIX: Add window.scrollTo(0,0) */}
        {/* This forces the window to go to the top when clicked */}
        <Link
          to="/"
          onClick={() => {
            setMenu("home");
            window.scrollTo(0, 0); // <--- THIS IS THE MAGIC LINE
            setIsMenuOpen(false); // Close mobile menu if open
          }}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>

        <a
          href="#explore-menu"
          onClick={() => {
            setMenu("menu");
            setIsMenuOpen(false);
          }}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => {
            setMenu("mobile-app");
            setIsMenuOpen(false);
          }}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => {
            setMenu("contact-us");
            setIsMenuOpen(false);
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      {/* ... (rest of your right side code) ... */}
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className="dot"></div>
        </div>
        <button>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
