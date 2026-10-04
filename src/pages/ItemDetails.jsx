import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function ItemDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
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
          <h2>{error || "Item not found"}</h2>
          <a href="/browse-items" className="details-back">
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

        <a href="/browse-items" className="back-dashboard">
          ← Browse Items
        </a>

      </nav>


      {/* Main Content */}
      <main className="item-details-container">

        <a href="/browse-items" className="details-back">
          ← Back to all items
        </a>


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
              {isLost ? "LOST ITEM" : "FOUND ITEM"}
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
                    {isLost ? "Last seen" : "Found at"}
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
                    {isLost ? "Date lost" : "Date found"}
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

      </main>

    </div>
  );
}

export default ItemDetails;