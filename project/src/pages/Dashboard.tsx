import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ClockIcon, TrendingUpIcon, GemIcon } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  // Placeholder data - will be replaced with real data from Supabase
  const activeBids = [
    {
      id: 1,
      title: "Victorian Diamond Ring",
      currentBid: 3500,
      yourBid: 3200,
      image: "https://images.unsplash.com/photo-1603974373506-4d7f7f1b0e7e?auto=format&fit=crop&w=800&q=80",
      endsIn: "1 day"
    },
    {
      id: 2,
      title: "Art Deco Bracelet",
      currentBid: 2800,
      yourBid: 2800,
      image: "https://images.unsplash.com/photo-1603974374096-7e34f4746e8d?auto=format&fit=crop&w=800&q=80",
      endsIn: "3 days"
    }
  ];

  const wonAuctions = [
    {
      id: 1,
      title: "Emerald Pendant",
      finalPrice: 4200,
      image: "https://images.unsplash.com/photo-1603974372087-0c4b6e081825?auto=format&fit=crop&w=800&q=80",
      date: "Feb 15, 2024"
    }
  ];

  return (
    <div className="space-y-8">
      {/* User Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUpIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600">Active Bids</p>
              <p className="text-2xl font-bold">{activeBids.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <GemIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600">Won Auctions</p>
              <p className="text-2xl font-bold">{wonAuctions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-3 rounded-lg">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-600">Watching</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Bids */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Active Bids</h2>
        <div className="space-y-4">
          {activeBids.map((bid) => (
            <div key={bid.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={bid.image}
                  alt={bid.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium">{bid.title}</h3>
                  <div className="text-sm text-gray-600">
                    Current Bid: ${bid.currentBid.toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-600">
                    Your Bid: ${bid.yourBid.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>Ends in {bid.endsIn}</span>
                </div>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  Place New Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Won Auctions */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Won Auctions</h2>
        <div className="space-y-4">
          {wonAuctions.map((auction) => (
            <div key={auction.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium">{auction.title}</h3>
                  <div className="text-sm text-gray-600">
                    Final Price: ${auction.finalPrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Won on: {auction.date}
                  </div>
                </div>
              </div>
              <button className="text-purple-600 hover:text-purple-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}