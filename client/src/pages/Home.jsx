import React from "react";

function Home() {
  return (
    <section>
      <h2 className="section-title">Live Auctions</h2>
      <div className="card-container">
        <AuctionCard title="RARE Diamond Ring" price="Rs 89,999" time="2h 45m" bids={12} />
        <AuctionCard title="RARE Sapphire Necklace" price="Rs 8,88,000" time="3h 20m" bids={24} />
        <AuctionCard title="RARE Pearl Bracelet" price="Rs 90,90,900" time="1h 15m" bids={8} />
      </div>
    </section>
  );
}

function AuctionCard({ title, price, time, bids }) {
  return (
    <div className="card">
      <div className="image-placeholder">Image</div>
      <h3 className="card-title">{title}</h3>
      <p>Current Bid: <strong>{price}</strong></p>
      <p>{bids} bids</p>
      <p className="time-left">Ends in {time}</p>
      <button className="btn primary">Place Bid</button>
    </div>
  );
}

export default Home;
