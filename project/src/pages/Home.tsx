import React from 'react';
import { Link } from 'react-router-dom';
import { GemIcon, TrendingUpIcon, ShieldCheckIcon, ClockIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl overflow-hidden">
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover Rare Antique Jewelry
          </h1>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Bid on exclusive pieces from around the world. Each item tells a unique story of craftsmanship and history.
          </p>
          <Link
            to="/auctions"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-50 transition-colors"
          >
            Explore Auctions
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUpIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Bidding</h3>
              <p className="text-gray-600">
                Experience the thrill of live auctions with instant bid updates and notifications.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheckIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                Every transaction is protected with state-of-the-art security measures.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <GemIcon className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Authenticity</h3>
              <p className="text-gray-600">
                Each piece is thoroughly authenticated by expert appraisers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Auctions Preview */}
      <section className="py-16 bg-gray-50 rounded-2xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Auctions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder cards - will be replaced with real data */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img
                  src={`https://images.unsplash.com/photo-${i === 1 ? '1603974372087-0c4b6e081825' : i === 2 ? '1603974373506-4d7f7f1b0e7e' : '1603974374096-7e34f4746e8d'}?auto=format&fit=crop&w=800&q=80`}
                  alt="Antique jewelry"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Vintage Diamond Ring</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>Ends in 2 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-600 font-semibold">Current Bid: $2,500</span>
                    <Link
                      to="/auctions"
                      className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200"
                    >
                      Place Bid
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}