import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";

//client code
//let ws = new WebSocket("ws://localhost:8080");
//ws.onmessage = message => console.log(`Received: ${message.data}`);
//ws.send("Hello! I'm client")

function App() {
  useEffect(() => {
    let ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (message) => {
      alert(message.data);
      console.log(`Received: ${message.data}`);
    };
    //ws.send("Hello! I'm client")
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
