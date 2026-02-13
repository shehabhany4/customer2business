import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add("bg-dark", "text-light");
      body.classList.remove("bg-light", "text-dark");
    } else {
      body.classList.add("bg-light", "text-dark");
      body.classList.remove("bg-dark", "text-light");
    }
    body.style.transition = "background-color 0.3s, color 0.3s";
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return [darkMode, toggleDarkMode];
}
