
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getUsers } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await getUsers();

      const foundUser = res.data.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        login(foundUser);
        if (foundUser.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div className="card shadow p-4">
            <div className="text-center mb-4">
              <h3 className="fw-bold">Welcome Back</h3>
              <p className="text-muted">
                Login to your BlogApp account
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

  
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
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


            <button
              onClick={handleLogin}
              className="btn btn-dark w-100 mb-3"
              disabled={loading}>
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
            <div className="text-center text-muted mb-3">
              <small>or</small>
            </div>


            <div className="text-center">
              <p className="mb-0">
                Don't have an account?{" "}
                <Link to="/register" className="text-dark fw-semibold">
                  Register here
                </Link>
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;