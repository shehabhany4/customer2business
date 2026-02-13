import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import CompanyDashboard from "./components/CompanyDashboard.jsx";
import FreelancerDashboard from "./components/FreelancerDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>

      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute role="company">
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/freelancer/dashboard"
          element={
            <ProtectedRoute role="freelancer">
              <FreelancerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback: any unknown route */}
        <Route path="*" element={<h2 className="text-center mt-5">Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
