// src/services/moodJournalService.js
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.jsx"; // Updated import

// Function to add a mood journal entry
export const addMoodEntry = async (userId, moodData) => {
  try {
    const docRef = await addDoc(collection(db, "moodJournal"), {
      userId,
      ...moodData,
      createdAt: serverTimestamp(), // Stores the server timestamp
    });
    console.log("Mood entry added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding mood entry:", error);
    throw error;
  }
};

// Function to get mood journal entries for a specific user
export const getMoodEntries = async (userId) => {
  try {
    const q = query(
      collection(db, "moodJournal"),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    const entries = [];
    querySnapshot.forEach((doc) => {
      entries.push({ id: doc.id, ...doc.data() });
    });
    return entries;
  } catch (error) {
    console.error("Error retrieving mood entries:", error);
    throw error;
  }
};
