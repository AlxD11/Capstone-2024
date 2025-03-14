import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ProfilePicture() {
  const { currentUser } = useAuth();
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    } else {
      //If the user exists but has no photoURL, set the default.
      setPhotoURL("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png")
    }
  }, [currentUser]);

  return photoURL;
}