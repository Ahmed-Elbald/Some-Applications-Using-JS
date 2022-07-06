let btns = document.querySelectorAll("li.tabs");
let categories = document.querySelectorAll(".all");

if (localStorage.type) {
  document.querySelector(`li[data-category= '${localStorage.type}']`).classList.add("active")
  chooseCategory(localStorage.type)
}

btns.forEach((element) => {
  element.addEventListener("click", (event) => {
    removeActice(element)
    let type = event.target.dataset["category"];
    localStorage.type = type;
    chooseCategory(type)
  })
})

function removeActice(element) {
  btns.forEach((element) => {
    element.classList.remove("active")
  });
  element.classList.add("active")
}

function chooseCategory(type) {
  categories.forEach((element) => {
    element.classList.remove("vanish", "hide");
    if (!element.classList.value.includes(type)) {
      element.classList.add("vanish");
      setTimeout(() => {
        element.classList.add("hide");
      }, 1000);
    }
  })
}

function GR(par = false) {
  if (!par) {
    return Math.trunc(Math.random() * 256)
  } else {
    return Math.trunc(Math.random() * 101)
  }
}

let randomBg = `rgb(${GR()} ${GR()} ${GR()} / ${GR(1)}%)`;

document.body.style.backgroundColor = randomBg

let toggle = document.querySelector(".toggle");
let menu = document.querySelector(".menu")

toggle.addEventListener("click", (event) => {
  if (event.target.classList.value.includes("close")) {
    menu.classList.remove("down");
    event.target.innerHTML = "<span></span>\n<span></span>\n<span></span> "
    event.target.classList.remove("close")
  } else {
    menu.classList.add("down")
    event.target.classList.add("close")
    event.target.innerHTML = "x"
  }
});

let textInput = document.getElementById("text-input");
let maxLength = textInput.attributes.getNamedItem("maxlength").value
let charsLeftBox = document.querySelector("div.input-progress > div.chars-left");
let progressBar = charsLeftBox.nextElementSibling.children[0];
console.log(charsLeftBox)

textInput.onkeyup = (event) => {
  let percentage = event.target.value.length / maxLength * 100;
  charsLeftBox.innerHTML = (maxLength - event.target.value.length) + " characters left"
  progressBar.style.width = percentage + "%";
}

let boxes = document.querySelectorAll(".boxes > .box");
let seconds = boxes[3].children[0];
let minutes = boxes[2].children[0];
let hours = boxes[1].children[0];
let days = boxes[0].children[0];
const timerData = {};

window.onload = () => {
  if (localStorage.timerData) {
    let data = JSON.parse(localStorage.timerData);
    seconds.innerHTML = data.seconds;
    minutes.innerHTML = data.minutes;
    hours.innerHTML = data.hours;
    days.innerHTML = data.days;
  }
}

timer(seconds, minutes, hours, days)

function timer(seconds, minutes, hours, days) {
  let id = setInterval(() => {
    seconds.innerHTML -= 1;
    if (seconds.innerHTML == 1) {
      setTimeout(() => {
        minutes.innerHTML -= 1;
        seconds.innerHTML = seconds.dataset.unit
      }, 1000)
    }
    if (seconds.innerHTML == 0) {
      seconds.innerHTML = seconds.dataset.unit;
    }
    if (minutes.innerHTML == 0) {
      minutes.innerHTML = minutes.dataset.unit;
      hours.innerHTML -= 1;
    }
    if (hours.innerHTML == 0) {
      hours.innerHTML = hours.dataset.unit;
      days.innerHTML -= 1;
    }
    timerData.seconds = seconds.innerHTML;
    timerData.minutes = minutes.innerHTML;
    timerData.hours = hours.innerHTML;
    timerData.days = days.innerHTML;
    localStorage.timerData = JSON.stringify(timerData);
    if (days.innerHTML == 0) {
      clearInterval(id)
    }
  }, 1000);
}
let started = false;


let targetedContainers = Array.from(document.querySelectorAll(".scrolling-symbol"));
console.log(targetedContainers)
document.onscroll = () => {
  for (x of targetedContainers) {
    let coords = x.getBoundingClientRect();
    if (coords.top < window.innerHeight - x.clientHeight && coords.top > -x.clientHeight * .25) {
      if (targetedContainers.indexOf(x) == 0) {
        for (i of x.children) {
          i.style.setProperty("--height", "100%")
          i.style.color = "black"
        }
      } else {
        if (!started) {
          for (let i of x.children) {
            let data = i.lastElementChild.dataset.unit;
            let id = setInterval(() => {
              i.lastElementChild.textContent++
              if (data == i.lastElementChild.textContent) {
                clearInterval(id)
              }
            }, 3000 / data)
          }
          started = true;
        }
      }
    } else {
      if (targetedContainers.indexOf(x) == 0) {
        for (i of x.children) {
          i.style.setProperty("--height", "0")
          i.style.color = "white"
        }
      }
    }
  }
}