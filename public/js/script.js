const img = document.getElementById("slide");
const dot_container = document.querySelectorAll(
  ".dots .material-symbols-outlined"
);
const poster = document.querySelector(".poster");
const donate_btn = document.getElementById("donate-btn");
let v = 1;
// Get the slider element

console.log("hiii");

var revelance = () => {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var w_height = window.innerHeight;
    var revealtop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 150;
    if (revealtop < w_height - revealpoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
};
window.addEventListener("scroll", revelance);
const imagechanger = () => {
  if (v == 7) v = 0;
  dot_container.forEach((dot) => {
    dot.innerText = "radio_button_unchecked";
  });
  dot_container[v].innerText = "radio_button_checked";
  ++v;
  img.setAttribute("src", "./images/" + v + ".jpg");
};

window.addEventListener("load", function () {
  setTimeout(function () {
    document.querySelector(".h3-bg-image-text").classList.add("loaded");
  }, 100);
  setTimeout(function () {
    document
      .querySelector(".bg-image-text-container p")
      .classList.add("loaded");
  }, 300);
  setTimeout(function () {
    document.querySelector(".btn-bg-img-text").classList.add("loaded");
  }, 500);
});

function incrementCounterOne() {
  var counter = 0;
  var target = 200;
  var increment = 1;
  var intervalTime = 10; // Interval time in milliseconds

  var timer = setInterval(function () {
    if (counter >= target) {
      clearInterval(timer);
      document.querySelector(".reveals-1").textContent = "200+";
    } else {
      counter += increment;
      document.querySelector(".reveals-1").textContent = counter;
    }
  }, intervalTime);
}

function incrementCounterTwo() {
  var counter = 0;
  var target = 1000;
  var increment = 1;
  var intervalTime = 10; // Interval time in milliseconds

  var timer = setInterval(function () {
    if (counter >= target) {
      clearInterval(timer);
      document.querySelector(".reveals-2").textContent = "1000+";
    } else {
      counter += increment + 5;
      document.querySelector(".reveals-2").textContent = counter;
    }
  }, intervalTime);
}

function incrementCounterThree() {
  var counter = 0;
  var target = 2300;
  var increment = 1;
  var intervalTime = 5;

  var timer = setInterval(function () {
    if (counter >= target) {
      clearInterval(timer);
      document.querySelector(".reveals-3").textContent = "2300+";
    } else {
      counter += increment + 5;
      document.querySelector(".reveals-3").textContent = counter;
    }
  }, intervalTime);
}

function incrementCounterFour() {
  var counter = 0;
  var target = 50;
  var increment = 1;
  var intervalTime = 50; // Interval time in milliseconds

  var timer = setInterval(function () {
    if (counter >= target) {
      clearInterval(timer);
      document.querySelector(".reveals-4").textContent = "50+";
    } else {
      counter += increment;
      document.querySelector(".reveals-4").textContent = counter;
    }
  }, intervalTime);
}

window.onload = function () {
  incrementCounterOne();
  incrementCounterTwo();
  incrementCounterThree();
  incrementCounterFour();
};

document.addEventListener("DOMContentLoaded", function () {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const main = document.getElementById("main");

  signUpButton.addEventListener("click", () => {
    main.classList.add("right-panel-active");
  });
  signInButton.addEventListener("click", () => {
    main.classList.remove("right-panel-active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  const successMessage = document.querySelector(".successregister");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(registerForm);
    const res = Object.fromEntries(formData);
    const payload = JSON.stringify(res);
    console.log(payload);
    try {
      const response = await fetch("/register", {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.ok);

      if (response.ok) {
        successMessage.style.display = "block"; // Show success message
        registerForm.reset();
        window.location.href = "/"; // Reset the form fields
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  //  login
  const login = document.getElementById("login");

  login.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(login);
    const res = Object.fromEntries(formData);
    const payload = JSON.stringify(res);
    console.log(payload);
    try {
      const response = await fetch("/login", {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.ok);
      window.location.href = "/"; // Reset the form fields
    } catch (error) {
      console.error("Error:", error);
    }
  });
});

donate_btn.addEventListener("click", function (e) {
  window.location.href = "/donate";
});
