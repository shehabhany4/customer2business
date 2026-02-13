import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/data";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/${key}`);
        const data = await response.json();
        setValue(data.length > 0 ? data : initialValue);
      } catch (error) {
        console.error("Error fetching data:", error);
        setValue(initialValue);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [key]);

  // Save data to backend whenever value changes
  useEffect(() => {
    if (!loading) {
      const saveData = async () => {
        try {
          await fetch(`${API_URL}/${key}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
          });
        } catch (error) {
          console.error("Error saving data:", error);
        }
      };
      saveData();
    }
  }, [key, value, loading]);

  return [value, setValue];
}