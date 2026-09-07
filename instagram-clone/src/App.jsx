import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Suggestions from "./Suggestions";

function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar-column">
        <Sidebar />
      </aside>
      <section className="feed-column">
        <Feed />
      </section>
      <aside className="suggestions-column">
        <Suggestions />
      </aside>
    </main>
  );
}
export default App;
