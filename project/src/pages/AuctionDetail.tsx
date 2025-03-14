import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ClockIcon, HeartIcon, ShareIcon, AlertCircleIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { FieldValue } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';

interface Bid {
  id: string;
  userName: string;
  amount: number;
  timestamp: Date;
}

interface BidData {
  auctionId: string;
  userId: string;
  userName: string;
  amount: number;
  timestamp: FieldValue;
}

export default function AuctionDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [bidAmount, setBidAmount] = useState('');
  const [bidHistory, setBidHistory] = useState<Bid[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentBid, setCurrentBid] = useState(5000);
  const [nextMinBid, setNextMinBid] = useState(5100);

  const auction = {
    id,
    title: "Victorian Era Diamond Necklace",
    description:
      "This exquisite 19th century necklace features brilliant-cut diamonds set in sterling silver and gold. The piece showcases the exceptional craftsmanship of the Victorian era, with intricate filigree work and a secure clasp mechanism. The necklace has been authenticated by leading experts in antique jewelry.",
    image:
      "https://images.unsplash.com/photo-1603974372087-0c4b6e081825?auto=format&fit=crop&w=800&q=80",
    endsIn: "2 days",
  };

  // Fetch bid history in real-time
  useEffect(() => {
    if (!id) return;

    const q = query(collection(db, 'biddingHistory'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bids = snapshot.docs
        .filter((doc) => doc.data().auctionId === id)
        .map((doc) => {
          const data = doc.data();
          const timestamp = data.timestamp?.toDate?.() || new Date();
          return {
            id: doc.id,
            userName: data.userName,
            amount: data.amount,
            timestamp,
          };
        });

      if (bids.length > 0) {
        const highestBid = Math.max(...bids.map((bid) => bid.amount));
        setCurrentBid(highestBid);
        setNextMinBid(highestBid + 100);
      }

      setBidHistory(bids);
    });

    return () => unsubscribe();
  }, [id]);

  const handleBid = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const bidValue = Number(bidAmount);
    if (bidValue < nextMinBid) {
      alert(`Your bid must be at least $${nextMinBid.toLocaleString()}`);
      return;
    }

    try {
      setIsSubmitting(true);

      const userName = user.displayName || user.email?.split('@')[0] || 'Anonymous';

      const bidData: BidData = {
        auctionId: id!,
        userId: user.uid,
        userName,
        amount: Number(bidAmount),
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, 'biddingHistory'), bidData);
      setBidAmount('');
    } catch (error) {
      console.error('Error placing bid:', error);
      alert('Failed to place bid. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidBid = Number(bidAmount) >= nextMinBid;

  return (
    <div className="space-y-4">
      {/* Image Section */}
      <div className="bg-white p-4 rounded-lg">
        <img
          src={auction.image}
          alt={auction.title}
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      {/* Thumbnail Images */}
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
              Current Bid: ${currentBid.toLocaleString()}
            </div>
            <div className="text-gray-600">Next minimum bid: ${nextMinBid.toLocaleString()}</div>
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
                  min={nextMinBid}
                  step="100"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={`Enter bid amount (min $${nextMinBid.toLocaleString()})`}
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-purple-600 text-white py-3 rounded-lg font-semibold ${
                  !isValidBid || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-700'
                }`}
                disabled={!isValidBid || isSubmitting}
              >
                {isSubmitting ? 'Placing Bid...' : bidAmount ? 
                  isValidBid ? 'Place Bid' : `Minimum bid is $${nextMinBid.toLocaleString()}` 
                  : 'Place Bid'}
              </button>
            </form>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
              <AlertCircleIcon className="h-5 w-5 text-yellow-400 mr-2 flex-shrink-0" />
              <p className="text-sm text-yellow-700">Please sign in to place a bid on this item.</p>
            </div>
          )}
        </div>

        {/* Bid History */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Bid History</h2>
          <div className="space-y-4">
            {bidHistory.length > 0 ? (
              bidHistory.map((bid) => (
                <div key={bid.id} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{bid.userName}</span>
                  <span className="font-semibold">${bid.amount.toLocaleString()}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No bids yet. Be the first to bid!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
