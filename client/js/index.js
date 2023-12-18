const firebaseConfig = {
  apiKey: "AIzaSyDtiovFL12FPPHycwDfMOaBtDyQEphZ2nU",
  authDomain: "osama-53dd7.firebaseapp.com",
  projectId: "osama-53dd7",
  storageBucket: "osama-53dd7.appspot.com",
  messagingSenderId: "985209493616",
  appId: "1:985209493616:web:b8cf6d3cbd8819e6c03cb5"
};
firebase.initializeApp(firebaseConfig);

// Get a reference to  RealTime Database service
const database = firebase.database();

let login = document.getElementById("login");
let signUp = document.querySelector(".signUp");
let loteFile = document.querySelector(".loteFile");
let myform = document.querySelector(".myform");
let body = document.querySelector("body");
let regester = document.querySelector(".regester");
let loading = document.querySelector(".loading");
let loginpage = document.querySelector(".loginpage");

const correct = document.querySelector(".correct");
const close = document.querySelector(".close");
const Message = document.querySelector(".error-message");

// smarttechminya@gmail.com
// oak_2030

// button log in to redirect page adding room
loginpage.addEventListener("click", (e) => {
  e.preventDefault();
  const email = myform.email.value;
  const password = myform.password.value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // تم تسجيل الدخول بنجاح
      myform.email.value = "";
      myform.password.value = "";

      // قم بتوجيه المستخدم إلى صفحة إضافة الغرفة هنا
      window.location.href = "client/Pages/AddNewRooms.html";
    })
    .catch((error) => {
      // حدث خطأ أثناء تسجيل الدخول
      const errorCode = error.code;

      const errorMessage = error.message;

      Message.innerHTML = errorMessage;
      correct.style.transform = "scale(1)";
    });
});

close.addEventListener("click", (e) => {
  e.preventDefault();
  correct.style.transform = "scale(0)";
});
