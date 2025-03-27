// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext"
import { Alert } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import { signInWithPopup, setPersistence, browserLocalPersistence, inMemoryPersistence } from 'firebase/auth'; // Import correct persistence types
import { googleProvider, auth } from '../firebase';
import { FaGoogle } from 'react-icons/fa';
import appLogo from '../assets/app_logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      // Set persistence based on checkbox
      if (keepSignedIn) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, inMemoryPersistence); // Use inMemoryPersistence for session-only
      }

      await login(email, password);
      navigate('/home');
    } catch (err) {
      setError("Incorrect Email ID or password");
      console.error("Login Error:", err);
    }
    setLoading(false);
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Set persistence based on checkbox
      if (keepSignedIn) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, inMemoryPersistence); // Use inMemoryPersistence for session-only
      }
      await auth.signInWithPopup(googleProvider);
      navigate('/home');
    } catch (err) {
      setError("Google Sign-in failed");
      console.error("Google Sign-in error:", err);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2>Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <form onSubmit={handleLogin} style={styles.form}>
          <label>
            Email:
            <input
              type="text"
              placeholder="Email"
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </label>
          <label>
            <input
              type="checkbox"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            />
            Keep me signed in
          </label>
          <button disabled={loading} type="submit" style={styles.button}>Login</button>
          <button disabled={loading} style={styles.button} onClick={signInWithGoogle}> <FaGoogle />  Sign in with Google</button>
        </form>
        <div style={styles.links}>
          <Link to="/create-account">Create an Account</Link> | <Link to="/reset-password">Forgot Password?</Link>
        </div>
      </div>

      <div style={styles.sidebar}>
        <h2>Welcome to Neurological Harmony</h2>
        <img src={appLogo} style={styles.appLogo} alt="App logo" />

      </div>
    </div>
  );
}

// Inline CSS styles (optional, for demonstration)
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
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    '& img': {
      height: '20px',
      width: '20px',
    },
  },
  links: {
    marginTop: '20px',
  },
  appLogo: {
    maxWidth: '80%',
    maxHeight: '80%',
  },
};

export default Login;