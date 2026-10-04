
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import BrowseItems from "./pages/BrowseItems";
import ItemDetails from "./pages/ItemDetails";
import ClaimItem from "./pages/ClaimItem";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

function Home() {
  return (
    <div className="app">

      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">✦</span>
          CampusProof
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#browse">Browse Items</a>
        </div>

        <div className="nav-buttons">
          <a href="/login" className="login-btn">
            Login
          </a>

          <a href="/login" className="signup-btn">
            Get Started
          </a>
        </div>
      </nav>

      <section className="hero" id="home">

        <div className="hero-content">

          <div className="badge">
            🔎 Smart Campus Lost & Found
          </div>

          <h1>
            Lost something?
            <br />
            <span>Let's find it.</span>
          </h1>

          <p>
            CampusProof makes it easier to recover lost belongings
            by connecting lost and found items across your campus.
          </p>

          <div className="hero-buttons">
            <a href="/login" className="primary-btn">
              I Lost Something →
            </a>

            <a href="/login" className="secondary-btn">
              I Found Something
            </a>
          </div>

        </div>

        <div className="hero-visual">

          <div className="search-card">

            <div className="search-header">
              <span>Recent Found Items</span>
              <span className="green-dot">●</span>
            </div>

            <div className="item-card">
              <div className="item-image">🎧</div>

              <div className="item-info">
                <h3>Wireless Earbuds</h3>
                <p>Found near Library</p>
                <span>Today · 2:30 PM</span>
              </div>

              <div className="match">
                94% Match
              </div>
            </div>

            <div className="item-card">
              <div className="item-image">🎒</div>

              <div className="item-info">
                <h3>Black Backpack</h3>
                <p>Found near Cafeteria</p>
                <span>Yesterday · 5:15 PM</span>
              </div>

              <div className="match">
                87% Match
              </div>
            </div>

            <div className="item-card">
              <div className="item-image">⌚</div>

              <div className="item-info">
                <h3>Smart Watch</h3>
                <p>Found near Block B</p>
                <span>Aug 10 · 11:20 AM</span>
              </div>

              <div className="match">
                82% Match
              </div>
            </div>

          </div>

        </div>

      </section>

      <section className="features" id="how-it-works">

        <div className="section-heading">
          <span>WHY CAMPUSPROOF?</span>
          <h2>A smarter way to find what you've lost.</h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">📸</div>
            <h3>Visual Matching</h3>
            <p>
              Upload an image and discover visually similar
              found items.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Verified Claims</h3>
            <p>
              Ownership verification helps prevent false claims.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Campus Based</h3>
            <p>
              Find items based on locations and recent activity.
            </p>
          </div>

        </div>

      </section>

      <section className="cta">
        <h2>Lost something on campus?</h2>

        <p>
          Report it now and let CampusProof help you find it.
        </p>

        <a href="/login" className="primary-btn">
          Report Lost Item →
        </a>
      </section>

      <footer>

        <div className="logo">
          <span className="logo-icon">✦</span>
          CampusProof
        </div>

        <p>
          Smart Lost & Found for modern campuses.
        </p>

        <span>© 2026 CampusProof</span>

      </footer>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/report-lost" element={<ReportLost />} />

        <Route path="/report-found" element={<ReportFound />} />

        <Route path="/browse-items" element={<BrowseItems />} />

        <Route path="/item/:id" element={<ItemDetails />} />

        <Route path="/claim/:id" element={<ClaimItem />} />

        <Route path="/profile" element={<Profile />} />
        
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;