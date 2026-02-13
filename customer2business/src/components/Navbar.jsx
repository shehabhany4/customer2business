import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import useDarkMode from "../hooks/useDarkMode.js";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, toggleDarkMode] = useDarkMode();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-dark bg-primary"}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">FreelanceHub</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-center">
            {currentUser && (
              <>
                <li className="nav-item me-2">
                  <span className="nav-link">Hello, {currentUser.name}</span>
                </li>

                {/* Dark Mode Toggle */}
                <li className="nav-item me-2">
                  <button className="btn btn-sm btn-outline-light" onClick={toggleDarkMode}>
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                </li>

                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
