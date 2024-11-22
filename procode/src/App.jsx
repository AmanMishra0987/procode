// src/App.js
import React from "react";
import ExpertProfile from "./components/ExpertProfile";
import { expertData } from "./data/expertData";
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <ExpertProfile expert={expertData} />
    </div>
  );
}

export default App;
