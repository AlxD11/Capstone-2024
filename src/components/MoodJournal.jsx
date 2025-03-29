import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, getDocs, updateDoc, Timestamp, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

import '../styles/global.css'; 
import './moodJournal.css';     

function MoodJournal() {
  const [summary, setSummary] = useState('');
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const moods = ['Happy', 'Sad', 'Angry', 'Excited', 'Calm'];
  const currentDate = new Date().toLocaleDateString();
  const navigate = useNavigate();
  const date = new Date();
  const [moodJournals, setMoodJournals] = useState({});
  const [expandedDate, setExpandedDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error('No user is signed in.');
        return;
      }
      const userId = currentUser.uid;
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      const moodEntriesCollection = collection(
        db,
        'user_info',
        userId,
        'Data',
        'Mood Poll',
        'Mood_entries'
      );

      const q = query(
        moodEntriesCollection,
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      );
      const querySnapshot = await getDocs(q);
      const newFields = { date: Timestamp.fromDate(date), summary: summary, mood: mood };
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (document) => {
          console.log(document, newFields);
          await updateDoc(doc(moodEntriesCollection, document.id), newFields);
        });
        console.log('Document updated:', newFields);
      } else {
        await addDoc(moodEntriesCollection, newFields);
        console.log('Document added:', newFields);
      }

      navigate('/home');
    } catch (error) {
      console.error('Error handling mood entry:', error);
    } finally {
      setLoading(false);
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
      today.setHours(23, 59, 59, 59);
      const moodEntriesCollection = collection(
        db,
        'user_info',
        userId,
        'Data',
        'Mood Poll',
        'Mood_entries'
      );

      const journalQuery = query(
        moodEntriesCollection,
        where('date', '>=', Timestamp.fromDate(weekAgo)),
        where('date', '<=', Timestamp.fromDate(today))
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
          journals[date].push({ Summary: data.summary, Mood: data.mood });
        });
        setMoodJournals(journals);
        console.log(journals);
      } catch (error) {
        console.error('Error fetching mood journals:', error);
      }
    };

    fetchMoodJournals();
  }, []);

  const toggleExpand = (date) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  return (
    <div className="mood-journal-container">
      <NavBar />
      <div className="mood-journal-form-container">
        <h2 className="mood-journal-heading">Mood Journal - {currentDate}</h2>
        <form onSubmit={handleSubmit} className="mood-journal-form">
          <div className="mood-journal-textarea-container">
            <label htmlFor="summary" className="mood-journal-label">
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
              className="mood-journal-textarea"
            />
          </div>
          <div className="mood-journal-select-container">
            <label htmlFor="mood" className="mood-journal-label">
              Select your Mood:
            </label>
            <select
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
              className="mood-journal-select"
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
            <button type="submit" className="mood-journal-button">
              Save
            </button>
          </div>
          <div className="mood-journal-journal-display">
            <label className="mood-journal-heading">
              <h2>Your journals from the last seven days</h2>
            </label>
            {Object.keys(moodJournals)
              .sort((a, b) => new Date(b) - new Date(a))
              .map((date) => (
                <div key={date}>
                  <div
                    className="mood-journal-expand-toggle"
                    onClick={() => toggleExpand(date)}
                  >
                    <button className="mood-journal-toggle-button">
                      {expandedDate === date ? '-' : '+'}
                    </button>
                    <span className="mood-journal-date">{date}</span>
                  </div>
                  {expandedDate === date && (
                    <div className="mood-journal-expanded-content">
                      {moodJournals[date].map((journal, index) => (
                        <div key={index} className="mood-journal-entry">
                          <h4>
                            <p>Mood: {journal.Mood}</p>
                          </h4>
                          <h4>
                            <p>Summary: {journal.Summary}</p>
                          </h4>
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

export default MoodJournal;
