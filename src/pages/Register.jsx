import { useState } from "react";
import "../App.css";

function Register() {
  const [fullName, setFullName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    // Check passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!fullName || !registrationNumber || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName,
            registration_number: registrationNumber,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Account created successfully! 🎉");

        // Clear form
        setFullName("");
        setRegistrationNumber("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(data.error || "Registration failed.");
      }
    } catch (err) {
      setError(
        "Cannot connect to the server. Make sure Django is running."
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* Logo */}
        <div className="login-logo">
          <span className="logo-icon">✦</span>
          <span>CampusProof</span>
        </div>

        <div className="login-card">

          <h1>Create your account</h1>

          <p className="login-subtitle">
            Join your campus lost & found community
          </p>

          <form onSubmit={handleRegister}>

            {/* Full Name */}
            <div className="form-group">
              <label>Full name</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            {/* Registration Number */}
            <div className="form-group">
              <label>Registration number</label>

              <input
                type="text"
                placeholder="Enter your registration number"
                value={registrationNumber}
                onChange={(e) =>
                  setRegistrationNumber(e.target.value)
                }
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label>Confirm password</label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />
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

            {/* Register */}
            <button
              type="submit"
              className="login-submit"
            >
              Create Account
            </button>

          </form>

          <p className="signup-text">
            Already have an account?
            <a href="/login"> Sign in</a>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;