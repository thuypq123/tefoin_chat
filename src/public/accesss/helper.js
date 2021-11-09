var socket = io();
const url = "http://emilcarlsson.se/assets/mikeross.png";
const other_url = "http://emilcarlsson.se/assets/harveyspecter.png";
const messagesUl = $("#messages");
var token = readCookie('token')
var conversation =  readCookie('conversation');
function getUserId(socket) {
  const emailID = localStorage.getItem("emailID");

  if (!emailID) {
    localStorage.setItem("emailID", socket.id);
    return socket.id;
  }

  return emailID;
}

function renderMessage(message, isCurrentUser) {
  const li = document.createElement("li");
  const img = document.createElement("img");
  const p = document.createElement("p");

  $(li).attr("class", isCurrentUser ? "sent" : "replies");
  $(img).attr("src", isCurrentUser ? "https://i.stack.imgur.com/l60Hf.png" : 'https://i.stack.imgur.com/l60Hf.png');
  $(p).append(message);
  $(messagesUl).append($(li).append(img).append(p));
}
//================================================================
socket.on("connect", () => {
  console.log("a user connect server");


  socket.emit("init", token);
  socket.emit("initConversation", token);
  socket.on("init", ({ data, emailID }) => {
    data.forEach((element) => {
      const userIdClient = emailID;
      if(element.conversationId === readCookie('conversation'))
      {
        var check = element.email == userIdClient
        renderMessage(element.text,check);
      }
    });
  });

  socket.on("renderData", (message) => {
    document.getElementById(message.conversationId).style.backgroundColor = "#a86aea"
    console.log(message);
    if(message.conversationId === readCookie('conversation'))
    renderMessage(message.text, message.emailID === getUserId(socket));
  });
});
//==================================================================
// $(".messages").animate({ scrollTop: $(document).height() }, "fast");

$("#profile-img").click(function () {
  $("#status-options").toggleClass("active");
});

$(".expand-button").click(function () {
  $("#profile").toggleClass("expanded");
  $("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function () {
  $("#profile-img").removeClass();
  $("#status-online").removeClass("active");
  $("#status-away").removeClass("active");
  $("#status-busy").removeClass("active");
  $("#status-offline").removeClass("active");
  $(this).addClass("active");

  if ($("#status-online").hasClass("active")) {
    $("#profile-img").addClass("online");
  } else if ($("#status-away").hasClass("active")) {
    $("#profile-img").addClass("away");
  } else if ($("#status-busy").hasClass("active")) {
    $("#profile-img").addClass("busy");
  } else if ($("#status-offline").hasClass("active")) {
    $("#profile-img").addClass("offline");
  } else {
    $("#profile-img").removeClass();
  }

  $("#status-options").removeClass("active");
});

function newMessage() {
  message = $(".message-input input").val();

  if ($.trim(message) == "") {
    return;
  }
  $(
    '<li class="sent"><img src="https://i.stack.imgur.com/l60Hf.png" alt="" /><p>' +
      message +
      "</p></li>"
  ).appendTo($(".messages ul"));
  $(".message-input input").val(null);
  $(".contact.active .preview").html("<span>You: </span>" + message);
  // $(".messages").animate({ scrollTop: $(document).height() }, "fast");
  
  socket.emit("sendData", { emailID: token, message, conversation: conversation});
}

$("#form").submit(function (e) {
  e.preventDefault();
  newMessage();
});
// //# sourceURL=pen.js
// ================================
var emailSearch;
var btnSearch = document.querySelector(".btn-search");
btnSearch.addEventListener("click", function(e){
  e.preventDefault();
  var email = document.querySelector(".contact-search-input").value;
  console.log(email);
  socket.emit("searchEmail",{token: token, email: email})
})
socket.on('searchEmail',(email)=>{
  emailSearch = email;
  console.log(emailSearch);
  if(emailSearch.length != 0)
  {
    var html =  `<li>
    <img
      class="contact-avt"
      src="https://i.stack.imgur.com/l60Hf.png"
      alt=""
    />

    <div class="contact-info">
      <p class="contact-name">${emailSearch[0].email}</p>
      <p class="contact-email">${emailSearch[0].email}</p>
    </div>

    <div class="contact-addFriend">
      <input
        type="button"
        class="btn btn-secondary create"
        value="Create chat"
        data-toggle="modal"
        data-target="#createChatModal"
      />
    </div>
    </li>`
}
else{
  html = `<div class="alert">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
  <strong>Thông báo!</strong> Không Tìm Thấy Người Dùng Này
  </div>`;
  document.querySelector("ul.list-contact").innerHTML = html;
  return 0;
}
document.querySelector("ul.list-contact").innerHTML = html;
createClick();
})
const createClick = ()=>{
  document.querySelector(".create").addEventListener("click", (e)=>{
    e.preventDefault();
    var email = document.querySelector(".contact-search-input").value;
    socket.emit('createConversation',({token:token, email:email}))
    
    setTimeout(function(){
      location.reload();
    },1500);
  })
}

//============================================================================
socket.on("renderCVS", (doc) => {
  var html = ``;
  doc.map((element) => {
    if(readCookie('conversation') === element.id)
    {
      var name = element.userId.split('@')[0];
      console.log(name);
      var showname = document.querySelector(".showname");
      showname.textContent = name;
      html =
        html +
        ` <li class="contact active" id= ${element.id}  >
                      <img
                        src="https://i.stack.imgur.com/l60Hf.png""
                        alt=""
                        style=" width: 50px; margin: 0px 0px -12px 0px; height: 50px; padding: 5px 5px; display: inline-block; border-radius: 50%"
                      />
                      <div class="meta" style = "display:inline-block ">
                        <p class="name" style = "display:inline-block">${element.userId}</p>
                        
                      </div>
                    </li>`;
    }else {
      html =
        html +
        ` <li class="contact" id= ${element.id}  >
                      <img
                        src="https://i.stack.imgur.com/l60Hf.png""
                        alt=""
                        style=" width: 50px; margin: 0px 0px -12px 0px; height: 50px; padding: 5px 5px; display: inline-block; border-radius: 50%"
                      />
                      <div class="meta" style = "display:inline-block ">
                        <p class="name" style = "display:inline-block">${element.userId}</p>
                       
                      </div>
                    </li>`;
    }
    console.log(readCookie('conversation') +"==="+ element.id);
           
  });
  var ul = document.querySelector("#contact-ul");
  ul.innerHTML = html;
  var listClass = document.querySelectorAll(".contact");
  for (var i = 0; i < listClass.length; i++) {
    listClass[i].addEventListener("click", (e) => {
      if(e.target.id.trim()!='')
      {
        document.cookie = `conversation = ${e.target.id}`;
        // setCookie('conversation', e.target.id, 30);
        socket.emit('readCVS',e.target.id,token);
        // document.querySelector("ul#messages").innerHTML = '';
        location.reload();
      }

    });
  }
  
});

socket.on('renderDataCVS',({message, email}) =>{
  //console.log(message.email +'+'+email +'='+ message.email === email);
  message.forEach(element=>{
    renderMessage(element.text, element.email === email);
  })
  //renderMessage(message, message.emailID === getUserId(socket));
})
//============================================================================
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
//===============================Reload CVS===============================//
socket.on("reloadCVS",email =>{
  var token = readCookie('token')
  console.log(email);
  console.log(token);
  socket.emit("reloadCVS_2",{email, token})
})
//===============================GLOBAL========================================4
var ulGlobal = document.querySelector("ul#contact-ul1");
ulGlobal.addEventListener("click", function(){
  document.cookie = `conversation = Tefoin`;
  location.reload();
})
//===============================