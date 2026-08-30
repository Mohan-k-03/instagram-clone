import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewStory() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No story ID provided");
      return;
    }
    
    console.log("Fetching story for ID:", id);
    fetch(`http://localhost:3000/stories/${id}`)
      .then((res) => {
        console.log("Response status:", res.status);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Story data:", data);
        setStory(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch story:", err);
        setError(err.message);
      });
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      {error && <div style={{ color: "red" }}><p>Error: {error}</p></div>}
      {story ? (
        <div>
          <img src={story.profilePicUrl} alt={story.username} style={{ width: "100px", borderRadius: "50%" }} />
          <p><strong>Username:</strong> {story.username}</p>
          <p><strong>Name:</strong> {story.fullName}</p>
          <p><strong>Bio:</strong> {story.bio}</p>
          <p><strong>Followers:</strong> {story.followersCount}</p>
          <p><strong>ID:</strong> {id}</p>
        </div>
      ) : error ? null : (
        <div><p>Loading...</p></div>
      )}
    </div>
  );
}

export default ViewStory;
