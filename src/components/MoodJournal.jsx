import React, { useState } from "react";
import NavBar from "./NavBar";
function MoodJournal() {
  const [summary, setSummary] = useState("");
  const [mood, setMood] = useState("");

  const moods = ["Happy", "Sad", "Angry", "Excited", "Calm"];
  const currentDate = new Date().toLocaleDateString();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Summary: ${summary}\nMood: ${mood}`);
  };

  return (
    <div style={styles.container}>
        <NavBar/>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Mood Journal - {currentDate}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.textareaContainer}>
            <label htmlFor="summary" style={styles.label}>
              Summary of the Day:
            </label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Write about your day..."
              rows="5"
              cols="50"
              required
              style={styles.textarea}
            />
          </div>
          <div style={styles.selectContainer}>
            <label htmlFor="mood" style={styles.label}>
              Select your Mood:
            </label>
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
              style={styles.select}
            >
              <option value="" disabled>
                Choose a mood
              </option>
              {moods.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit" style={styles.button}>
              Save
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
}

const styles = {
 container: {
    display: "flex",         // Use flexbox
    justifyContent: "center", // Center horizontally
    alignItems: "center",     // Center vertically
    height: "100vh",          // Full viewport height
    width: "100vw",           // Full viewport width
    backgroundColor: "#F9E0EA",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    align: "center",
    height: "100%",
    width: "50%",  
    backgroundColor: "white",
    borderStyle: "solid",
    borderWidth: "10px",
    borderColor: "white",
    borderRadius: "32px",
    padding: "100px",
    boxSizing: "border-box",
    marginTop: "20px",
  },
  heading: {
    color: "#E33A5F",         // Color for the heading
  },
  form: {
    align: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%",            // Ensure the form takes up full width inside the container
  },
  textareaContainer: {
    marginBottom: "20px",     // Margin between fields
  },
  textarea: {
    align:"center",
    width: "100%",            // Make textarea fill the width of its container
    padding: "10px",          // Padding inside the textarea
    marginTop: "5px",         // Margin on top of the textarea
    borderRadius: "8px",
    border: "2px solid black",// Black border around the textarea
    backgroundColor: "white", // White background for the textarea
    color: "black",           // Black text inside the textarea
  },
  selectContainer: {
    marginBottom: "20px",     // Margin between select and other fields
  },
  select: {
    width: "100%",            // Make the select input fill the container's width
    padding: "10px",          // Padding for the select input
    marginTop: "5px",         // Margin on top of the select input
    borderRadius: "8px",      // Round corners of the select
    border: "2px solid black",// Black border around the select input
    backgroundColor: "white", // White background for the select field
    color: "black",           // Black text in the select field
  },
  label: {
    color: "#E33A5F",         // Color for the label text
    fontSize: "1.1rem",       
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#FDAFB7",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "8px",
  },

};

export default MoodJournal;
