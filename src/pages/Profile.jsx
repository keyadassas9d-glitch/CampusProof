import "../App.css";

function Profile() {
  return (
    <div className="profile-page">
      {/* Navbar */}
      <nav className="dashboard-nav">
        <div className="logo">
          <span className="logo-icon">✦</span>
          CampusProof
        </div>

        <a href="/dashboard" className="back-dashboard">
          ← Dashboard
        </a>
      </nav>

      <main className="profile-container">

        {/* Page Heading */}
        <div className="profile-heading">
          <span>STUDENT PROFILE</span>
          <h1>My Profile</h1>
          <p>Manage your student information and track your activity.</p>
        </div>

        {/* Profile Card */}
        <section className="profile-card">
          <div className="profile-avatar-large">
            K
          </div>

          <div className="profile-main-info">
            <h2>Keya Das</h2>
            <p>Student</p>

            <div className="profile-details">
              <div>
                <span>REGISTRATION NUMBER</span>
                <strong>CP2026001</strong>
              </div>

              <div>
                <span>COLLEGE / CAMPUS</span>
                <strong>Campus University</strong>
              </div>
            </div>
          </div>

          <button className="edit-profile-btn">
            Edit Profile
          </button>
        </section>

        {/* Statistics */}
        <section className="profile-stats">
          <div className="stat-card">
            <span className="stat-icon">🔴</span>
            <div>
              <strong>2</strong>
              <p>Lost Reports</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🟢</span>
            <div>
              <strong>1</strong>
              <p>Found Reports</p>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-icon">🛡️</span>
            <div>
              <strong>1</strong>
              <p>Claims</p>
            </div>
          </div>
        </section>

        {/* Lost Reports */}
        <section className="profile-section">
          <div className="profile-section-heading">
            <div>
              <span>MY ACTIVITY</span>
              <h2>My Lost Reports</h2>
            </div>
          </div>

          <div className="activity-card">
            <div className="activity-icon">🎧</div>

            <div className="activity-info">
              <h3>Wireless Earbuds</h3>
              <p>Lost · Library · August 20, 2026</p>
            </div>

            <span className="activity-status pending">
              Pending
            </span>
          </div>

          <div className="activity-card">
            <div className="activity-icon">📱</div>

            <div className="activity-info">
              <h3>Black Smartphone</h3>
              <p>Lost · Computer Lab · August 15, 2026</p>
            </div>

            <span className="activity-status matched">
              Matched
            </span>
          </div>
        </section>

        {/* Found Reports */}
        <section className="profile-section">
          <div className="profile-section-heading">
            <div>
              <span>MY ACTIVITY</span>
              <h2>My Found Reports</h2>
            </div>
          </div>

          <div className="activity-card">
            <div className="activity-icon">🎒</div>

            <div className="activity-info">
              <h3>Black Backpack</h3>
              <p>Found · Cafeteria · August 19, 2026</p>
            </div>

            <span className="activity-status resolved">
              Returned
            </span>
          </div>
        </section>

        {/* Claims */}
        <section className="profile-section">
          <div className="profile-section-heading">
            <div>
              <span>OWNERSHIP</span>
              <h2>My Claims</h2>
            </div>
          </div>

          <div className="activity-card">
            <div className="activity-icon">🛡️</div>

            <div className="activity-info">
              <h3>Wireless Earbuds</h3>
              <p>Claim submitted · August 20, 2026</p>
            </div>

            <span className="activity-status pending">
              Verification Pending
            </span>
          </div>
        </section>

        {/* Logout */}
        <div className="profile-logout">
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Log Out
          </button>
        </div>

      </main>
    </div>
  );
}

export default Profile;