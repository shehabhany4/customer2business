import { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage("users", []);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);

  // Register
  const register = ({ name, email, password, role }) => {
    // منع تسجيل نفس الإيميل
    const exists = users.find(u => u.email === email);
    if (exists) return false;

    const newUser = { id: crypto.randomUUID(), name, email, password, role };
    setUsers([newUser, ...users]);
    setCurrentUser(newUser);
    return true;
  };

  // Login
  const login = ({ email, password }) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  // Logout
  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ users, currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
