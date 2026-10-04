import { useEffect, useState } from "react";
import "../App.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [claims, setClaims] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("campusproofUser");

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    const loggedInUser = JSON.parse(savedUser);
    setUser(loggedInUser);

    Promise.all([
      fetch("http://127.0.0.1:8000/api/items/"),
      fetch("http://127.0.0.1:8000/api/items/claims/"),
    ])
      .then(async ([itemsResponse, claimsResponse]) => {
        if (!itemsResponse.ok || !claimsResponse.ok) {
          throw new Error("Failed to load profile data.");
        }

        const itemsData = await itemsResponse.json();
        const claimsData = await claimsResponse.json();

        return {
          items: itemsData.items || [],
          claims: claimsData.claims || [],
        };
      })
      .then((data) => {
        setItems(data.items);
        setClaims(data.claims);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load your profile data.");
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("campusproofUser");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="profile-page">
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
          <div className="profile-heading">
            <h1>Loading profile...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="profile-page">
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
          <div className="profile-heading">
            <h1>{error || "User not found"}</h1>
          </div>
        </main>
      </div>
    );
  }

  // Only show items reported by the logged-in student
  const myItems = items.filter(
    (item) =>
      item.registration_number === user.registration_number
  );

  const lostReports = myItems.filter(
    (item) => item.item_type === "lost"
  );

  const foundReports = myItems.filter(
    (item) => item.item_type === "found"
  );

  // Only show claims submitted by the logged-in student
  const myClaims = claims.filter(
    (claim) =>
      claim.registration_number === user.registration_number
  );

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusClass = (status) => {
    if (status === "claimed") {
      return "resolved";
    }

    if (status === "matched") {
      return "matched";
    }

    return "pending";
  };

  const getStatusText = (status) => {
    if (status === "claimed") {
      return "Claimed";
    }

    if (status === "matched") {
      return "Matched";
    }

    return "Active";
  };

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

          <span>
            STUDENT PROFILE
          </span>

          <h1>
            My Profile
          </h1>

          <p>
            Manage your student information and track your activity.
          </p>

        </div>


        {/* Profile Card */}
        <section className="profile-card">

          <div className="profile-avatar-large">
            {user.full_name
              ? user.full_name.charAt(0).toUpperCase()
              : "U"}
          </div>


          <div className="profile-main-info">

            <h2>
              {user.full_name}
            </h2>

            <p>
              Student
            </p>


            <div className="profile-details">

              <div>

                <span>
                  REGISTRATION NUMBER
                </span>

                <strong>
                  {user.registration_number}
                </strong>

              </div>


              <div>

                <span>
                  COLLEGE / CAMPUS
                </span>

                <strong>
                  Campus University
                </strong>

              </div>

            </div>

          </div>


          <button
            className="edit-profile-btn"
            onClick={() => alert("Profile editing will be added soon.")}
          >
            Edit Profile
          </button>

        </section>


        {/* Statistics */}
        <section className="profile-stats">

          <div className="stat-card">

            <span className="stat-icon">
              🔴
            </span>

            <div>

              <strong>
                {lostReports.length}
              </strong>

              <p>
                Lost Reports
              </p>

            </div>

          </div>


          <div className="stat-card">

            <span className="stat-icon">
              🟢
            </span>

            <div>

              <strong>
                {foundReports.length}
              </strong>

              <p>
                Found Reports
              </p>

            </div>

          </div>


          <div className="stat-card">

            <span className="stat-icon">
              🛡️
            </span>

            <div>

              <strong>
                {myClaims.length}
              </strong>

              <p>
                Claims
              </p>

            </div>

          </div>

        </section>


        {/* Lost Reports */}
        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <span>
                MY ACTIVITY
              </span>

              <h2>
                My Lost Reports
              </h2>

            </div>

          </div>


          {lostReports.length === 0 ? (

            <div className="activity-card">
              <p>
                You haven't reported any lost items yet.
              </p>
            </div>

          ) : (

            lostReports.map((item) => (

              <div
                className="activity-card"
                key={item.id}
              >

                <div className="activity-icon">
                  🔴
                </div>


                <div className="activity-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Lost · {item.location} ·{" "}
                    {formatDate(item.date)}
                  </p>

                </div>


                <span
                  className={`activity-status ${getStatusClass(
                    item.status
                  )}`}
                >
                  {getStatusText(item.status)}
                </span>

              </div>

            ))

          )}

        </section>


        {/* Found Reports */}
        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <span>
                MY ACTIVITY
              </span>

              <h2>
                My Found Reports
              </h2>

            </div>

          </div>


          {foundReports.length === 0 ? (

            <div className="activity-card">
              <p>
                You haven't reported any found items yet.
              </p>
            </div>

          ) : (

            foundReports.map((item) => (

              <div
                className="activity-card"
                key={item.id}
              >

                <div className="activity-icon">
                  🟢
                </div>


                <div className="activity-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Found · {item.location} ·{" "}
                    {formatDate(item.date)}
                  </p>

                </div>


                <span
                  className={`activity-status ${getStatusClass(
                    item.status
                  )}`}
                >
                  {getStatusText(item.status)}
                </span>

              </div>

            ))

          )}

        </section>


        {/* Claims */}
        <section className="profile-section">

          <div className="profile-section-heading">

            <div>

              <span>
                OWNERSHIP
              </span>

              <h2>
                My Claims
              </h2>

            </div>

          </div>


          {myClaims.length === 0 ? (

            <div className="activity-card">
              <p>
                You haven't submitted any claims yet.
              </p>
            </div>

          ) : (

            myClaims.map((claim) => (

              <div
                className="activity-card"
                key={claim.id}
              >

                <div className="activity-icon">
                  🛡️
                </div>


                <div className="activity-info">

                  <h3>
                    {claim.item_name}
                  </h3>

                  <p>
                    Claim submitted ·{" "}
                    {formatDate(claim.created_at)}
                  </p>

                </div>


                <span
                  className={`activity-status ${
                    claim.status === "approved"
                      ? "resolved"
                      : claim.status === "rejected"
                      ? "pending"
                      : "pending"
                  }`}
                >
                  {claim.status === "approved"
                    ? "Approved"
                    : claim.status === "rejected"
                    ? "Rejected"
                    : "Verification Pending"}
                </span>

              </div>

            ))

          )}

        </section>


        {/* Logout */}
        <div className="profile-logout">

          <button onClick={handleLogout}>
            Log Out
          </button>

        </div>

      </main>

    </div>
  );
}

export default Profile;