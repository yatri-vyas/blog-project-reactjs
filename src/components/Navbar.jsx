import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-4" to="/">
           BlogApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2">

            {/* Always visible */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            {/* Not logged in */}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {/* Logged in — all users */}
            {user && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/create">
                  + Create Blog
                </Link>
              </li>
            )}

            {/* User role only */}
            {user?.role === "user" && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/user-dashboard">
                  My Blogs
                </Link>
              </li>
            )}

            {/* Admin role only */}
            {user?.role === "admin" && (
              <li className="nav-item">
                <Link
                  className="btn btn-warning text-dark fw-bold px-3"
                  to="/admin-dashboard">
                  Admin Panel
                </Link>
              </li>
            )}

            {/* Logged in — user info + logout */}
            {user && (
              <li className="nav-item d-flex align-items-center gap-2">

                {/* User name + role badge */}
                <span className="d-flex align-items-center gap-1
                  bg-secondary text-white px-3 py-1 rounded-pill"
                  style={{ fontSize: "14px" }}>
                  👤 {user.name}
                  <span className={`badge ms-1 
                    ${user.role === "admin" ? "bg-danger" : "bg-success"}`}>
                    {user.role}
                  </span>
                </span>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm">
                  Logout
                </button>

              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;