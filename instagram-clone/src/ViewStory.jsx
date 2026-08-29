import React from "react";
import { useParams } from "react-router-dom";
 

function ViewStory() {
    const {id}=useParams();
  return <div><p>fdfad{id}</p></div>;
}

export default ViewStory;
