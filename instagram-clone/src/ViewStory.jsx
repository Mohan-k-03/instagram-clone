import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewStory() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("No story ID provided");
      setStory(null);
      return;
    }

    let active = true;

    fetch(`http://localhost:3000/stories/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!active) return;
        setStory(data);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message);
        setStory(null);
      });

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div style={{ padding: "10px" }}>
      {error && (
        <div style={{ color: "red" }}>
          <p>Error: {error}</p>
        </div>
      )}
      {story ? (
        <div className="d-flex align-item-center justify-content-center  ">
          <img
            src={story.mediaUrls}
            alt={story.username || "Story"}
            style={{  Width: "10px" }}
          />
        </div>
      ) : error ? null : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default ViewStory;
