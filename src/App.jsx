import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Students from "./components/students/Students";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/students">
          <Route index element={<Students />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
