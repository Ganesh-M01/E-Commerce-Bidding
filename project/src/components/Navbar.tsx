import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GemIcon, UserCircle, LogOut, Moon, Sun } from "lucide-react";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Check system preference if no theme is stored
  const getPreferredTheme = () => {
    return localStorage.getItem("theme") || 
           (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  };

  const [theme, setTheme] = useState(getPreferredTheme);

  useEffect(() => {
    // Update theme implementation
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
    
    // Update meta theme-color
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'dark' ? '#111827' : '#ffffff'
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Get username from user object
  const getUserName = () => {
    if (!user) return '';
    return user.displayName || user.email?.split('@')[0] || 'User';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GemIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Antique Bidding
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/auctions" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              Auctions
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                  <UserCircle className="h-5 w-5 mr-1" />
                  <span className="font-medium capitalize">{getUserName()}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                  Sign In
                </Link>
                <Link to="/register" className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600">
                  Register
                </Link>
              </>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
