import { useState } from "react";
import "../App.css";

function ReportFound() {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async () => {

    setMessage("");
    setError("");

    if (
      !name ||
      !category ||
      !description ||
      !date ||
      !location
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Registration number saved during login
    const savedUser = JSON.parse(
  localStorage.getItem("campusproofUser")
);

const registrationNumber =
  savedUser?.registration_number;

    if (!registrationNumber) {
      setError(
        "User information not found. Please login again."
      );
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
            name: name,
            item_type: "found",
            description:
              description +
              (additionalDetails
                ? " " + additionalDetails
                : ""),
            location: location,
            date: date,
            category: category,
            registration_number: registrationNumber,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.error || "Failed to report item."
        );
      }


      setMessage(
        "Found item reported successfully! 🎉"
      );


      // Clear form
      setName("");
      setCategory("");
      setDescription("");
      setDate("");
      setTime("");
      setLocation("");
      setAdditionalDetails("");

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


  return (
    <div className="report-page">

      {/* Navbar */}
      <nav className="dashboard-nav">

        <div className="logo">
          <span className="logo-icon">✦</span>
          CampusProof
        </div>

        <a
          href="/dashboard"
          className="back-dashboard"
        >
          ← Dashboard
        </a>

      </nav>


      {/* Main Content */}
      <main className="report-container">

        <div className="report-heading">

          <span>FOUND ITEM REPORT</span>

          <h1>
            What did you find?
          </h1>

          <p>
            Tell us about the item you found so we can help
            return it to its rightful owner.
          </p>

        </div>


        <div className="report-card">

          {/* Item Name */}
          <div className="form-group">

            <label>
              Item name
            </label>

            <input
              type="text"
              placeholder="e.g. AirPods, Black Backpack, ID Card"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

          </div>


          {/* Category */}
          <div className="form-group">

            <label>
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >

              <option value="">
                Select a category
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Books & Stationery">
                Books & Stationery
              </option>

              <option value="Clothing">
                Clothing
              </option>

              <option value="Bags">
                Bags
              </option>

              <option value="Documents & ID">
                Documents & ID
              </option>

              <option value="Accessories">
                Accessories
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          {/* Description */}
          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              placeholder="Describe the item. Include its color, brand, unique marks, stickers, etc."
              rows="5"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            ></textarea>

          </div>


          {/* Date and Time */}
          <div className="form-row">

            <div className="form-group">

              <label>
                Date found
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Approximate time
              </label>

              <input
                type="time"
                value={time}
                onChange={(e) =>
                  setTime(e.target.value)
                }
              />

            </div>

          </div>


          {/* Location */}
          <div className="form-group">

            <label>
              Where did you find it?
            </label>

            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
            >

              <option value="">
                Select location
              </option>

              <option value="Library">
                Library
              </option>

              <option value="Cafeteria">
                Cafeteria
              </option>

              <option value="Classroom">
                Classroom
              </option>

              <option value="Hostel">
                Hostel
              </option>

              <option value="Parking Area">
                Parking Area
              </option>

              <option value="Sports Ground">
                Sports Ground
              </option>

              <option value="Campus Entrance">
                Campus Entrance
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          {/* Photo */}
          <div className="form-group">

            <label>
              Upload a photo
            </label>

            <label className="upload-box">

              <span className="upload-icon">
                📷
              </span>

              <strong>
                Click to upload an image
              </strong>

              <small>
                PNG, JPG or JPEG · Max 5MB
              </small>

              <input
                type="file"
                accept="image/png, image/jpeg"
              />

            </label>

          </div>


          {/* Additional Details */}
          <div className="form-group">

            <label>
              Additional details
            </label>

            <textarea
              placeholder="Anything else that could help identify the owner?"
              rows="4"
              value={additionalDetails}
              onChange={(e) =>
                setAdditionalDetails(e.target.value)
              }
            ></textarea>

          </div>


          {/* Success */}
          {message && (
            <p
              style={{
                color: "green",
                textAlign: "center",
                fontWeight: "600",
                marginBottom: "15px"
              }}
            >
              {message}
            </p>
          )}


          {/* Error */}
          {error && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                fontWeight: "600",
                marginBottom: "15px"
              }}
            >
              {error}
            </p>
          )}


          {/* Submit */}
          <button
            className="report-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Report Found Item →"}
          </button>

        </div>

      </main>

    </div>
  );
}

export default ReportFound;