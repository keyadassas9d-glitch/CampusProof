import { useEffect, useState } from "react";
import "../App.css";

function AdminDashboard() {
  const [claims, setClaims] = useState([]);
  const [items, setItems] = useState([]);

  const [loadingClaims, setLoadingClaims] = useState(true);
  const [loadingItems, setLoadingItems] = useState(true);

  const [error, setError] = useState("");

  // Fetch claims
  const fetchClaims = () => {
    setLoadingClaims(true);

    fetch("http://127.0.0.1:8000/api/items/claims/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load claims");
        }

        return response.json();
      })
      .then((data) => {
        setClaims(data.claims || []);
        setLoadingClaims(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load claims.");
        setLoadingClaims(false);
      });
  };

  // Fetch items
  const fetchItems = () => {
    setLoadingItems(true);

    fetch("http://127.0.0.1:8000/api/items/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load items");
        }

        return response.json();
      })
      .then((data) => {
        setItems(data.items || []);
        setLoadingItems(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load reports.");
        setLoadingItems(false);
      });
  };

  useEffect(() => {
    fetchClaims();
    fetchItems();
  }, []);

  // Approve / reject claim
  const handleClaimAction = async (claimId, action) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/items/claims/${claimId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: action,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to update claim."
        );
      }

      // Refresh claims and items
      fetchClaims();
      fetchItems();

    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const totalReports = items.length;

  const lostItems = items.filter(
    (item) => item.item_type === "lost"
  ).length;

  const foundItems = items.filter(
    (item) => item.item_type === "found"
  ).length;

  const pendingClaims = claims.filter(
    (claim) => claim.status === "pending"
  ).length;

  return (
    <div className="admin-page">

      {/* Navbar */}
      <nav className="dashboard-nav">

        <div className="logo">
          <span className="logo-icon">✦</span>
          CampusProof
        </div>

        <div className="admin-nav-right">

          <span className="admin-label">
            ADMIN PANEL
          </span>

          <a
            href="/dashboard"
            className="back-dashboard"
          >
            Student View →
          </a>

        </div>

      </nav>


      <main className="admin-container">

        {/* Heading */}
        <div className="admin-heading">

          <span>
            ADMINISTRATION
          </span>

          <h1>
            Campus Overview
          </h1>

          <p>
            Manage lost & found reports, claims,
            and possible item matches.
          </p>

        </div>


        {/* Error */}
        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            {error}
          </p>
        )}


        {/* Statistics */}
        <section className="admin-stats">

          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              📦
            </div>

            <div>

              <span>
                TOTAL REPORTS
              </span>

              <h2>
                {loadingItems ? "..." : totalReports}
              </h2>

            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              🔴
            </div>

            <div>

              <span>
                LOST ITEMS
              </span>

              <h2>
                {loadingItems ? "..." : lostItems}
              </h2>

            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              🟢
            </div>

            <div>

              <span>
                FOUND ITEMS
              </span>

              <h2>
                {loadingItems ? "..." : foundItems}
              </h2>

            </div>

          </div>


          <div className="admin-stat-card">

            <div className="admin-stat-icon">
              🛡️
            </div>

            <div>

              <span>
                PENDING CLAIMS
              </span>

              <h2>
                {loadingClaims ? "..." : pendingClaims}
              </h2>

            </div>

          </div>

        </section>


        {/* Quick Actions */}
        <section className="admin-section">

          <div className="admin-section-title">

            <div>

              <span>
                MANAGEMENT
              </span>

              <h2>
                Quick Actions
              </h2>

            </div>

          </div>


          <div className="admin-actions-grid">

            <button className="admin-action-card">

              <div className="admin-action-icon">
                📋
              </div>

              <div>

                <h3>
                  Review Reports
                </h3>

                <p>
                  Check recently submitted
                  lost and found reports.
                </p>

              </div>

              <span>
                →
              </span>

            </button>


            <button className="admin-action-card">

              <div className="admin-action-icon">
                🛡️
              </div>

              <div>

                <h3>
                  Review Claims
                </h3>

                <p>
                  Verify ownership claims
                  submitted by students.
                </p>

              </div>

              <span>
                →
              </span>

            </button>


            <button className="admin-action-card">

              <div className="admin-action-icon">
                🤖
              </div>

              <div>

                <h3>
                  View AI Matches
                </h3>

                <p>
                  Review possible matches
                  between lost and found items.
                </p>

              </div>

              <span>
                →
              </span>

            </button>

          </div>

        </section>


        {/* Recent Reports */}
        <section className="admin-section">

          <div className="admin-section-title">

            <div>

              <span>
                RECENT ACTIVITY
              </span>

              <h2>
                Latest Reports
              </h2>

            </div>

          </div>


          <div className="admin-table">

            <div className="admin-table-header">

              <span>
                ITEM
              </span>

              <span>
                TYPE
              </span>

              <span>
                LOCATION
              </span>

              <span>
                DATE
              </span>

              <span>
                STATUS
              </span>

            </div>


            {loadingItems ? (

              <div className="admin-table-row">
                <span>
                  Loading reports...
                </span>
              </div>

            ) : items.length === 0 ? (

              <div className="admin-table-row">
                <span>
                  No reports yet.
                </span>
              </div>

            ) : (

              items.slice(0, 5).map((item) => (

                <div
                  className="admin-table-row"
                  key={item.id}
                >

                  <div className="admin-item">

                    <div className="admin-item-icon">
                      {item.item_type === "lost"
                        ? "🔴"
                        : "🟢"}
                    </div>

                    <strong>
                      {item.name}
                    </strong>

                  </div>


                  <span
                    className={`report-type ${
                      item.item_type === "lost"
                        ? "lost"
                        : "found"
                    }`}
                  >
                    {item.item_type === "lost"
                      ? "Lost"
                      : "Found"}
                  </span>


                  <span>
                    {item.location}
                  </span>


                  <span>
                    {item.date}
                  </span>


                  <span
                    className={`admin-status ${
                      item.status === "claimed"
                        ? "resolved"
                        : item.status === "matched"
                        ? "matched"
                        : "pending"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

              ))

            )}

          </div>

        </section>


        {/* Pending Claims */}
        <section className="admin-section">

          <div className="admin-section-title">

            <div>

              <span>
                OWNERSHIP VERIFICATION
              </span>

              <h2>
                Pending Claims
              </h2>

            </div>

          </div>


          {loadingClaims ? (

            <div className="admin-claim-card">
              <p>
                Loading claims...
              </p>
            </div>

          ) : claims.length === 0 ? (

            <div className="admin-claim-card">
              <p>
                No claims submitted yet.
              </p>
            </div>

          ) : (

            claims.map((claim) => (

              <div
                className="admin-claim-card"
                key={claim.id}
              >

                <div className="admin-claim-item">

                  <div className="admin-item-icon">
                    🛡️
                  </div>

                  <div>

                    <h3>
                      {claim.item_name}
                    </h3>

                    <p>
                      Claimed by{" "}
                      {claim.claimed_by}
                      {" · "}
                      Registration No:{" "}
                      {claim.registration_number}
                    </p>

                    <p>
                      Submitted:{" "}
                      {claim.created_at}
                    </p>

                    <p>
                      <strong>
                        Verification Answers:
                      </strong>{" "}
                      {claim.message}
                    </p>

                    <p>
                      <strong>
                        Status:
                      </strong>{" "}
                      {claim.status}
                    </p>

                  </div>

                </div>


                {claim.status === "pending" && (

                  <div className="claim-actions">

                    <button
                      className="reject-btn"
                      onClick={() =>
                        handleClaimAction(
                          claim.id,
                          "reject"
                        )
                      }
                    >
                      Reject
                    </button>


                    <button
                      className="approve-btn"
                      onClick={() =>
                        handleClaimAction(
                          claim.id,
                          "approve"
                        )
                      }
                    >
                      Approve
                    </button>

                  </div>

                )}

              </div>

            ))

          )}

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;