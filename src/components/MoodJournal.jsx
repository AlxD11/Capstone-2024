import React, { useState, useEffect } from "react";
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, Timestamp, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import NavBar from "./NavBar";
function MoodJournal() {
  const [summary, setSummary] = useState("");
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false)
  const moods = ["Happy", "Sad", "Angry", "Excited", "Calm"];
  const currentDate = new Date().toLocaleDateString();
  const navigate = useNavigate()
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  const [moodJournals, setMoodJournals] = useState({});
  const [expandedDate, setExpandedDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("No user is signed in.");
        return;
      }
      const userId = currentUser.uid;
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      const moodEntriesCollection = collection(
        db,
        "user_info",
        userId,
        "Data",
        "Mood Poll",
        "Mood_entries"
      );

      const q = query(
        moodEntriesCollection,
        where("date", ">=", Timestamp.fromDate(startOfDay)),
        where("date", "<=", Timestamp.fromDate(endOfDay)),
      )
      const querySnapshot = await getDocs(q);
      const newFields = { date: Timestamp.fromDate(date), Summary: summary, Mood: mood };
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (document) => {
          console.log(document, newFields)
          await updateDoc(doc(moodEntriesCollection, document.id), newFields);

        });
        console.log("Document updated:", newFields);
      } else {
        await addDoc(moodEntriesCollection, newFields);
        console.log("Document added:", newFields);
      }

      navigate("/home");
    } catch (error) {
      console.error("Error handling mood entry:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    const fetchMoodJournals = async () => {
      if (!auth.currentUser) return;

      const userId = auth.currentUser.uid;
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      weekAgo.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const moodEntriesCollection = collection(
        db,
        "user_info",
        userId,
        "Data",
        "Mood Poll",
        "Mood_entries"
      );

      const journalQuery = query(
        moodEntriesCollection,
        where("date", ">=", Timestamp.fromDate(weekAgo)),
        where("date", "<=", Timestamp.fromDate(today))
      );

      try {
        const jounalQuerySnapshot = await getDocs(journalQuery);
        const journals = {};
        jounalQuerySnapshot.forEach((document1) => {
          const data = document1.data();
          const date = data.date.toDate().toISOString().split('T')[0];
          if (!journals[date]) {
            journals[date] = [];
          }
          journals[date].push({ Summary: data.Summary, Mood: data.Mood });
        });
        setMoodJournals(journals);
        console.log(journals)
      } catch (error) {
        console.error("Error fetching mood journals:", error);
      }
    };

    fetchMoodJournals();
  }, []);

  const toggleExpand = (date) => {
    setExpandedDate(expandedDate === date ? null : date);
  };
  return (
    <div style={styles.container}>
      <NavBar />
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
          <div style={styles.journalDisplay}>
            <label style={styles.heading}>
              <h2>Your journals from the last seven days</h2>
            </label>
            {Object.keys(moodJournals)
              .sort((a, b) => new Date(b) - new Date(a))
              .map((date) => (
                <div key={date}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleExpand(date)}
                  >
                    <button style={{ marginLeft: '10px' }}>
                      {expandedDate === date ? '-' : '+'}
                    </button>
                    <span style={{ textDecoration: 'underline', fontWeight: 'bold', color: 'var(--body-text-color)' }}>
                      {date}
                    </span>
                  </div>
                  {expandedDate === date && (
                    <div style={{ textAlign: 'left', paddingLeft: '20px' }}>
                      {moodJournals[date].map((journal) => (
                        <div key={journal.id} style={{ paddingLeft: '10px' }}>
                          <h4><p>Mood:  {journal.Mood}</p></h4>
                          <h4><p> Summary:  {journal.Summary}</p></h4>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    display: 'block',
    //backgroundColor: '#F9E0EA',
    minHeight: '100vh',
  },
  formContainer: {
    display: 'block',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '40vw',
    height: '70vh',
    //backgroundColor: 'white',
    borderStyle: 'solid',
    borderWidth: '10px',
   // borderColor: 'white',
    borderRadius: '32px',
    margin: '5vw',
  },
  heading: {
    color: "#E33A5F",         // Color for the heading
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  textareaContainer: {
    marginBottom: "20px",     // Margin between fields
    padding: '10px',
  },
  textarea: {
    align: "center",
    width: "100%",            // Make textarea fill the width of its container
    marginTop: "5px",         // Margin on top of the textarea
    borderRadius: "8px",
    border: "2px solid black",// Black border around the textarea
    backgroundColor: "white", // White background for the textarea
    color: "black",           // Black text inside the textarea
  },
  selectContainer: {
    marginBottom: "20px",     // Margin between select and other fields
    padding: '10px',
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

};

export default MoodJournal;
