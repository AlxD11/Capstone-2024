// src/components/ResetPassword.js
import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "react-bootstrap";

function ResetPassword() {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await resetPassword(email);
      setMessage('Check your inbox for further instructions.');
    } catch {
      setError('Failed to reset password. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>Reset Password</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <p>&lt;to be edited&gt;</p>
    </div>
  );
}

// Optional inline CSS
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    color: '#888', // Light grey to indicate it's a placeholder
  },
};

export default ResetPassword;
