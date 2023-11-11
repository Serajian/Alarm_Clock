const selectMenu = document.querySelectorAll("select");
const timeBox = document.querySelector(".time");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");
const ringtone = new Audio("./files/MyRingtone.IR_1549063109_2_2255.mp3");
let alarmTime,
  alarmSet = "noset";

// making hour's options
for (let i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option vlaue="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// making minutes option
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option vlaue="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// making Time head
setInterval(updateTime, 1000);
function updateTime() {
  let date = new Date();

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timeBox.innerHTML = `${h} : ${m} : ${s}`;

  if (alarmTime == `${h} : ${m}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}

// making set Alarm Buttun
setAlarmBtn.addEventListener("click", setAlarmFunc);
function setAlarmFunc() {
  alarmTime = `${selectMenu[0].value} : ${selectMenu[1].value}`;
  if (alarmTime.includes("Hour") || alarmTime.includes("Minute")) {
    return alert("زمان هشدار را به درستی مشخص کنید!");
  }
  checkState(alarmSet);
}

function checkState(state) {
  if (alarmSet == "noset") {
    content.classList.add("disable");
    setAlarmBtn.classList.add("clear");
    setAlarmBtn.innerHTML = "Clear Alarm";
    alarmSet = "set";
  } else {
    content.classList.remove("disable");
    setAlarmBtn.classList.remove("clear");
    ringtone.pause();
    alarmSet = "noset";
    setAlarmBtn.innerHTML = "Set Alarm";
  }
}
