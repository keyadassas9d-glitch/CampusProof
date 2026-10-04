import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function ClaimItem() {
  const { id } = useParams();

  const [item, setItem] = useState(null);

  const [answers, setAnswers] = useState({
    color: "",
    uniqueFeature: "",
    lastUsed: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get item details
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
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load this item.");
      });
  }, [id]);

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !answers.color.trim() ||
      !answers.uniqueFeature.trim() ||
      !answers.lastUsed.trim()
    ) {
      setError("Please answer all verification questions.");
      return;
    }

    const savedUser = JSON.parse(
      localStorage.getItem("campusproofUser")
    );

    const registrationNumber =
      savedUser?.registration_number;

    if (!registrationNumber) {
      setError("User information not found. Please login again.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/items/${id}/claim/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            registration_number: registrationNumber,
            message:
              `Color: ${answers.color}. ` +
              `Unique feature: ${answers.uniqueFeature}. ` +
              `Last used: ${answers.lastUsed}.`,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to submit claim."
        );
      }

      setSubmitted(true);

    } catch (error) {
      console.error(error);

      setError(
        error.message ||
        "Cannot connect to the server. Make sure Django is running."
      );

    } finally {
      setLoading(false);
    }
  };

  // Loading item
  if (!item && !error) {
    return (
      <div className="claim-page">
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
            <h1>Loading item...</h1>
          </div>
        </main>
      </div>
    );
  }

  // Item loading error
  if (error && !item) {
    return (
      <div className="claim-page">
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
            <h1>{error}</h1>

            <a
              href="/browse-items"
              className="success-dashboard-btn"
            >
              ← Back to Items
            </a>
          </div>
        </main>
      </div>
    );
  }

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
                {item.item_type === "lost" ? "🔴" : "🟢"}
              </div>

              <div>

                <span>
                  {item.item_type === "lost"
                    ? "LOST ITEM"
                    : "FOUND ITEM"}
                </span>

                <h2>
                  {item.name}
                </h2>

                <p>
                  {item.item_type === "lost"
                    ? "Last seen"
                    : "Found at"}{" "}
                  · {item.location} · {item.date}
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
                  1. What color is the item?
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


              {/* Error */}

              {error && (
                <p
                  style={{
                    color: "red",
                    textAlign: "center",
                    fontWeight: "600",
                    marginBottom: "15px",
                  }}
                >
                  {error}
                </p>
              )}


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
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "Submit Claim →"}
              </button>


              <a
                href={`/item/${item.id}`}
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