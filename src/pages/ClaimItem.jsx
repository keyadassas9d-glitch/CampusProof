import { useState } from "react";
import "../App.css";

function ClaimItem() {
  const [answers, setAnswers] = useState({
    color: "",
    uniqueFeature: "",
    lastUsed: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !answers.color.trim() ||
      !answers.uniqueFeature.trim() ||
      !answers.lastUsed.trim()
    ) {
      alert("Please answer all verification questions.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="claim-page">

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


      <main className="claim-container">

        <div className="claim-heading">

          <span>OWNERSHIP VERIFICATION</span>

          <h1>
            Is this your item?
          </h1>

          <p>
            Answer a few questions to help us verify
            that you are the rightful owner.
          </p>

        </div>


        {/* Success Message */}
        {submitted ? (

          <div className="claim-success">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              Claim submitted successfully!
            </h2>

            <p>
              Your claim has been submitted for verification.
              A campus administrator will review your answers
              and notify you about the next step.
            </p>

            <div className="success-status">
              <span>●</span>
              Verification Pending
            </div>

            <a
              href="/dashboard"
              className="success-dashboard-btn"
            >
              Back to Dashboard →
            </a>

          </div>

        ) : (

          <>
            {/* Item Summary */}

            <div className="claim-item-summary">

              <div className="claim-item-image">
                🎧
              </div>

              <div>

                <span>
                  FOUND ITEM
                </span>

                <h2>
                  Wireless Earbuds
                </h2>

                <p>
                  Found near Library · August 20, 2026
                </p>

              </div>

            </div>


            {/* Verification Form */}

            <form
              className="claim-card"
              onSubmit={handleSubmit}
            >

              <div className="verification-header">

                <div className="verification-icon">
                  🛡️
                </div>

                <div>

                  <h2>
                    Verify your ownership
                  </h2>

                  <p>
                    Your answers will be used to verify
                    your claim.
                  </p>

                </div>

              </div>


              {/* Question 1 */}

              <div className="verification-question">

                <label>
                  1. What color is the charging case?
                </label>

                <input
                  type="text"
                  name="color"
                  value={answers.color}
                  onChange={handleChange}
                  placeholder="Enter your answer"
                />

              </div>


              {/* Question 2 */}

              <div className="verification-question">

                <label>
                  2. Describe a unique mark or feature on the item.
                </label>

                <textarea
                  name="uniqueFeature"
                  value={answers.uniqueFeature}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter your answer"
                ></textarea>

              </div>


              {/* Question 3 */}

              <div className="verification-question">

                <label>
                  3. Where did you last use this item?
                </label>

                <input
                  type="text"
                  name="lastUsed"
                  value={answers.lastUsed}
                  onChange={handleChange}
                  placeholder="e.g. Library, classroom, cafeteria"
                />

              </div>


              {/* Warning */}

              <div className="claim-warning">

                <span>
                  🔒
                </span>

                <p>
                  Please provide accurate information.
                  Your answers may be reviewed during
                  the verification process.
                </p>

              </div>


              {/* Submit */}

              <button
                type="submit"
                className="claim-submit"
              >
                Submit Claim →
              </button>


              <a
                href="/item/1"
                className="cancel-claim"
              >
                Cancel and go back
              </a>

            </form>
          </>
        )}

      </main>

    </div>
  );
}

export default ClaimItem;