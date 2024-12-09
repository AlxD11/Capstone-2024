import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchFirestoreData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "dummydata"));

    // Extract the "Mood" field from the first document
    const moodData = querySnapshot.docs.map((doc) => doc.data().Mood)[0];

    if (!moodData) return [0, 0, 0, 0, 0, 0, 0]; // Return default values if Mood is missing

    // Map "Day 1", "Day 2", etc. to weekdays
    const moodValues = [
      moodData["Day 1"] || 0, // Monday
      moodData["Day 2"] || 0, // Tuesday
      moodData["Day 3"] || 0, // Wednesday
      moodData["Day 4"] || 0, // Thursday
      moodData["Day 5"] || 0, // Friday
      moodData["Day 6"] || 0, // Saturday
      moodData["Day 7"] || 0, // Sunday
    ];

    return moodValues; // Return values in the correct order
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
    return [0, 0, 0, 0, 0, 0, 0]; // Fallback values on error
  }
};
