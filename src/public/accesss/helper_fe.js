var socket = io("http://localhost:3000")

const url = "http://emilcarlsson.se/assets/mikeross.png"
const other_url = "http://emilcarlsson.se/assets/harveyspecter.png"
const messagesUl = $("#messages")

function getUserId(socket) {
  const userId = localStorage.getItem("userId")

  if (!userId) {
    localStorage.setItem("userId", socket.id)
    return socket.id
  }

  return userId
}

function renderMessage(message, isCurrentUser) {
  const li = document.createElement("li")
  const img = document.createElement("img")
  const p = document.createElement("p")

  $(li).attr("class", isCurrentUser ? "sent" : "replies")
  $(img).attr("src", isCurrentUser ? url : other_url)
  $(p).append(message)
  $(messagesUl).append($(li).append(img).append(p))
}
//================================================================
socket.on("connect", () => {
  var token = document.cookie.split('token=')[1];
  socket.emit("init", token);

  socket.on("init", ({data,userId}) => {
    console.log(userId);
    data.forEach(message => {
      const userIdClient = userId;
      renderMessage(message.text, message.userId === userIdClient)
    })
  })

  socket.on("renderData", ({message}) => {
    renderMessage(message, false)
  })
})
//==================================================================
$(".messages").animate({ scrollTop: $(document).height() }, "fast")

$("#profile-img").click(function () {
  $("#status-options").toggleClass("active")
})

$(".expand-button").click(function () {
  $("#profile").toggleClass("expanded")
  $("#contacts").toggleClass("expanded")
})

$("#status-options ul li").click(function () {
  $("#profile-img").removeClass()
  $("#status-online").removeClass("active")
  $("#status-away").removeClass("active")
  $("#status-busy").removeClass("active")
  $("#status-offline").removeClass("active")
  $(this).addClass("active")

  if ($("#status-online").hasClass("active")) {
    $("#profile-img").addClass("online")
  } else if ($("#status-away").hasClass("active")) {
    $("#profile-img").addClass("away")
  } else if ($("#status-busy").hasClass("active")) {
    $("#profile-img").addClass("busy")
  } else if ($("#status-offline").hasClass("active")) {
    $("#profile-img").addClass("offline")
  } else {
    $("#profile-img").removeClass()
  }

  $("#status-options").removeClass("active")
})
// MESSAGE
function newMessage() {
  message = $(".message-input input").val()

  if ($.trim(message) == "") {
    return
  }
  $(
    '<li class="sent"><img src="./img/AvatarDefault.png" alt="" /><p>' +
      message +
      "</p></li>"
  ).appendTo($(".messages ul"))
  $(".message-input input").val(null)
  $(".contact.active .preview").html("<span>You: </span>" + message)
  $(".messages").animate({ scrollTop: $(document).height() }, "fast")
  var token = document.cookie.split('token=')[1];
  console.log(token)
  socket.emit("sendData", { userId: token, message })
}

$("#form").submit(function (e) {
  e.preventDefault()
  newMessage()
})

// //# sourceURL=pen.js
