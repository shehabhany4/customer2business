import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import useToast from "../hooks/useToast.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { addToast, ToastContainer } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("freelancer");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      addToast("Please fill all fields", "danger");
      return;
    }

    const success = register({ name, email, password, role });
    if (!success) {
      addToast("Email already registered", "danger");
      return;
    }

    addToast("Registration successful!", "success");

    // Redirect based on role
    setTimeout(() => {
      if (role === "company") navigate("/company/dashboard");
      else navigate("/freelancer/dashboard");
    }, 1000);
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="card p-4 col-md-6 mx-auto">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Role</label>
          <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="freelancer">Freelancer</option>
            <option value="company">Company</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100">Register</button>
        <div className="text-center mt-3">
  <span>Already have an account? </span>
  <Link to="/login" className="btn btn-link p-0">Login here</Link>
</div>

      </form>
    </div>
  );
}
