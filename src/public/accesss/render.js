
const urlImgDefault = "./img/AvatarDefault.png";
let listusernameConversations = [];

const inforProfile = {
  firstname: "Võ Duy",
  lastname: "Khang",
  username: "KhangKDV",
  email: "voduykhang312001@gmail.com",
};

// Fake data conversation
const listConversations = [
  {
    conversationId: "1",
    conversationName: "Phạm Trung Tín",
    users: [
      // Mảng users không chưa userId của thằng hiện tại
      {
        userId: "1@1",
        username: "TinPham",
      },
    ],
    messages: [
      {
        content: "Hello my phờ ren",
        userId: "1@1",
        username: "TinPham",
        createdAt: "Fri Oct 25 2020 00:00:00 GMT+0700 (Giờ Đông Dương)", // Sắp xếp giảm dần
      },
    ],
    createdAt: "Fri Oct 25 2020 00:00:00 GMT+0700 (Giờ Đông Dương)",
    updatedAt: "Fri Oct 25 2020 01:00:00 GMT+0700 (Giờ Đông Dương)",
  },
  {
    conversationId: "2",
    conversationName: "Lê Văn Thắng",
    users: [
      // Mảng users không chưa userId của thằng hiện tại
      {
        userId: "2@1",
        username: "ThangLe",
      },
    ],
    messages: [
      {
        content: "Hello my phờ ren",
        userId: "2@1",
        username: "ThangLe",
        createdAt: "Fri Oct 25 2020 00:00:00 GMT+0700 (Giờ Đông Dương)", // Sắp xếp giảm dần
      },
    ],
    createdAt: "Fri Oct 25 2020 00:00:00 GMT+0700 (Giờ Đông Dương)",
    updatedAt: "Fri Oct 25 2020 01:00:00 GMT+0700 (Giờ Đông Dương)",
  },
  {
    conversationId: "3",
    conversationName: "Lê Văn Thắn",
    users: [
      // Mảng users không chưa userId của thằng hiện tại
      {
        userId: "3@1",
        username: "ThanLe",
      },
    ],
    messages: [
      {
        content: "Hello my phờ ren",
        userId: "2@1",
        username: "ThangLe",
        createdAt: "Fri Oct 25 2020 00:00:00 GMT+0700 (Giờ Đông Dương)", // Sắp xếp giảm dần
      },
    ],
    createdAt: "Fri Oct 25 2020 00:00:00 GMT+0700 (Giờ Đông Dương)",
    updatedAt: "Fri Oct 25 2020 01:00:00 GMT+0700 (Giờ Đông Dương)",
  },
];

let currentConversation = listConversations[0];




//---------------Load data------------------

const lstConversation = document.querySelector("#listConversation");
const loadConversationData = function (listConversations) {
  lstConversation.innerHTML = "";

  for (var i = 0; i < listConversations.length; i++) {
    
    const li = document.createElement("li");
    $(li).attr("class", "contact");
    if(listConversations[i] === currentConversation){
      $(li).addClass("active");
    }


    const wrap = document.createElement("div");
    $(wrap).attr("class", "wrap");
    const img = document.createElement("img");
    $(img).attr(
      "src",
      urlImgDefault
    );

    const div = document.createElement("div");
    $(div).attr("class", "meta");
    const pName = document.createElement("p");
    $(pName).attr("class", "name");
    const pPreview = document.createElement("p");
    $(pName).attr("class", "preview");

    $(pName).append(listConversations[i].conversationName);
    $(pPreview).append(listConversations[i].messages[0].content);

    $(lstConversation).append(
      $(li).append(
        $(wrap).append(img).append($(div).append(pName).append(pPreview))
      )
    );
    
  }
  $("#listConversation").children().each(function(idx, val){
    console.log(this);
    $(this).click(function () {
      currentConversation = listConversations[idx];
  
      console.log(currentConversation);
      loadConversationData(listConversations);
    })
  })
};
loadConversationData(listConversations);



// ------------------Addcontact-----------------
const addcontact = document.querySelector("#addcontact");
const listContact = document.querySelector(".list-contact");
addcontact.addEventListener("click", () => {
  listContact.innerHTML = "";
  for (var i = 0; infor.length; i++) {
    const infor_name = infor[i]["username"];
    const li = document.createElement("li");

    const img = document.createElement("img");
    $(img).attr("class", "contact-avt");
    $(img).attr("src",urlImgDefault);

    const div_contact_info = document.createElement("div");
    $(div_contact_info).attr("class", "contact-info");
    const p_name = document.createElement("p");
    $(p_name).attr("class", "contact-name");
    const p_email = document.createElement("p");
    $(p_email).attr("class", "contact-email");

    const div_contact_addFriend = document.createElement("div");
    $(div_contact_addFriend).attr("class", "contact-addFriend");
    const input = document.createElement("input");
    $(input).attr("type", "submit");
    $(input).attr("class", "btn btn-primary new-chat");
    $(input).attr("value", "New chat");

    $(input).click(function () {
      
      listusernameConversations.push(infor_name);
      listusernameConversations = Array.from(new Set(listusernameConversations))
      console.log(listusernameConversations);
    })

    $(p_name).append(infor_name);

    $(listContact).append(
      $(li)
        .append(img)
        .append($(div_contact_info).append(p_name).append(p_email))
        .append($(div_contact_addFriend).append(input))
    );
  }



  

});




// const searchUser= (token,text){

// }
const textSearch = document.querySelector(".contact-search-input");
const formSearch = document.querySelector(".form_search");
formSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  formSearch.value = "";
  setTimeout(() => {
    console.log(textSearch.value);
  }, 1000);
});

// ------Render userprofile--------------------------------
const btnSetting = document.querySelector("#settings");

const pName = document.querySelector(".profile-avt-name");
const pUsername = document.querySelector(".profile-avt-username");
const pMail = document.querySelector(".profile-avt-email");

const firstname = document.querySelector("#first-name");
const lastname = document.querySelector("#last-name");
const username = document.querySelector("#username");
const email = document.querySelector("#email");

const getUserProfile = function (inforProfile) {
  pName.innerHTML = inforProfile.firstname + " " + inforProfile.lastname;
  pUsername.innerHTML = inforProfile.username;
  pMail.innerHTML = inforProfile.email;

  firstname.value = inforProfile.firstname;
  lastname.value = inforProfile.lastname;
  username.value = inforProfile.username;
  email.value = inforProfile.email;
};

btnSetting.addEventListener("click", getUserProfile(inforProfile));
