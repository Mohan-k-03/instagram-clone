import React from "react";

function Sidebar() {
  return (
    <>
      <div className="m-3">
        <div className="d-flex flex-column gap-3 space-between">
          <img
            className="logo-text"
            src="./src/assets/instagram-text.png"
            alt="insta-text"
          ></img>
          <div>
            <i className="bi bi-house "></i>Home
          </div>
          <div>
            <i className="bi bi-search"></i>Search
          </div>
          <div>
            <i className="bi bi-compass"></i>Explore reels
          </div>
          <div>
            <i className="bi bi-play-btn"></i>Reels
          </div>
          <div>
            <i className="bi bi-chat"></i>Messages
          </div>
          <div>
            <i className="bi bi-heart"></i>Notification
          </div>
          <div>
            <i className="bi bi-plus-square"></i>Create
          </div>
          <div>
            <i className="bi bi-person-circle"></i>Profile
          </div>
        </div>
        <div className="d-flex flex-column gap-3 position-fixed bottom-0 mb-3 ">
          <div>
            <i className="bi bi-threads"></i>Thread
          </div>

          <div>
            <i className="bi bi-list"></i>Menu
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
