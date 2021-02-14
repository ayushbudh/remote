const express = require("express");
const app = express();
const fetch = require("node-fetch")
var server = require('http').createServer(app);
const questions = require("./my-app/src/questions");
const path = require("path")
const port = process.env.PORT || 8000;
var io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.raw());
app.use(express.text());

let users = [];
let moodsMappedWithSocketIds = [];
let chatrooms = [];


io.on('connection', function (socket) {
    console.log('client connected...');

    socket.on("online", (name) => {
        const obj = new Object();
        obj.name = name
        obj.socket = socket;
        obj.count = -1;
        users.push(obj);
    });

    socket.on('join', function (data) {
        console.log(data);
    });

    socket.on("join call", (data) => {
        roomID = data.roomID;
        const mood = data.mood;
        var otherUser = null;
        if (moodsMappedWithSocketIds[mood]) {
            otherUser = moodsMappedWithSocketIds[mood][0];
            moodsMappedWithSocketIds[mood] = moodsMappedWithSocketIds[mood].slice(1, moodsMappedWithSocketIds[mood].length);
        } else {
            moodsMappedWithSocketIds[mood] = [socket.id];
        }

        if (otherUser) {
            chatrooms[otherUser] = socket.id;
            chatrooms[socket.id] = otherUser;
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);
        }
    });

    // clearing the server variables
    socket.on("clear server", () => {
        moodsMappedWithSocketIds = [];
        chatrooms = [];
        users = [];
        console.log("Server cleared!!")
    })

    socket.on("chat", (data) => {
        socket.to(chatrooms[socket.id]).emit("chat message", data); // to the user the current user is chatting with
        socket.emit("chat message", data);  // to the current user
    })
    socket.on("error", (err) => {
        console.log("Caught server socket error: ")
    })

    socket.on("offer", payload => {
        io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", payload => {
        io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", incoming => {
        io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });
})


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'my-app', 'build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'my-app', 'build', 'index.html'));
    });
}

async function fetchMood(combinedMessage) {
    var mood = "sad";
    mood = await fetch(`https://2ce60fef6f70.ngrok.io/mood/${combinedMessage}`, {
        method: "GET",
    }).then(res => res.json()).then(res => res.response).catch(e => mood = "sad")
    console.log("MOOD IS ", mood)
    return mood;
}


// we can replace name with some kind of unique ID whch can be stored in window object of the client
async function handleMessage(message, name, combinedMessage) {
    const foundUsers = await findSocketByUser(name);
    const foundUser = foundUsers[0];
    foundUser.count++;
    if (foundUser.count === 5) {  //mocking mood found 
        // var mood = "sad";
        var mood = await fetchMood(combinedMessage)
        if (foundUser) {
            foundUser.socket.emit("set mood", mood);
        }
    }
    // return `Response ${foundUser.count}`;
    return questions[foundUser.count]

}

app.get("/", (req, res) => {
    res.send("Hi the server is open to requests!");
})

app.post("/", async (req, res) => {
    const body = JSON.parse(req.body);
    console.log("BODY IS ", body);
    const responseMessage = await handleMessage(body.message, body.user, body.combinedMessage);
    res.send(responseMessage);
})

// app.listen(8000, () => console.log("Server is started!!");
server.listen(port, () => console.log("Server is started!!"));


async function findSocketByUser(name) {
    let foundUser = null;
    foundUser = users.filter((user) => user.name == name)
    return foundUser;
}