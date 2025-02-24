// src/components/MoodJournal.jsx
import React, { useState, useEffect } from "react";
import { addMoodEntry, getMoodEntries } from "../services/moodJournalService";
import { useAuth } from "../contexts/AuthContext"; // adjust the path as needed

const MoodJournal = () => {
  const { currentUser } = useAuth(); // Get the current user from AuthContext
  const userId = currentUser ? currentUser.uid : null;

  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return; // Ensure a user is authenticated

    try {
      const moodData = { mood, note };
      await addMoodEntry(userId, moodData);
      loadEntries(); // Refresh entries after submission
      setMood("");
      setNote("");
    } catch (error) {
      console.error("Error submitting mood entry:", error);
    }
  };

  const loadEntries = async () => {
    if (!userId) return;
    try {
      const fetchedEntries = await getMoodEntries(userId);
      setEntries(fetchedEntries);
    } catch (error) {
      console.error("Error loading mood entries:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      loadEntries();
    }
  }, [userId]);

  return (
    <div>
      <h2>Mood Journal</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          required
        />
        <textarea
          placeholder="Any notes..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Your Entries</h3>
        {entries.map((entry) => (
          <div key={entry.id}>
            <p><strong>Mood:</strong> {entry.mood}</p>
            <p><strong>Note:</strong> {entry.note}</p>
            <p>
              <em>
                {entry.createdAt?.toDate
                  ? entry.createdAt.toDate().toLocaleString()
                  : "Just now"}
              </em>
            </p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodJournal;
