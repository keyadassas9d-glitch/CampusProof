import "../App.css";

function ItemDetails() {
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

        {/* Back */}
        <a href="/browse-items" className="details-back">
          ← Back to all items
        </a>


        <div className="details-card">

          {/* Left - Image */}
          <div className="details-image">
            🎧

            <span className="details-status">
              Lost
            </span>
          </div>


          {/* Right - Information */}
          <div className="details-info">

            <span className="details-label">
              LOST ITEM
            </span>

            <h1>
              Wireless Earbuds
            </h1>

            <p className="details-description">
              Black wireless earbuds with a small scratch
              on the charging case. The case has a small
              silver mark near the hinge.
            </p>


            {/* Information */}
            <div className="details-information">

              <div className="detail-row">

                <span className="detail-icon">
                  📍
                </span>

                <div>
                  <small>
                    Last seen
                  </small>

                  <strong>
                    Library
                  </strong>
                </div>

              </div>


              <div className="detail-row">

                <span className="detail-icon">
                  📅
                </span>

                <div>
                  <small>
                    Date lost
                  </small>

                  <strong>
                    August 20, 2026
                  </strong>
                </div>

              </div>


              <div className="detail-row">

                <span className="detail-icon">
                  🕐
                </span>

                <div>
                  <small>
                    Approximate time
                  </small>

                  <strong>
                    2:30 PM
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
                    Electronics
                  </strong>
                </div>

              </div>

            </div>


            {/* Possible Match */}
            <div className="possible-match">

              <div className="match-icon">
                ✨
              </div>

              <div>
                <strong>
                  Possible match found
                </strong>

                <p>
                  CampusProof found an item that looks
                  similar to this report.
                </p>
              </div>

              <span>
                94%
              </span>

            </div>


            {/* Claim Button */}
            <a
  href="/claim/1"
  className="claim-button"
>
  This is my item →
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