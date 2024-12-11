import React, { useState } from "react";
import "./App.css";

function App() {
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState("");

  const handleCommand = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });
      const data = await response.json();
      setOutput(data.output || data.error);
    } catch (error) {
      setOutput("Error connecting to backend");
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Web-Based Linux Terminal</h1>
      <textarea
        rows="4"
        cols="50"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter your command"
        className="command-input"
      />
      <button onClick={handleCommand} className="run-button">
        Run Command
      </button>
      <pre className="output-display">{output}</pre>
    </div>
  );
}

export default App;
