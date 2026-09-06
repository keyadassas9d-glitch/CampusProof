import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!registrationNumber || !password) {
      setError("Please enter your registration number and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            registration_number: registrationNumber,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save logged-in user information
        localStorage.setItem("campusproofUser", JSON.stringify(data.user));

        navigate("/dashboard");
      } else {
        setError(data.error || "Invalid registration number or password.");
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
    <div className="login-page">

      <div className="login-container">

        {/* Logo */}
        <div className="login-logo">
          <span className="logo-icon">✦</span>
          <span>CampusProof</span>
        </div>

        <div className="login-card">

          <h1>Welcome back</h1>

          <p className="login-subtitle">
            Sign in to continue to CampusProof
          </p>

          <form onSubmit={handleLogin}>

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

              <div className="password-label">
                <label>Password</label>
                <a href="#">Forgot password?</a>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            {/* Error */}
            {error && (
              <p className="error-message">
                {error}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

          </form>

          <div className="divider">
            <span>or</span>
          </div>

          {/* Google button */}
          <button className="google-btn">
            <span>G</span>
            Continue with Google
          </button>

          <p className="signup-text">
            Don't have an account?
            <a href="/register"> Create an account</a>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;