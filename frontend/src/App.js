import logo from "./logo.svg";
import "./App.css";
import React, { useEffect,useState } from "react";

//client code
//let ws = new WebSocket("ws://localhost:8080");
//ws.onmessage = message => console.log(`Received: ${message.data}`);
//ws.send("Hello! I'm client")

function App() {
  const [read,setRead] = useState(true)
  useEffect(() => {
    let ws = new WebSocket("ws://localhost:8080?myCustomID=2222");
    ws.onmessage = (message) => {
      alert(message.data);
      setRead(false)
      console.log(`Received: ${message.data}`);
    };
    //ws.send("Hello! I'm client")
  }, []);

  return (
    <div className="App">
      {
        !read && <div onClick = {e => setRead(true)}>You have notification pending</div>
      }
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
