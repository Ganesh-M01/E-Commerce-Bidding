import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GemIcon, UserCircle, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GemIcon className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold text-gray-800">Antique Bidding</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/auctions" className="text-gray-600 hover:text-purple-600">
              Auctions
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-purple-600">
                  <UserCircle className="h-5 w-5 mr-1" />
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center text-gray-600 hover:text-purple-600"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-purple-600 hover:text-purple-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}