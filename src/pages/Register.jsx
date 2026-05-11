
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser, getUsers } from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await getUsers();
      const exists = res.data.find((u) => u.email === email);

      if (exists) {
        setError("Email already registered. Please login.");
        return;
      }

      await createUser({
        name,
        email,
        password,
        role: "user"
      });

      alert("Registered successfully! Please login.");
      navigate("/login");

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRegister();
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="card shadow p-4">

            <div className="text-center mb-4">
              <h3 className="fw-bold">Create Account</h3>
              <p className="text-muted">
                Join BlogApp and start writing
              </p>
            </div>

            {error && (
              <div
                className="alert alert-danger py-2 text-center"
                role="alert">
                {error}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Email Address
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Min 4 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  confirmPassword && password !== confirmPassword
                    ? "is-invalid"
                    : confirmPassword && password === confirmPassword
                    ? "is-valid"
                    : ""
                }`}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              {confirmPassword && password !== confirmPassword && (
                <small className="text-danger">
                  Passwords do not match
                </small>
              )}
              {confirmPassword && password === confirmPassword && (
                <small className="text-success">
                  Passwords match
                </small>
              )}
            </div>

            <button
              onClick={handleRegister}
              className="btn btn-success w-100 mb-3"
              disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center text-muted mb-3">
              <small>or</small>
            </div>

            <div className="text-center">
              <p className="mb-0">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-dark fw-semibold">
                  Login here
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;