import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auctions from "./pages/Auctions";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import FollowCursor from "./components/FlowCursor"
import "./styles.css"; // Import the updated CSS

function App() {
  return (
    <Router>
      <div className="container">
      <FollowCursor color="#6a0dad" />
        <Navbar />
        <main className="content">
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

export default App;
