// src/components/payment/AmountForm.jsx
import { useState, useEffect } from "react";
import './styles/Payment.css';


// Simple location hook (minimal version)
export const useDeviceLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          console.warn('Geolocation permission denied');
        }
      );
    }
  }, []);

  return { location };
};



const AmountForm = ({ amount = 0 , transportData}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFrame, setIsFrame] = useState(false);
  const [keyGroup, setKeyGroup] = useState(null)
  console.log(transportData)
  // Auto-submit when amount is provided
  useEffect(() => {
    if (amount && amount >= 10 && amount <= 50000) {
      handleSubmit(amount);
    }
  }, [amount]);

  const handleSubmit = async (submitAmount) => {
    if (!submitAmount || submitAmount < 10 || submitAmount > 50000) {
      setError("Amount must be between ₹10 and ₹50,000");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzEwODhmZjM4ZGJhNzhhZDY2YjVmZWIiLCJwaG9uZU51bWJlciI6ODgxMDMwMDcyNCwiZW1haWwiOiJzeTI0MTUyN0BnbWFpbC5jb20iLCJyb2xlIjoiY2hhZ2Fuc0VtcGxveWVlMiIsImxvZ2luSWQiOiJmOGUzOWRhOC03MmQ2LTRmNTUtYWJlMC0xM2Q5YWIxMjJmZTkiLCJpYXQiOjE3NjkxNDM0NDUsImV4cCI6MTc3NjkxOTQ0NX0.Y8_yAqXxKhw7Hijfn5zJkHfWDHqijjRyxDom2XwqzFs";
      if (!token) {
        setError("Authentication required. Please login.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        `https://chagans.com/payment/addMoneyTen`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`        
          },
          body: JSON.stringify({
            amount: submitAmount, 
            transportData:{
              ...transportData,
              trackingId: `TRK${Math.floor(100000 + Math.random() * 900000)}`,
            },
            mobile: "7983920962",  // You might want to get this from user context
            apiType: "API",
          }),
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setSuccess("Payment initialized successfully!");
        setKeyGroup(data.data);
        setIsFrame(true);
        
        // Auto-submit the form
        setTimeout(() => {
          const form = document.getElementById('payment-form');
          if (form) form.submit();
        }, 500);
      } else {
        setError(data.message || "Payment failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
      console.error('Payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="amount-form-container">
      {/* Hidden form for auto-submission */}
      {isFrame && keyGroup && (
        <form
          id="payment-form"
          action={keyGroup?.APIURL}
          method="POST"
          style={{ display: 'none' }}
        >
          {Object.entries(keyGroup)
            .filter(([key]) => key !== "APIURL").filter(([key]) => key !== "mobile")
            .map(([key, value]) => (
              <input
                type="hidden"
                key={key}
                name={key.toUpperCase()}
                value={value}
              />
            ))}
        </form>
      )}

      {/* Status Display */}
      <div className="status-container">
        {error && (
          <div className="error-message">
            <svg className="error-icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#fee"/>
              <path d="M12 8v4M12 16h.01" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="message-content">
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="success-message">
            <svg className="success-icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="#d1fae5"/>
              <path d="M8 12L11 15L16 9" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="message-content">
              <h3>Success!</h3>
              <p>{success}</p>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Processing payment...</p>
          </div>
        )}

        {isFrame && !error && (
          <div className="redirecting-message">
            <div className="spinner"></div>
            <p>Redirecting to payment gateway...</p>
          </div>
        )}
      </div>

      {/* Amount Display */}
      {amount && !isLoading && !error && !success && !isFrame && (
        <div className="amount-display">
          <div className="amount-label">Processing Amount:</div>
          <div className="amount-value">₹{amount.toLocaleString('en-IN')}</div>
          <div className="amount-note">
            Pay At Cash Counter
          </div>
        </div>
      )}

      {/* Manual Retry Button */}
      {error && amount && (
        <button
          className="retry-button"
          onClick={() => handleSubmit(amount)}
          disabled={isLoading}
        >
          {isLoading ? 'Retrying...' : 'Retry Payment'}
        </button>
      )}
    </div>
  );
};

export default AmountForm;