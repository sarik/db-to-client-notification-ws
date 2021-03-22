const { Client } = require("pg");
var EventEmitter = require("events");
var util = require("util");

const http = require("http");
const WebSocketServer = require("websocket").server;
let connection = null;

//create a raw http server (this will help us create the TCP which will then pass to the websocket to do the job)
const httpserver = http.createServer((req, res) =>
  console.log("we have received a request")
);

//pass the httpserver object to the WebSocketServer library to do all the job, this class will override the req/res
const websocket = new WebSocketServer({
  httpServer: httpserver,
});

httpserver.listen(8080, () =>
  console.log("My server is listening on port 8080")
);

//when a legit websocket request comes listen to it and get the connection .. once you get a connection thats it!
websocket.on("request", (request) => {
  connection = request.accept(null, request.origin);
  connection.on("open", () => console.log("Opened!!!"));
  connection.on("close", () => console.log("CLOSED!!!"));
  connection.on("message", (message) => {
    console.log(`Received message ${message.utf8Data}`);
    connection.send(`got your message: ${message.utf8Data}`);
  });

  //use connection.send to send stuff to the client
   //sendevery5seconds();
});

function sendevery5seconds() {
  connection.send(`Message ${Math.random()}`);

  setTimeout(sendevery5seconds, 5000);
}

//client code
//let ws = new WebSocket("ws://localhost:8080");
//ws.onmessage = message => console.log(`Received: ${message.data}`);
//ws.send("Hello! I'm client")

// Build and instantiate our custom event emitter
function DbEventEmitter() {
  EventEmitter.call(this);
}

util.inherits(DbEventEmitter, EventEmitter);
var dbEventEmitter = new DbEventEmitter();

// Define the event handlers for each channel name
dbEventEmitter.on("new_order", (msg) => {
  // Custom logic for reacting to the event e.g. firing a webhook, writing a log entry etc
  console.log("New order received: " + msg.orderId);
});

// Connect to Postgres (replace with your own connection string)
//client.connect('postgres://postgres:password@localhost:5432/postgres', function(err, client) {

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
      console.log(msg.channel); // foo
      console.log(msg.payload); // bar!
      if(connection)
      connection.send(`Message: ${msg.payload}`);
    });
  })
  .catch((err) => console.error("connection error", err.stack));

/* client.query("SELECT NOW()", (err, res) => {
    if (err) throw err;
    console.log(res.rows);
    client.end();
  });*/

/*client.query("SELECT NOW()", (err, res) => {
  if (err) throw err;
  console.log(res.rows);
  client.end();
});
*/
//client.query('LISTEN new_permission');
//  client.on('notification', msg => {
//    console.log(msg.channel) // foo
//    console.log(msg.payload) // bar!
//  })
