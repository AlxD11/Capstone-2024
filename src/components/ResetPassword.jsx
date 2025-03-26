import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext"
import { Alert } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import appLogo from '../assets/app_logo.png';
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
      <div style={styles.formContainer}>
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
        <div style={styles.links}>
          <Link to="/">Back to Login</Link>
        </div>
      </div>
      <div style={styles.sidebar}>
        <h2>Welcome to Neurological Harmony</h2>
        <img src={appLogo} style={styles.appLogo} alt="App logo" />
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    backgroundColor: '#F9E0EA',
    minHeight: '100vh',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '40vw',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: '10px',
    borderColor: 'white',
    borderRadius: '32px',
    margin: '5vw',
  },
  sidebar: {
    maxWidth: '40vw',
    width: '40vw',
    color: '#E33A5F',
    fontSize: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: '10px 0',
    padding: '8px',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#FDAFB7',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderStyle: 'solid',
    borderWidth: '4px',
    borderColor: '#FDAFB7',
    borderRadius: '8px',
  },
  links: {
    marginTop: '20px',
  },
  appLogo: {
    maxWidth: '80%',
    maxHeight: '80%',
  },
};

export default ResetPassword;
