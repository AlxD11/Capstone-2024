// src/components/CreateAccount.js
import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext"
import { Alert } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'

function CreateAccount() {
  // State to manage form inputs
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await signup(email, password)
      navigate('/main-screen')
    }catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  };

  return (
    <div style={styles.container}>
      <h2>Create an Account</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleCreateAccount} style={styles.form}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
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
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <button disabled={loading} type="submit" style={styles.button}> Create Account </button>
      </form>
      <div style={styles.links}>
        <Link to ="/">Have an account? Login</Link>
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
};

export default CreateAccount;