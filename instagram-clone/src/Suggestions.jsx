import React, { useState, useEffect } from "react";

function Suggestions() {
  const [users, setUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => {
      fetch("http://localhost:3000/users")
        .then((res) => res.json())
        .then((usersData) => {
          setUsers(usersData);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }, 1000);
  }, []);

  const handleFollow = (userId) => {
    setFollowedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  return (
    <div className="w-75 m-4 p-3">
      <div className="mb-3">
        <h5 className="fw-bold">Suggestions For You</h5>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <p className="text-muted">Loading suggestions...</p>
        </div>
      ) : users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div
              key={user.id}
              className="d-flex align-items-center justify-content-between p-2 border-bottom"
            >
              <div className="d-flex align-items-center">
                <img
                  className="rounded-circle me-2 "
                  src={user.profilePicUrl}
                  alt={user.username}
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <div>
                  <p className="mb-0 fw-bold ">{user.username}</p>
                  <p className="mb-0 text-muted  small">{user.fullName}</p>
                </div>
              </div>
              <button
                onClick={() => handleFollow(user.id)}
                className={`btn btn-sm ${
                  followedUsers.has(user.id)
                    ? "btn-outline-secondary"
                    : "btn-primary"
                }`}
              >
                {followedUsers.has(user.id) ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-muted">No suggestions available</p>
        </div>
      )}
    </div>
  );
}

export default Suggestions;
