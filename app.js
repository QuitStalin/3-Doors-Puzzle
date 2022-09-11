//Importing from HTML
var icons = [
  document.querySelector(".icon1"),
  document.querySelector(".icon2"),
  document.querySelector(".icon3"),
];
var selector = document.querySelector(".select");
var buttons = document.querySelectorAll(".button");

//Vars
var selectedDoor = null;
var badDoors = null;
var winningDoor = null;
var crossedDoor = null;
var executed = false;

//Call Functions
assign();
setWinningDoor();
setBadDoors();
console.log(icons);

//Functions
function assign() {
  let num = Math.floor(Math.random() * 3);

  if (num === 0) {
    icons[0].classList.add("winner"), icons[0].classList.remove("loser");
  } else if (num === 1) {
    icons[1].classList.add("winner");
    icons[1].classList.remove("loser");
  } else {
    icons[2].classList.add("winner");
    icons[2].classList.remove("loser");
  }
}

function setWinningDoor() {
  winningDoor = document.querySelector(".winner");
}

function setBadDoors() {
  badDoors = document.querySelectorAll(".loser");
}

function setCrossedDoor() {
  crossedDoor = document.querySelector(".crossed");
}

function selectDoor(door) {
  selectedDoor = door;

  if (door == icons[0] && door !== crossedDoor)
    selector.style.textAlign = "left";
  else if (door == icons[1] && door !== crossedDoor)
    selector.style.textAlign = "center";
  else if (door == icons[2] && door !== crossedDoor)
    selector.style.textAlign = "right";

  selector.classList.remove("hide");

  showOneLoser();

  buttons[0].disabled = false;
  buttons[1].disabled = false;
}

//This function can only be called once
var showOneLoser = (function () {
  executed = false;
  return function () {
    if (!executed) {
      executed = true;

      //picks one of the loser doors
      let picked = Math.floor(Math.random() * 2);
      if (picked == 0) picked = badDoors[0];
      else picked = badDoors[1];

      //checks if badDoors[0] was picked and is ok to cross
      if (
        picked == badDoors[0] &&
        picked !== selectedDoor &&
        picked !== winningDoor
      ) {
        badDoors[0].innerHTML = "❌";
        badDoors[0].classList.add("crossed");
      }

      //checks if badDoors[1] was picked and is ok to cross
      else if (badDoors[1] !== selectedDoor && picked !== winningDoor) {
        badDoors[1].innerHTML = "❌";
        badDoors[1].classList.add("crossed");
      }

      //in case badDoors[1] was picked but it isn't ok to cross
      else {
        badDoors[0].innerHTML = "❌";
        badDoors[0].classList.add("crossed");
      }

      setCrossedDoor();
    }
  };
})();

function chooseDoor() {
  if (selectedDoor == winningDoor) {
    rem();
    win();
  } else {
    rem();
    lose();
  }
}

function rem() {
  icons[0].classList.add("hide");
  icons[2].classList.add("hide");
  selector.classList.add("hide");
  icons[0].onclick = null;
  icons[1].onclick = null;
  icons[2].onclick = null;
}

function win() {
  icons[1].innerHTML = "WINNER";
  icons[1].classList.add("win");
}

function lose() {
  icons[1].innerHTML = "LOSER";
  icons[1].classList.add("lose");
}

/* 
  function reset() {

  icons[0].classList.remove("hide");
  icons[2].classList.remove("hide");

  icons[0].classList.remove("winner");
  icons[1].classList.remove("winner");
  icons[2].classList.remove("winner");

  icons[0].classList.remove("crossed");
  icons[1].classList.remove("crossed");
  icons[2].classList.remove("crossed");

  icons[0].innerHTML = "🚪";
  icons[1].innerHTML = "🚪";
  icons[2].innerHTML = "🚪";

  icons[0].onclick = selectDoor(icons[0]);
  icons[1].onclick = selectDoor(icons[1]);
  icons[2].onclick = selectDoor(icons[2]);

  icons[1].classList.remove("win");
  icons[1].classList.remove("lose");

  var selectedDoor = null;
  var badDoors     = null;
  var winningDoor  = null;
  var crossedDoor  = null;

  buttons[0].disabled = true;
  buttons[1].disabled = true;
  
  console.log(selectedDoor,badDoors,winningDoor,crossedDoor,icons);

  assign();
  setWinningDoor();
  setBadDoors();

  console.log(selectedDoor,badDoors,winningDoor,crossedDoor,icons);

}

*/
