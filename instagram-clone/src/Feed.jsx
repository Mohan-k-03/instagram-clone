import React from "react";
import Stories from "./Stories";
import Posts from "./Posts";

function Feed() {
  return (
    <div>
      <div >
        <Stories/>
      </div>
      <div className="bg-danger">
        <Posts/>
      </div>
    </div>
  );
}

export default Feed;
