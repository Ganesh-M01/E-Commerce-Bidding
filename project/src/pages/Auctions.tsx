import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, FilterIcon, ClockIcon } from 'lucide-react';

export default function Auctions() {
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder data - will be replaced with real data from Supabase
  const auctions = [
    {
      id: 1,
      title: "Victorian Era Diamond Necklace",
      description: "Exquisite 19th century necklace featuring brilliant-cut diamonds",
      currentBid: 5000,
      image: "https://images.unsplash.com/photo-1603974372087-0c4b6e081825?auto=format&fit=crop&w=800&q=80",
      endsIn: "2 days"
    },
    {
      id: 2,
      title: "Art Deco Sapphire Ring",
      description: "1920s ring with natural sapphire and diamond accents",
      currentBid: 3500,
      image: "https://images.unsplash.com/photo-1603974373506-4d7f7f1b0e7e?auto=format&fit=crop&w=800&q=80",
      endsIn: "1 day"
    },
    {
      id: 3,
      title: "Edwardian Pearl Brooch",
      description: "Elegant pearl and diamond brooch from the Edwardian period",
      currentBid: 2800,
      image: "https://images.unsplash.com/photo-1603974374096-7e34f4746e8d?auto=format&fit=crop&w=800&q=80",
      endsIn: "3 days"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search auctions..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200">
            <FilterIcon className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Auctions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <Link
            key={auction.id}
            to={`/auctions/${auction.id}`}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              src={auction.image}
              alt={auction.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{auction.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{auction.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-purple-600 font-semibold">
                  Current Bid: ${auction.currentBid.toLocaleString()}
                </span>
                <div className="flex items-center text-gray-500">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>{auction.endsIn}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}