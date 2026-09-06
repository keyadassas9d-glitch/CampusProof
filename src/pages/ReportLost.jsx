import { useState } from "react";
import "../App.css";

function ReportLost() {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [dateLost, setDateLost] = useState("");
  const [timeLost, setTimeLost] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState(null);
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Get logged-in user
    const savedUser = localStorage.getItem("campusproofUser");

    if (!savedUser) {
      setError("Please login before reporting an item.");
      return;
    }

    const user = JSON.parse(savedUser);

    // Check required fields
    if (
      !itemName ||
      !category ||
      !description ||
      !dateLost ||
      !location
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/items/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: itemName,
            item_type: "lost",
            description: description,
            location: location,
            date: dateLost,
            category: category,
            registration_number: user.registration_number,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Lost item reported successfully! 🎉");

        // Clear form
        setItemName("");
        setCategory("");
        setDescription("");
        setDateLost("");
        setTimeLost("");
        setLocation("");
        setPhoto(null);
        setAdditionalDetails("");
      } else {
        setError(data.error || "Failed to report item.");
      }
    } catch (error) {
      setError(
        "Cannot connect to the server. Make sure Django is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">

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

      {/* Form */}
      <main className="report-container">

        <div className="report-heading">

          <span>LOST ITEM REPORT</span>

          <h1>What did you lose?</h1>

          <p>
            Give us some details about your lost item so we can help
            you find it.
          </p>

        </div>

        <form className="report-card" onSubmit={handleSubmit}>

          {/* Item Name */}
          <div className="form-group">

            <label>Item name</label>

            <input
              type="text"
              placeholder="e.g. AirPods, Black Backpack, ID Card"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />

          </div>

          {/* Category */}
          <div className="form-group">

            <label>Category</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Books & Stationery">
                Books & Stationery
              </option>
              <option value="Clothing">Clothing</option>
              <option value="Bags">Bags</option>
              <option value="Documents & ID">
                Documents & ID
              </option>
              <option value="Accessories">Accessories</option>
              <option value="Other">Other</option>
            </select>

          </div>

          {/* Description */}
          <div className="form-group">

            <label>Description</label>

            <textarea
              placeholder="Describe your item. Include its color, brand, unique marks, stickers, etc."
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

          </div>

          {/* Date and Time */}
          <div className="form-row">

            <div className="form-group">

              <label>Date lost</label>

              <input
                type="date"
                value={dateLost}
                onChange={(e) => setDateLost(e.target.value)}
              />

            </div>

            <div className="form-group">

              <label>Approximate time</label>

              <input
                type="time"
                value={timeLost}
                onChange={(e) => setTimeLost(e.target.value)}
              />

            </div>

          </div>

          {/* Location */}
          <div className="form-group">

            <label>Where did you lose it?</label>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select location</option>
              <option value="Library">Library</option>
              <option value="Cafeteria">Cafeteria</option>
              <option value="Classroom">Classroom</option>
              <option value="Hostel">Hostel</option>
              <option value="Parking Area">
                Parking Area
              </option>
              <option value="Sports Ground">
                Sports Ground
              </option>
              <option value="Campus Entrance">
                Campus Entrance
              </option>
              <option value="Other">Other</option>
            </select>

          </div>

          {/* Photo */}
          <div className="form-group">

            <label>Upload a photo</label>

            <label className="upload-box">

              <span className="upload-icon">
                📷
              </span>

              <strong>
                {photo
                  ? photo.name
                  : "Click to upload an image"}
              </strong>

              <small>
                PNG, JPG or JPEG · Max 5MB
              </small>

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) =>
                  setPhoto(e.target.files[0])
                }
              />

            </label>

          </div>

          {/* Extra details */}
          <div className="form-group">

            <label>Additional details</label>

            <textarea
              placeholder="Anything else that could help identify your item?"
              rows="4"
              value={additionalDetails}
              onChange={(e) =>
                setAdditionalDetails(e.target.value)
              }
            ></textarea>

          </div>

          {/* Error */}
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {/* Success */}
          {message && (
            <p className="success-message">
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="report-submit"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Report Lost Item →"}
          </button>

        </form>

      </main>

    </div>
  );
}

export default ReportLost;