const { Client } = require("pg");
var url = require('url');
var url = require("url");
var WebSocketServer = require("ws").Server,
wss = new WebSocketServer({ port: 8080 });

var connections = {};
//var connectionIDCounter = 0;

wss.on("connection",  (ws, req) => {
  const parameters = url.parse(req.url, true);
  //ws.id = parameters.query.myCustomID;]

  //mapping websocket connection to client id
  ws.id = parameters.query.myCustomID;

  //TODO:Websocket connection id is mapped to client Id.
  //There the one with the latest websocket connection wins
  //TODO:Create a linked list for connections[parameters.query.myCustomID] to hold multiple connections for a customer id
  connections[parameters.query.myCustomID] = ws;

  console.log(ws.id)
  
  console.log(new Date() + " Connection ID " + ws.id + " accepted.");

  ws.on("open", () => console.log("Opened!!!"));
  ws.on("close", function (reasonCode, description) {
    console.log(
      new Date() +
        " Peer " +
        ws.remoteAddress +
        " disconnected. " +
        "Connection ID: " +
        ws.id
    );

    // Make sure to remove closed connections from the global pool
    delete connections[ws.id];
  });
  ws.on("message", (message) => {
    console.log(`Received message ${message.utf8Data}`);
    ws.send(`got your message: ${message.utf8Data}`);
  });

  //use connection.send to send stuff to the client
  //sendevery5seconds();
});

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
});



client
  .connect()
  .then(() => {
    console.log("connected");

    client.query("LISTEN new_permission");
    client.on("notification", (msg) => {
      //console.log(msg.channel); // foo
      console.log(msg.payload); // bar!
     // if (connection) connection.send(`Message: ${msg.payload}`);
     
     //sendToConnectionId(2222,`Message: ${msg.payload}`);
     //data refers to actual notification
     const {client,msg:data} = JSON.parse(msg.payload)
     sendToConnectionId(client,`Message: ${data}`);
    });
  })
  .catch((err) => console.error("connection error", err.stack));



  function sendToConnectionId(connectionID, data) {
    console.log(data,"Sending to ::",connectionID)
    var connection = connections[connectionID];
    
    
    
    //if (connection && connection.connected) {
    if (connection) {
      console.log("Sent ::",connectionID)
      connection.send(data);
    }
    else {
      console.log("Sent failed ::",connectionID)
    }
  }
