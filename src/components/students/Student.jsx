import React from "react";
import { useParams } from "react-router-dom";
function Student() {
  let data = useParams();
  console.log(data);
  return <div>Single Students Info</div>;
}

export default Student;
