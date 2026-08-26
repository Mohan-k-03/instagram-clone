import React from "react";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Suggestions from "./Suggestions";

function App() {
  return (
    <>
      <div className="d-flex  vh-100">
        <div className=" w-30">
          <Sidebar />
        </div>
        <div className=" w-50">
          <Feed/>
        </div>
        <div className="w-30"><Suggestions/></div>
      </div>
    </>
  );
}
// w-25 w-50 w-100 for width
export default App;
