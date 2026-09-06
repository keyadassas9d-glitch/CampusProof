import "../App.css";

function AdminDashboard() {
  return (
    <div className="admin-page">

      {/* Navbar */}
      <nav className="dashboard-nav">
        <div className="logo">
          <span className="logo-icon">✦</span>
          CampusProof
        </div>

        <div className="admin-nav-right">
          <span className="admin-label">ADMIN PANEL</span>

          <a href="/dashboard" className="back-dashboard">
            Student View →
          </a>
        </div>
      </nav>

      <main className="admin-container">

        {/* Heading */}
        <div className="admin-heading">
          <span>ADMINISTRATION</span>
          <h1>Campus Overview</h1>
          <p>
            Manage lost & found reports, claims, and possible item matches.
          </p>
        </div>

        {/* Statistics */}
        <section className="admin-stats">

          <div className="admin-stat-card">
            <div className="admin-stat-icon">📦</div>
            <div>
              <span>TOTAL REPORTS</span>
              <h2>48</h2>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">🔴</div>
            <div>
              <span>LOST ITEMS</span>
              <h2>29</h2>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">🟢</div>
            <div>
              <span>FOUND ITEMS</span>
              <h2>19</h2>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-icon">🛡️</div>
            <div>
              <span>PENDING CLAIMS</span>
              <h2>7</h2>
            </div>
          </div>

        </section>

        {/* Quick Actions */}
        <section className="admin-section">

          <div className="admin-section-title">
            <div>
              <span>MANAGEMENT</span>
              <h2>Quick Actions</h2>
            </div>
          </div>

          <div className="admin-actions-grid">

            <button className="admin-action-card">
              <div className="admin-action-icon">📋</div>
              <div>
                <h3>Review Reports</h3>
                <p>Check recently submitted lost and found reports.</p>
              </div>
              <span>→</span>
            </button>

            <button className="admin-action-card">
              <div className="admin-action-icon">🛡️</div>
              <div>
                <h3>Review Claims</h3>
                <p>Verify ownership claims submitted by students.</p>
              </div>
              <span>→</span>
            </button>

            <button className="admin-action-card">
              <div className="admin-action-icon">🤖</div>
              <div>
                <h3>View AI Matches</h3>
                <p>Review possible matches between lost and found items.</p>
              </div>
              <span>→</span>
            </button>

          </div>

        </section>

        {/* Recent Reports */}
        <section className="admin-section">

          <div className="admin-section-title">
            <div>
              <span>RECENT ACTIVITY</span>
              <h2>Latest Reports</h2>
            </div>

            <button className="admin-view-all">
              View all →
            </button>
          </div>

          <div className="admin-table">

            <div className="admin-table-header">
              <span>ITEM</span>
              <span>TYPE</span>
              <span>LOCATION</span>
              <span>DATE</span>
              <span>STATUS</span>
            </div>

            <div className="admin-table-row">
              <div className="admin-item">
                <div className="admin-item-icon">🎧</div>
                <strong>Wireless Earbuds</strong>
              </div>

              <span className="report-type lost">Lost</span>
              <span>Library</span>
              <span>Aug 20, 2026</span>
              <span className="admin-status pending">Pending</span>
            </div>

            <div className="admin-table-row">
              <div className="admin-item">
                <div className="admin-item-icon">🎒</div>
                <strong>Black Backpack</strong>
              </div>

              <span className="report-type found">Found</span>
              <span>Cafeteria</span>
              <span>Aug 19, 2026</span>
              <span className="admin-status matched">Matched</span>
            </div>

            <div className="admin-table-row">
              <div className="admin-item">
                <div className="admin-item-icon">⌚</div>
                <strong>Smart Watch</strong>
              </div>

              <span className="report-type found">Found</span>
              <span>Block B</span>
              <span>Aug 18, 2026</span>
              <span className="admin-status pending">Pending</span>
            </div>

            <div className="admin-table-row">
              <div className="admin-item">
                <div className="admin-item-icon">📱</div>
                <strong>Black Smartphone</strong>
              </div>

              <span className="report-type lost">Lost</span>
              <span>Computer Lab</span>
              <span>Aug 15, 2026</span>
              <span className="admin-status resolved">Resolved</span>
            </div>

          </div>

        </section>

        {/* Pending Claims */}
        <section className="admin-section">

          <div className="admin-section-title">
            <div>
              <span>OWNERSHIP VERIFICATION</span>
              <h2>Pending Claims</h2>
            </div>
          </div>

          <div className="admin-claim-card">

            <div className="admin-claim-item">
              <div className="admin-item-icon">🎧</div>

              <div>
                <h3>Wireless Earbuds</h3>
                <p>
                  Claimed by student · Submitted August 20, 2026
                </p>
              </div>
            </div>

            <div className="claim-actions">
              <button className="reject-btn">
                Reject
              </button>

              <button className="approve-btn">
                Approve
              </button>
            </div>

          </div>

          <div className="admin-claim-card">

            <div className="admin-claim-item">
              <div className="admin-item-icon">⌚</div>

              <div>
                <h3>Smart Watch</h3>
                <p>
                  Claimed by student · Submitted August 18, 2026
                </p>
              </div>
            </div>

            <div className="claim-actions">
              <button className="reject-btn">
                Reject
              </button>

              <button className="approve-btn">
                Approve
              </button>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;