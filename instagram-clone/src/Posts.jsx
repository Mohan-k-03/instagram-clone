import React, { useEffect, useState } from "react";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      Promise.all([
        fetch("http://localhost:3000/posts").then((res) => res.json()),
        fetch("http://localhost:3000/users").then((res) => res.json()),
      ])
        .then(([postsData, usersData]) => {
          setPosts(postsData);
          setUsers(usersData);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, []);

  return (
    <>
      <div className="d-flex justify-content">
        {posts.length > 0 && users.length > 0 ? (
          <div>
            {posts.map((post) => {
              const user = users.find((u) => u.id === post.userId);
              return (
                <div key={post.id}>
                  <div className="d-flex  ">
                    <img
                      className=" db rounded-circle"
                      src={user.profilePicUrl}
                    ></img>
                    <h5>{user.username}</h5>
                  </div>
                  <img className="image" src={post.mediaUrls[0]} alt="d" />
                <div>
                    <i className="bi bi-heart"> </i>
                  <i className="bi bi-chat"></i>
                  <i className="bi bi-send"></i>
                  <div className="text-bold">{post.likesCount}Likes </div>
                  <div> {post.caption}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Loading posts</div>
        )}
      </div>
    </>
  );
}

export default Posts;
