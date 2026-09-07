function Sidebar() {
  const links = [
    ["bi-house-fill", "Home"],
    ["bi-search", "Search"],
    ["bi-compass", "Explore"],
    ["bi-play-btn", "Reels"],
    ["bi-chat", "Messages"],
    ["bi-heart", "Notifications"],
    ["bi-plus-square", "Create"],
    ["bi-person-circle", "Profile"],
  ];

  return (
    <div className="sidebar-panel">
      <img
        className="logo-text"
        src="./src/assets/instagram-text.png"
        alt="Instagram"
      />
      <nav className="sidebar-nav" aria-label="Main navigation">
        {links.map(([icon, label], index) => (
          <a
            className={`sidebar-link ${index === 0 ? "active" : ""}`}
            href={`#${label.toLowerCase()}`}
            key={label}
          >
            <i className={`bi ${icon}`} />
            {label}
          </a>
        ))}
      </nav>
      <div className="sidebar-footer">
        <a className="sidebar-link" href="#threads">
          <i className="bi bi-threads" />
          Threads
        </a>
        <a className="sidebar-link" href="#menu">
          <i className="bi bi-list" />
          More
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
