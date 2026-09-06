import "../App.css";

function Dashboard() {

  // Get the logged-in user's information
  const savedUser = localStorage.getItem("campusproofUser");

  const user = savedUser
    ? JSON.parse(savedUser)
    : null;

  // Get user's name
  const userName = user?.full_name || "Student";

  // Get first letter for profile avatar
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <div className="dashboard">

      {/* Top Navigation */}
      <nav className="dashboard-nav">

        <div className="logo">
          <span className="logo-icon">✦</span>
          CampusProof
        </div>

        <a
          href="/browse-items"
          className="browse-dashboard-btn"
        >
          Browse All Lost & Found Items →
        </a>

        <div className="dashboard-actions">

          <button className="notification-btn">
            🔔
          </button>

          {/* Logged-in User */}
          <div className="profile-mini">

            <div className="profile-avatar">
              {firstLetter}
            </div>

            <span>{userName}</span>

          </div>

        </div>

      </nav>


      {/* Main Dashboard Content */}
      <main className="dashboard-content">

        {/* Welcome */}
        <div className="welcome-section">

          <span className="dashboard-label">
            STUDENT DASHBOARD
          </span>

          <h1>
            Good evening, {userName} 👋
          </h1>

          <p>
            What would you like to do today?
          </p>

        </div>


        {/* Main Actions */}
        <div className="dashboard-actions-grid">

          {/* Report Lost */}
          <a
            href="/report-lost"
            className="dashboard-action lost-action"
          >

            <div className="action-icon">
              🔴
            </div>

            <div>
              <h2>Report Lost Item</h2>

              <p>
                Lost something on campus?
                Tell us about it.
              </p>
            </div>

            <span className="action-arrow">
              →
            </span>

          </a>


          {/* Report Found */}
          <a
            href="/report-found"
            className="dashboard-action found-action"
          >

            <div className="action-icon">
              🟢
            </div>

            <div>
              <h2>Report Found Item</h2>

              <p>
                Found something?
                Help return it to its owner.
              </p>
            </div>

            <span className="action-arrow">
              →
            </span>

          </a>

        </div>


        {/* Search */}
        <div className="dashboard-search">

          <span>
            🔍
          </span>

          <input
            type="text"
            placeholder="Search lost and found items..."
          />

          <button>
            Search
          </button>

        </div>


        {/* Recent Reports */}
        <section className="dashboard-section">

          <div className="section-title">

            <div>

              <span>
                YOUR ACTIVITY
              </span>

              <h2>
                Recent Reports
              </h2>

            </div>

            <a href="#">
              View all →
            </a>

          </div>


          <div className="reports-card">

            {/* Report 1 */}
            <div className="report-row">

              <div className="report-icon">
                🎧
              </div>

              <div className="report-info">

                <h3>
                  Wireless Earbuds
                </h3>

                <p>
                  Lost · Library · Today
                </p>

              </div>

              <span className="status pending">
                Pending
              </span>

            </div>


            {/* Report 2 */}
            <div className="report-row">

              <div className="report-icon">
                🎒
              </div>

              <div className="report-info">

                <h3>
                  Black Backpack
                </h3>

                <p>
                  Found · Cafeteria · Yesterday
                </p>

              </div>

              <span className="status matched">
                Matched
              </span>

            </div>

          </div>

        </section>


        {/* Possible Matches */}
        <section className="dashboard-section">

          <div className="section-title">

            <div>

              <span>
                POSSIBLE MATCHES
              </span>

              <h2>
                Items that may belong to you
              </h2>

            </div>

            <a href="#">
              Browse all →
            </a>

          </div>


          <div className="matches-grid">

            {/* Match 1 */}
            <div className="match-card">

              <div className="match-image">
                🎧
              </div>

              <h3>
                Wireless Earbuds
              </h3>

              <p>
                Found near Library
              </p>

              <span className="match-score">
                94% Match
              </span>

            </div>


            {/* Match 2 */}
            <div className="match-card">

              <div className="match-image">
                🎒
              </div>

              <h3>
                Black Backpack
              </h3>

              <p>
                Found near Cafeteria
              </p>

              <span className="match-score">
                87% Match
              </span>

            </div>


            {/* Match 3 */}
            <div className="match-card">

              <div className="match-image">
                ⌚
              </div>

              <h3>
                Smart Watch
              </h3>

              <p>
                Found near Block B
              </p>

              <span className="match-score">
                82% Match
              </span>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;