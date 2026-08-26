import React, { useEffect, useState } from "react";

function Posts() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((data) => data.json())
      .then((data) => setPost(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>{post.length > 0 ? <div>{post}</div> : <div>LOaidn posts</div>}</div>
  );
}

export default Posts;
