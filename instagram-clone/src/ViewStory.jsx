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

    fetch(`http://localhost:3000/stories/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setStory(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  return (
    <div style={{ padding: "10px" }}>
      {error && (
        <div style={{ color: "red" }}>
          <p>Error: {error}</p>
        </div>
      )}
      {story ? (
        <div className="d-flex  align-item-center ">
          <img
            className="  vh-100  "
            src={story.mediUrls}
            alt={story.username}
            style={{}}
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
