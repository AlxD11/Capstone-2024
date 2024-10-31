// src/components/CreateAccount.js
import React, { useState } from 'react';

function CreateAccount() {
  // State to manage form inputs
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = (e) => {
    e.preventDefault();
    // Logic for creating an account goes here (e.g., validation, API call)
    console.log('Username:', username);
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div style={styles.container}>
      <h2>Create an Account</h2>
      <form onSubmit={handleCreateAccount} style={styles.form}>
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
        <button type="submit" style={styles.button}>Create Account</button>
      </form>
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
