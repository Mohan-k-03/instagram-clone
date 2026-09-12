import { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          fetch("http://localhost:5000/api/posts"),
          fetch("http://localhost:5000/api/users"),
        ]);
        setPosts(await postsResponse.json());
        setUsers(await usersResponse.json());
      } catch (error) {
        console.error(error);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="posts-list">
      {posts.length > 0 && users.length > 0 ? (
        posts.map((post) => {
          const user = users.find((item) => item.id === post.userId);
          if (!user) return null;
          return (
            <article className="post-card" key={post.id}>
              <div className="post-header">
                <img
                  className="post-avatar"
                  src={user.profilePicUrl}
                  alt={user.username}
                />
                <strong>{user.username}</strong>
                <i className="bi bi-three-dots ms-auto" />
              </div>
              <img
                className="post-image"
                src={post.mediaUrls[0]}
                alt={post.caption}
              />
              <div className="post-actions">
                <i className="bi bi-heart" />
                <i className="bi bi-chat" />
                <i className="bi bi-send" />
                <i className="bi bi-bookmark ms-auto" />
              </div>
              <div className="post-details">
                <strong>{post.likesCount} likes</strong>
                <p>
                  <strong>{user.username}</strong> {post.caption}
                </p>
              </div>
            </article>
          );
        })
      ) : (
        <div className="loading-state">Loading posts...</div>
      )}
    </div>
  );
}

export default Posts;
