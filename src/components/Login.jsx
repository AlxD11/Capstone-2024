// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext"
import { Alert } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("")
      setLoading(true)
      await login(email, password)
      navigate('/main-screen')
    }catch {
      setError("Incorrect Email ID or password")
    }

    setLoading(false)
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleLogin} style={styles.form}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <button disabled={loading} type="submit" style={styles.button}>Login</button>
      </form>
      <div style={styles.links}>
        <Link to ="/create-account">Create an Account</Link> | <Link to="/reset-password">Forgot Password?</Link>
      </div>
    </div>
  );
}

// Inline CSS styles (optional, for demonstration)
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
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
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  links: {
    marginTop: '20px',
  },
};

export default Login;
