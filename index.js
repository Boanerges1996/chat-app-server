const express = require("express")
const mongoose = require("mongoose")
const logger = require("morgan")
const cors = require("cors")
const app = express()
const server = require("http")
const http = server.createServer(app)

//Routers importation
const user = require("./routes/user")

// Socket IO
const io = require("socket.io")(http)
io.on("connection",(socket)=>{
    console.log(`SOCKET_ID: ${socket.id} connected`)
    socket.on("SendToAll",(msg)=>{
      console.log("Message is: "+msg)
      socket.emit("Toself",msg)
      socket.broadcast.emit("FromFriend",{...msg,sender:"not"})
    })
    
})





//Express Code
//Middlewares
app.use(express.json())
app.use(logger("dev"))
app.use(cors())


//Routes
app.use('/user',user)// Here is the route




//Mongoose database
// Settings
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost/chat-app", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Development local DB connected");
  });






const PORT = process.env.PORT || 5000
http.listen(PORT,()=>{
    console.log("Listening on port "+PORT)
})