import { useState } from "react";

export default function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const ToastContainer = () => (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`alert alert-${toast.type} shadow-sm`}
          style={{ marginBottom: "10px" }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );

  return { addToast, ToastContainer };
}
