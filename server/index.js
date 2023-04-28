const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const { MongoClient } = require('mongodb');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const MONGO_URI = "mongodb+srv://arpittyagirocks:arpitmongo@cluster0.1accyoc.mongodb.net/?retryWrites=true&w=majority";
const DB_NAME = 'newdatabase';

let db; // Declare a global variable to store the database connection

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with id: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected: ${socket.id}`);
  });

  socket.on("login-attempt", async (data) => {
    var username=data.username;
    var password=data.password;
    console.log(username,password);
    const users = db.collection('users');

    const user = await users.findOne({ username, password });
    if (!user) {
      console.log('Invalid username or password');
      socket.emit("Wrong");
    } else {
      console.log(`Welcome, ${user.username}!`);
      socket.emit("Right");
    }
  });

    socket.on("register-attempt", async (data) => {
      var username=data.username;
      var password=data.password;
      console.log(username,password);
      const users = db.collection('users');
      await users.insertOne({ username, password }).then(()=>{
        console.log("User registered");
        socket.emit("registered");
      });
    })
});

MongoClient.connect(MONGO_URI, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to MongoDB Atlas');
    db = client.db(DB_NAME);
    server.listen(3001, () => {
      console.log("SERVER IS RUNNING..");
      console.log("listening on port %d", server.address().port);
    });
  })
  .catch((err) => {
    console.error(err);
  });
  
