import React, { useState } from "react";

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
    <div style={{ padding: "20px" }}>
      <h2>Mood Journal - {currentDate}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="summary">Summary of the Day:</label>
          <br />
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write about your day..."
            rows="5"
            cols="50"
            required
          />
        </div>
        <div>
          <label htmlFor="mood">Select your Mood:</label>
          <br />
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
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
          <button type="submit" style={{ marginTop: "10px" }}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default MoodJournal;
