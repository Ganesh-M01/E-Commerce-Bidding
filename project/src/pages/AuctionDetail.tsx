import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClockIcon, HeartIcon, ShareIcon, AlertCircleIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AuctionDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [bidAmount, setBidAmount] = useState('');

  // Placeholder data - will be replaced with real data from Supabase
  const auction = {
    id,
    title: "Victorian Era Diamond Necklace",
    description: "This exquisite 19th century necklace features brilliant-cut diamonds set in sterling silver and gold. The piece showcases the exceptional craftsmanship of the Victorian era, with intricate filigree work and a secure clasp mechanism. The necklace has been authenticated by leading experts in antique jewelry.",
    currentBid: 5000,
    nextMinimumBid: 5100,
    image: "https://images.unsplash.com/photo-1603974372087-0c4b6e081825?auto=format&fit=crop&w=800&q=80",
    endsIn: "2 days",
    bidHistory: [
      { id: 1, user: "Alice S.", amount: 5000, time: "2 hours ago" },
      { id: 2, user: "John D.", amount: 4800, time: "3 hours ago" },
      { id: 3, user: "Emma W.", amount: 4500, time: "5 hours ago" },
    ]
  };

  const handleBid = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement bid submission logic with Supabase
    console.log('Placing bid:', bidAmount);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <img
              src={auction.image}
              alt={auction.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={auction.image}
                alt={`${auction.title} view ${i + 1}`}
                className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-75"
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{auction.title}</h1>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <HeartIcon className="h-6 w-6 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <ShareIcon className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center text-gray-600 mb-6">
              <ClockIcon className="h-5 w-5 mr-2" />
              <span>Ends in {auction.endsIn}</span>
            </div>

            <div className="mb-6">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                Current Bid: ${auction.currentBid.toLocaleString()}
              </div>
              <div className="text-gray-600">
                Next minimum bid: ${auction.nextMinimumBid.toLocaleString()}
              </div>
            </div>

            {user ? (
              <form onSubmit={handleBid} className="space-y-4">
                <div>
                  <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Bid (USD)
                  </label>
                  <input
                    type="number"
                    id="bidAmount"
                    min={auction.nextMinimumBid}
                    step="100"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter bid amount"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
                >
                  Place Bid
                </button>
              </form>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                <AlertCircleIcon className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
                <p className="text-sm text-yellow-700">
                  Please sign in to place a bid on this item.
                </p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600 whitespace-pre-line">{auction.description}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Bid History</h2>
            <div className="space-y-4">
              {auction.bidHistory.map((bid) => (
                <div key={bid.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{bid.user}</span>
                    <span className="text-gray-500 ml-2">{bid.time}</span>
                  </div>
                  <span className="font-semibold">${bid.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}