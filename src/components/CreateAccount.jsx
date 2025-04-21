// src/components/CreateAccount.js
import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext"
import { Alert } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import { db } from "../firebase"; // this is to import firestore
import { doc, setDoc } from 'firebase/firestore';
import appLogo from '../assets/app_logo.png';

function CreateAccount() {
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const saveUserToFirestore = async (userID, name, email) => {
    try {
      await setDoc(doc(db, "user_info", userID, "Data", "Profile"), {
        email: email,
        Name: name,
      });
      console.log("User successfully added to Firestore");
    } catch (err) {
      console.error("Error adding user to Firestore:", err);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);

      const userCredential = await signup(email, password);
      const userId = userCredential.user.uid;
      console.log("New user created:", { userId, name, email });
      await saveUserToFirestore(userId, name, email);
      navigate('/home');
    } catch (err) {
      console.error("Error during account creation:", err);
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
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
            <small style={styles.helperText}>This field cannot be blank</small>
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
            <small style={styles.helperText}>Please enter a valid email address</small>
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
            <small style={styles.helperText}>Must be greater than 6 characters</small>
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
            <small style={styles.helperText}>Must match the password above</small>
          </label>
          <button disabled={loading} type="submit" style={styles.button}>
            Create Account
          </button>
        </form>
        <div style={styles.links}>
          <Link to="/">Have an account? Login</Link>
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
    fontFamily: 'sans-serif',
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
    margin: '10px 0 2px 0',
    padding: '8px',
    fontFamily: 'inherit',
  },
  helperText: {
    fontSize: '0.75rem',
    color: '#555',
    marginBottom: '8px',
    textAlign: 'left',
    display: 'block',
    fontFamily: 'inherit',
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
    fontFamily: 'inherit',
  },
  links: {
    marginTop: '20px',
  },
  appLogo: {
    maxWidth: '80%',
    maxHeight: '80%',
  },
};

export default CreateAccount;
