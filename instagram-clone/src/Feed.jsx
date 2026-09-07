import Stories from "./Stories";
import Posts from "./Posts";

function Feed() {
  return (
    <div className="feed-stack" id="feed">
      <div className="stories-panel">
        <Stories />
      </div>
      <div className="posts-stack">
        <Posts />
      </div>
    </div>
  );
}

export default Feed;
