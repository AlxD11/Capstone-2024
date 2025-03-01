import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext"
import { Alert } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError('');
      setMessage('');
      setLoading(true);
      await resetPassword(email);
      navigate("/")
      setMessage('Check your inbox for further instructions.');
    } catch {
      setError('Failed to reset password. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}></div>
      <h2>Reset Password</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
          Email address:
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Sending...' : 'Reset Password'}
        </button>
        </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    backgroundColor: '#F9E0EA',
    color: '#888',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '5px auto',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '10px 20px',
    backgroundColor: '#287bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ResetPassword;
