import React, { useEffect, useState } from "react";

function Stories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:3000/stories")
        .then((res) => res.json())
        .then((data) => setStories(data))
        .catch((err) => console.log(err));
    }, 1000);
  }, []);

  return (
    <div className="d-flex overflow-auto p-2" style={{ gap: "10px" }}>
      {stories.length > 0 ? (
        stories.map((story) => (
          <div key={story.id} className="text-center">
            <img
              src={story.profilePicUrl}
              alt={story.username}
              className="rounded-circle"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                border: "2px solid #ff1493",
              }}
            />
            <p
              className="small mt-1"
              style={{
                maxWidth: "80px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {story.username}
            </p>
          </div>
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
export default Stories;
