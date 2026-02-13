import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import useToast from "../hooks/useToast.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { addToast, ToastContainer } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login({ email, password });
    if (!success) {
      addToast("Invalid credentials", "danger");
      return;
    }

    addToast("Login successful!", "success");

    // Redirect based on role
    setTimeout(() => {
      const userRole = JSON.parse(localStorage.getItem("currentUser"))?.role;
      if (userRole === "company") navigate("/company/dashboard");
      else navigate("/freelancer/dashboard");
    }, 500);
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="card p-4 col-md-6 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
        <div className="text-center">
          <span>Don't have an account? </span>
          <Link to="/register" className="btn btn-link p-0">Register here</Link>
        </div>
      </form>
    </div>
  );
}
