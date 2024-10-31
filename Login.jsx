// src/components/Login.js
import React, { useState } from 'react';

function Login() {
  // State to manage username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic for login goes here (e.g., validation, API call)
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit" style={styles.button}><a href="/main-screen">Login</a></button>
      </form>
      <div style={styles.links}>
        <a href="/create-account">Create an Account</a> | <a href="/reset-password">Forgot Password?</a>
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
