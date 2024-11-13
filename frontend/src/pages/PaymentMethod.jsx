import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentMethod.css';

const PaymentMethod = () => {
  const navigate = useNavigate();

  const handlePaymentSelection = (method) => {
    alert(`Selected Payment Method: ${method}`);
    // Implement payment processing here as needed
    navigate('/'); // Redirect to home or a confirmation page
  };

  return (
    <div className="payment-method-container">
      <h2>Select Payment Method</h2>
      <button className="payment-option" onClick={() => handlePaymentSelection('Credit Card')}>
        Credit Card
      </button>
      <button className="payment-option" onClick={() => handlePaymentSelection('PayPal')}>
        PayPal
      </button>
      <button className="payment-option" onClick={() => handlePaymentSelection('Cash')}>
        Cash
      </button>
    </div>
  );
};

export default PaymentMethod;
