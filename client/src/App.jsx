import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Navbar />
        <main className="px-6 md:px-12 lg:px-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auctions" element={<Auctions />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function Navbar() {
  return (
    <nav className="flex justify-between p-4 shadow-md">
      <h1 className="text-xl font-bold">Antique Jewelry</h1>
      <ul className="flex gap-4">
        <li><Link to="/auctions">Auctions</Link></li>
        <li><Link to="/collections">Collections</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <div>
        <button className="px-3 py-1 border rounded">Sign In</button>
        <button className="px-3 py-1 bg-black text-white rounded ml-2">Register</button>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <section>
      <h2 className="text-2xl font-bold text-center my-6">Live Auctions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AuctionCard title="RARE Diamond Ring" price="Rs 89,999" time="2h 45m" bids={12} />
        <AuctionCard title="RARE Sapphire Necklace" price="Rs 8,88,000" time="3h 20m" bids={24} />
        <AuctionCard title="RARE Pearl Bracelet" price="Rs 90,90,900" time="1h 15m" bids={8} />
      </div>

      <h2 className="text-2xl font-bold mt-12">Upcoming Auctions</h2>
      <AuctionCard title="RARE Emerald Ring" price="Rs 80,000" time="Starts in 60 days" bids={0} />
    </section>
  );
}

function AuctionCard({ title, price, time, bids }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <div className="h-48 bg-gray-300 flex items-center justify-center">Img</div>
      <h3 className="text-lg font-semibold mt-2">{title}</h3>
      <p>Current Bid: <strong>{price}</strong></p>
      <p>{bids} bids</p>
      <p className="text-sm text-gray-500">Ends in {time}</p>
      <button className="mt-2 px-4 py-2 bg-black text-white rounded">Place Bid</button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white p-6 mt-12">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-bold">Antique Jewelry</h3>
          <p>Your trusted source for antique auctions.</p>
        </div>
        <div>
          <h3 className="font-bold">Quick Links</h3>
          <ul>
            <li>About Us</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Contact</h3>
          <p>Email: example@antiquejewelry.com</p>
          <p>Phone: 1234567890</p>
        </div>
        <div>
          <h3 className="font-bold">Newsletter</h3>
          <input type="email" placeholder="Enter your email" className="p-2 border rounded w-full" />
          <button className="mt-2 px-4 py-2 bg-white text-black rounded">Subscribe</button>
        </div>
      </div>
    </footer>
  );
}

export default App;
