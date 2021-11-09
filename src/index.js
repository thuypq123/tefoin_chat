const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const http = require("http");
const path = require("path");
const app = express();
const db = require("./Database/data");
const NewRouter = require("./routes/newRouter");
const text = require('./models/message');
const conversation = require('./models/conversation');
const conversationUser = require('./models/conversationUser');
const users = require('./models/register');
const { Server } = require("socket.io")
const { JWT_SECRET } = require('./config/jwt');
require("dotenv").config();
const passport = require("passport");
app.use(passport.initialize());

const server = http.createServer(app);
const io = new Server(server, {
    cors: "*",
  })

// ------------------------------------------------------------------------------------------
db.connect();
// passport.use(localStrategy);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", NewRouter);

io.on("connection", (socket) => {
  socket.on("init", (token) => {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      emailID = decoded.sub;
      text.find((error, data) => {
        socket.emit("init", { data, emailID });
      });
    });
  });
  socket.on("sendData", ({ emailID, message, conversation }) => {
    console.log(conversation+'===='+ message);
    if (!emailID) {
      socket.emit("error", {  error: "emailID must provided!" });
    } else {
      jwt.verify(emailID, JWT_SECRET, function (err, decoded) {
        const newMessage = new text({
          text: message,
          email: decoded.sub,
          conversationId: conversation,
          createdAt: Date.now(),
        });
        socket.broadcast.emit("renderData", newMessage);
        newMessage.save();
      });
    }
  });

  //================================================================
  socket.on("searchEmail",({token, email})=> {
    users.find({email: email}, function (err, doc) {
        socket.emit("searchEmail", doc); // doc chứa toàn bộ thông tin người được tìm thấy cả pw
    });
  })
  socket.on("createConversation",({token,email}) => {
    var check = -1;
    jwt.verify(token, JWT_SECRET, async function (err, decoded) {
      conversationUser.find({userId: decoded.sub},(err, doc)=>{
        conversationUser.find({userId: email},(err, doc1)=>{
          doc.forEach(element => {
            doc1.forEach(element2 =>{
              if(element.id == element2.id)
              {
                check = 1;
                console.log(element.id + "===" + element2.id)
              }
            })
          });
          if(check == -1)
            {
              const newConversation = new conversation({
                isGroup: false,
                name: 'empty',
                status:'empty',
                createAt: Date.now(),
              })
              const newConversationUser1 = new conversationUser({
                id: (newConversation._id).toString(),
                userId: decoded.sub,
                createdAt: Date.now(),
              })
              const newConversationUser2 = new conversationUser({
                id: (newConversation._id).toString(),
                userId: email,
                createdAt: Date.now(),
              })
              newConversation.save();
              newConversationUser1.save();
              newConversationUser2.save();
              console.log("Save success");
              socket.broadcast.emit("reloadCVS",email);
            }
            else
            {
              console.log("Trung");
            }
        })
      })
    });
  })
  //======================reload CVS===============================
  socket.on("reloadCVS_2",({email,token})=>{
    jwt.verify(token, JWT_SECRET,(err,decoded)=>{
      var arr = [];
      if(email == decoded.sub){
        conversationUser.find({ userId: decoded.sub }, (err, doc) => {
          conversationUser.find({},(err, doc2)=>{
            doc2.forEach(element => {
              doc.forEach(element2 =>{
                if(element.userId != element2.userId && element.id == element2.id){
                  arr.push(element);
                }
              })
            });
            console.log(arr);
            socket.emit("renderCVS", arr);
          })
        });
      }
    })
  })
  //================================================================
  socket.on('initConversation',(token)=>{
    jwt.verify(token, JWT_SECRET, async function (err, decoded) {
      var arr = [];
      conversationUser.find({ userId: decoded.sub }, (err, doc) => {
        conversationUser.find({},(err, doc2)=>{
          doc2.forEach(element => {
            doc.forEach(element2 =>{
              if(element.userId != element2.userId && element.id == element2.id){
                arr.push(element);
              }
            })
          });
          socket.emit("renderCVS", arr);
        })
      });
    });
  })
  socket.on("readCVS",(CVSId,token)=>{
    console.log(CVSId);
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
      text.find({conversationId: CVSId},(err,doc)=>{
        socket.emit('renderDataCVS',{message:doc, email:decoded.sub});
      })
    })
  })
});

const PORT = 3500;
server.listen(process.env.PORT||PORT, () => console.log(`http://localhost:${PORT}`));
// ------------------------------------------------------------------------------------------
