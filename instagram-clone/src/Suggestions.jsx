import { useEffect, useState } from "react";

function Suggestions() {
  const [users, setUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const handleFollow = (userId) => {
    setFollowedUsers((previous) => {
      const next = new Set(previous);
      if (next.has(userId)) next.delete(userId);
      else next.add(userId);
      return next;
    });
  };

  return (
    <div className="suggestions-panel">
      <div className="profile-preview">
        <div className="profile-avatar">Y</div>
        <div>
          <strong>your_profile</strong>
          <span>Welcome back</span>
        </div>
        <button className="text-button">Switch</button>
      </div>
      <div className="suggestions-heading">
        <strong>Suggested for you</strong>
        <button className="text-button">See all</button>
      </div>
      {loading ? (
        <div className="loading-state">Loading suggestions...</div>
      ) : users.length > 0 ? (
        users.map((user) => (
          <div key={user.id} className="suggestion-row">
            <div className="suggestion-user">
              <img
                className="suggestion-avatar"
                src={user.profilePicUrl}
                alt={user.username}
              />
              <div>
                <strong>{user.username}</strong>
                <span>{user.fullName}</span>
              </div>
            </div>
            <button
              onClick={() => handleFollow(user.id)}
              className={`follow-button ${followedUsers.has(user.id) ? "following" : ""}`}
            >
              {followedUsers.has(user.id) ? "Following" : "Follow"}
            </button>
          </div>
        ))
      ) : (
        <div className="loading-state">No suggestions available</div>
      )}
    </div>
  );
}

export default Suggestions;
