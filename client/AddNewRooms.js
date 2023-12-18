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


let addRoom = document.querySelector(".addRoom");
let contentAddRoom = document.querySelector(".contentAddRoom");
let close = document.querySelector(".close");


// initialization variables to use later
let nameRoom     = document.getElementById("nameRoom");
let imageRoom    = document.getElementById("imageRoom");
let addNewRoom   = document.querySelector(".addNewRoom");
let contentRooms = document.querySelector(".contentRooms");
let body         = document.querySelector("body");




async function addNewRoomInFirebase() {
  // استلام القيم من حقول الإدخال لاسم الغرفة وصورة الغرفة
  const nameRoomValue = nameRoom.value;
  const imageRoomValue = imageRoom.value;

  try {
    const response = await fetch('https://osama-53dd7-default-rtdb.firebaseio.com/Rooms.json');
    const responseData = await response.json();

    // حساب الـ index الجديد بناءً على عدد الغرف الموجودة حاليًا
    let index = 0;
    if (responseData) {
      index = Object.keys(responseData).length;
    }

    // إضافة الغرفة الجديدة
    await fetch(`https://osama-53dd7-default-rtdb.firebaseio.com/Rooms/${index}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: nameRoomValue,
        image: imageRoomValue,
        devices: [],
        devicesPush: [],
        id:JSON.stringify(index)
      }),
    });

    DisplayData();
    console.log('تمت إضافة الغرفة بنجاح');
  } catch (error) {
    console.error('فشل في إضافة الغرفة:', error.message);
  }
}

function DisplayData() {
  // إنشاء طلب HTTP
  const request = new XMLHttpRequest();
  request.open('GET', 'https://osama-53dd7-default-rtdb.firebaseio.com/Rooms.json');

  // إرسال الطلب
  request.send();

  // إضافة معالج لاستجابة الطلب
  request.onload = function () {
    if (request.status === 200) {
      // تحويل البيانات إلى كائن JSON
      const data = JSON.parse(request.responseText);
console.log(data)
      // حذف جميع العناصر الحالية
      contentRooms.innerHTML = '';

      Object.values(data).forEach(room => {
        if(room){
          let card = `
          <div class="card border-0 p-3 m-2 text-center" style="background-image: url(../images/${room.image}.jpg);">
        
            <h3 class="mt-3 mb-3 room__title">${room.Name}</h3>
            <button class="btn btn-warning visit">فتح الغرفة</button>
            <span style="opacity: 0">${room.id}</span>
          </div>
        `;
        console.log(room.id)
        contentRooms.innerHTML += card;
        }
    
      });
    } else {
      // رسالة خطأ في حالة فشل الطلب
      alert('حدث خطأ أثناء استرداد بيانات الغرف');
    }
  };
}
// calling function display during loading Page
window.onload = DisplayData();

// this is container for all Rooms
contentRooms.addEventListener("click", (e) => {
  
  // the Element that contains classes : ( card  border-0   p-3 m-2   text-center )


  if (e.target.classList == "btn btn-warning visit") {

    // Fetching room data via this current element on which the event takes place
    const nameImage = e.target.parentElement.style.backgroundImage
    const nameRoom =
    e.target.parentElement.lastElementChild.previousElementSibling.previousElementSibling
    .innerHTML

    // Encrypt the data and send it to the home page in the url
    const encodedImage = encodeURIComponent(nameImage);
    const encodedName = encodeURIComponent(nameRoom);
    // path Home Page
    const url = 
      "ShowMyRooms.html?nameRoom=" +
      encodedName +
      "&nameImage=" +
      encodedImage;
    window.location.href = url;
  }

    // the Element that contains classes : ( fa-solid  fa-xmark  deletbtnThisRoom )
  if (e.target.classList == "fa-solid fa-trash-can deletbtnThisRoom") {
  
    // uid is id that use to delete this Room 
    let uid = e.target.parentElement.lastElementChild.innerHTML
    // passing uid in function to delete this Room

    deleteRoom(uid)
  

   }




})





let setting = document.querySelector(".setting")
let updateSetting = document.querySelector(".updateSetting")
let closeSetting = document.querySelector(".closeSetting")
let inputuserNameWifi = document.getElementById("inputuserNameWifi")
let inputPasswordWifi = document.getElementById("inputPasswordWifi")
let updateData = document.querySelector(".updateData")
let saveData = document.querySelector(".saveData")

setting.addEventListener("click", () => {
  updateSetting.style.top = "0";

  const userCurrent = firebase.auth().currentUser;
  if (userCurrent) {
    const uid = userCurrent.uid;

    firebase
      .database()
      .ref('users/' + uid)
      .once('value')
      .then((snapshot) => {
        const data = snapshot.val();

        const nameUser = data.usernamewifi;
        const passUser = data.passwordwifi;

        inputuserNameWifi.value = nameUser;
        inputPasswordWifi.value = passUser;
      });
  }
});

updateData.addEventListener("click",()=>{
  inputuserNameWifi.value=""
  inputPasswordWifi.value=""
  inputuserNameWifi.focus()
})

saveData.addEventListener("click",()=>{
  const userCurrent = firebase.auth().currentUser;

  if (userCurrent) {
    const uid = userCurrent.uid;

    const nameUser = inputuserNameWifi.value;
    const passUser = inputPasswordWifi.value;

    const userRef = firebase.database().ref('users/' + uid);
    userRef.update({
      usernamewifi: nameUser,
      passwordwifi: passUser
    })
    .then(() => {
      console.log("تم تحديث البيانات بنجاح");
      inputuserNameWifi.value=""
      inputPasswordWifi.value=""
    })
    .catch((error) => {
      console.log("حدث خطأ أثناء تحديث البيانات:", error);
    });
  }
})

closeSetting.addEventListener("click",()=>{
  updateSetting.style.top="-80%"
})


