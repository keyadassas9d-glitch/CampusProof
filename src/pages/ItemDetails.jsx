import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [matches, setMatches] = useState([]);

  const [loading, setLoading] = useState(true);
  const [matchesLoading, setMatchesLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/items/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Item not found");
        }

        return response.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load this item.");
        setLoading(false);
      });

    // Get possible matches
    fetch(`http://127.0.0.1:8000/api/items/${id}/matches/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load matches");
        }

        return response.json();
      })
      .then((data) => {
        setMatches(data.matches || []);
        setMatchesLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setMatches([]);
        setMatchesLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="item-details-page">
        <main className="item-details-container">
          <h2>Loading item...</h2>
        </main>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="item-details-page">
        <main className="item-details-container">

          <h2>
            {error || "Item not found"}
          </h2>

          <a
            href="/browse-items"
            className="details-back"
          >
            ← Back to all items
          </a>

        </main>
      </div>
    );
  }

  const isLost = item.item_type === "lost";

  return (
    <div className="item-details-page">

      {/* Navbar */}
      <nav className="dashboard-nav">

        <div className="logo">
          <span className="logo-icon">✦</span>
          CampusProof
        </div>

        <a
          href="/browse-items"
          className="back-dashboard"
        >
          ← Browse Items
        </a>

      </nav>


      {/* Main Content */}
      <main className="item-details-container">

        <a
          href="/browse-items"
          className="details-back"
        >
          ← Back to all items
        </a>


        {/* Item Details */}
        <div className="details-card">

          {/* Image / Icon */}
          <div className="details-image">

            {isLost ? "🔴" : "🟢"}

            <span className="details-status">
              {isLost ? "Lost" : "Found"}
            </span>

          </div>


          {/* Information */}
          <div className="details-info">

            <span className="details-label">
              {isLost
                ? "LOST ITEM"
                : "FOUND ITEM"}
            </span>

            <h1>
              {item.name}
            </h1>

            <p className="details-description">
              {item.description}
            </p>


            {/* Information */}
            <div className="details-information">

              <div className="detail-row">

                <span className="detail-icon">
                  📍
                </span>

                <div>

                  <small>
                    {isLost
                      ? "Last seen"
                      : "Found at"}
                  </small>

                  <strong>
                    {item.location}
                  </strong>

                </div>

              </div>


              <div className="detail-row">

                <span className="detail-icon">
                  📅
                </span>

                <div>

                  <small>
                    {isLost
                      ? "Date lost"
                      : "Date found"}
                  </small>

                  <strong>
                    {item.date}
                  </strong>

                </div>

              </div>


              <div className="detail-row">

                <span className="detail-icon">
                  📦
                </span>

                <div>

                  <small>
                    Category
                  </small>

                  <strong>
                    {item.category}
                  </strong>

                </div>

              </div>


              <div className="detail-row">

                <span className="detail-icon">
                  📊
                </span>

                <div>

                  <small>
                    Status
                  </small>

                  <strong>
                    {item.status}
                  </strong>

                </div>

              </div>

            </div>


            {/* Claim Button */}
            <a
              href={`/claim/${item.id}`}
              className="claim-button"
            >
              {isLost
                ? "This is my item →"
                : "Claim this item →"}
            </a>

            <p className="claim-note">
              You'll need to verify ownership before
              the item can be claimed.
            </p>

          </div>

        </div>


        {/* Possible Matches */}
        <section className="matches-section">

          <div className="matches-heading">

            <span>
              SMART MATCHING
            </span>

            <h2>
              Possible Matches
            </h2>

            <p>
              CampusProof found items that may be
              related to this report.
            </p>

          </div>


          {matchesLoading ? (

            <div className="matches-message">
              Checking for possible matches...
            </div>

          ) : matches.length === 0 ? (

            <div className="matches-message">
              No possible matches found yet.
            </div>

          ) : (

            <div className="matches-list">

              {matches.map((match) => (

                <div
                  className="match-card"
                  key={match.id}
                >

                  {/* Match Icon */}
                  <div className="match-icon">
                    {match.item_type === "lost"
                      ? "🔴"
                      : "🟢"}
                  </div>


                  {/* Match Information */}
                  <div className="match-info">

                    <span className="match-type">
                      {match.item_type === "lost"
                        ? "LOST ITEM"
                        : "FOUND ITEM"}
                    </span>

                    <h3>
                      {match.name}
                    </h3>

                    <p>
                      {match.description}
                    </p>

                    <div className="match-details">

                      <span>
                        📍 {match.location}
                      </span>

                      <span>
                        📦 {match.category}
                      </span>

                    </div>


                    {/* Match Reasons */}
                    {match.match_reasons &&
                      match.match_reasons.length > 0 && (

                        <div className="match-reasons">

                          <strong>
                            Why it may match:
                          </strong>

                          <ul>

                            {match.match_reasons.map(
                              (reason, index) => (

                                <li key={index}>
                                  {reason}
                                </li>

                              )
                            )}

                          </ul>

                        </div>

                      )}

                  </div>


                  {/* Match Score */}
                  <div className="match-score">

                    <strong>
                      {match.match_score}%
                    </strong>

                    <span>
                      Match
                    </span>

                    <a
                      href={`/item/${match.id}`}
                      className="view-match"
                    >
                      View →
                    </a>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default ItemDetails;