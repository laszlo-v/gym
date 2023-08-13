"use strict";
const nav = document.querySelector("nav");
const navUl = document.querySelector(".nav-ul");
const hamContainerOuter = document.querySelector(".ham-container-outer");
const hamContainerInner = document.querySelector(".ham-container-inner");
const lightDark = document.querySelector(".light-dark");
const lightDarkSpan = document.querySelector(".light-dark-cover");
const videoContainer = document.querySelector(".video-container");
const main = document.querySelector(".container");
const scrollToTop = document.querySelectorAll(".scroll-to-top");
const scrollToTopArray = Array.prototype.slice.call(scrollToTop);
let slides = document.querySelectorAll(".mySlides");
let dots = document.querySelectorAll(".dots");
const dotsArray = Array.prototype.slice.call(dots);
const carouselContainer = document.querySelector(".carousel-container");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
// Check darkmode value in localStorage
let isDarkMode = localStorage.getItem("darkMode") === "true";

// If the value is true - add classname to body
if (isDarkMode) {
  document.body.classList.add("darkmode-on");
}

// Check darkmode value when page loads
window.addEventListener("load", () => {
  if (isDarkMode) {
    document.body.classList.add("darkmode-on");
    lightDarkSpan.classList.add("dark-active");
  }
});

hamContainerOuter.addEventListener("click", () => {
  navUl.classList.toggle("nav-active");
  nav.classList.toggle("nav-active");
});
hamContainerInner.addEventListener("click", () => {
  navUl.classList.toggle("nav-active");
  nav.classList.toggle("nav-active");
});

// Handling the click event, localStorage
lightDark.addEventListener("click", () => {
  lightDarkSpan.classList.toggle("dark-active");
  document.body.classList.toggle("darkmode-on");
  if (document.body.classList.contains("darkmode-on")) {
    localStorage.setItem("darkMode", "true");
  } else {
    localStorage.setItem("darkMode", "false");
  }
});

videoContainer
  ? videoContainer.addEventListener("click", () => {
      navUl.classList.contains("nav-active")
        ? navUl.classList.remove("nav-active")
        : "";
      nav.classList.contains("nav-active")
        ? nav.classList.remove("nav-active")
        : "";
    })
  : "";

main.addEventListener("click", () => {
  navUl.classList.contains("nav-active")
    ? navUl.classList.remove("nav-active")
    : "";
  nav.classList.contains("nav-active")
    ? nav.classList.remove("nav-active")
    : "";
});

/************************* testimonials *********************/
let slideIndex = 0;

// Next-previous control
const nextSlide = () => {
  slideIndex++;
  showSlides();
  timer = _timer; // reset timer
};

const prevSlide = () => {
  slideIndex--;
  showSlides();
  timer = _timer;
};

// Thumbnail image controlls
const currentSlide = (n) => {
  slideIndex = n - 1;
  showSlides();
  timer = _timer;
};

const showSlides = () => {
  // adding some security
  if (slides.length > 0) {
    if (slideIndex > slides.length - 1) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;

    // hide all slides
    slides.forEach((slide) => {
      slide.style.display = "none";
    });

    // show one slide base on index number
    slides[slideIndex].style.display = "block";

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    dots[slideIndex].classList.add("active");

    dotsArray.forEach((e, i) => {
      e.addEventListener("click", () => {
        currentSlide(i + 1);
      });
    });
  }
};
next ? next.addEventListener("click", nextSlide) : "";
prev ? prev.addEventListener("click", prevSlide) : "";
showSlides();
// autoplay slides
let timer = 30; // sec
const _timer = timer;

// this function runs every 1 second
setInterval(() => {
  timer--;

  if (timer < 1) {
    nextSlide();
    timer = _timer; // reset timer
  }
}, 1000); // 1sec

// to stop on mouse enter
const stopSlider = () => {
  timer = 1000000;
};

// to start again on mouse leave
const startSlider = () => {
  timer = _timer;
};
carouselContainer
  ? carouselContainer.addEventListener("mouseenter", stopSlider)
  : "";
carouselContainer
  ? carouselContainer.addEventListener("mouseleave", startSlider)
  : "";
/************************** scroll to top ****************/

window.onscroll = () => {
  if (pageYOffset >= 500) {
    scrollToTopArray.forEach((e) => {
      e.style.cssText = "visibility: visible";
    });
  } else {
    scrollToTopArray.forEach((e) => {
      e.style.cssText = "visibility: hidden";
    });
  }
};

scrollToTopArray.forEach((e) => {
  e.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

/*********************** turning tab off when nav is not active ********/
/** some of the logic could be in a window.resize event   */
/*
Could be optimized further but this way it is more understandable - I believe
*/
if (window.innerWidth < 768 && !nav.classList.contains("nav-active")) {
  document.querySelector(".logo-single").tabIndex = -1;
  const navItems = document.querySelectorAll(".nav-items li a");
  navItems.forEach((e) => {
    e.tabIndex = -1;
  });
  document.querySelector(".light-dark").tabIndex = -1;
  document.querySelector(".ham-container-inner").tabIndex = -1;
} else if (window.innerWidth < 768 && nav.classList.contains("nav-active")) {
  document.querySelector(".logo-single").tabIndex = 0;
  const navItems = document.querySelectorAll(".nav-items li a");
  navItems.forEach((e) => {
    e.tabIndex = 0;
  });
  document.querySelector(".light-dark").tabIndex = 0;
  document.querySelector(".ham-container-inner").tabIndex = 0;
}
document.querySelector(".ham-container-outer").addEventListener("click", () => {
  if (nav.classList.contains("nav-active")) {
    document.querySelector(".logo-single").tabIndex = 0;
    const navItems = document.querySelectorAll(".nav-items li a");
    navItems.forEach((e) => {
      e.tabIndex = 0;
    });
    document.querySelector(".ham-container-inner").tabIndex = 0;
    document.querySelector(".light-dark").tabIndex = 0;
  } else if (!nav.classList.contains("nav-active")) {
    document.querySelector(".logo-single").tabIndex = -1;
    const navItems = document.querySelectorAll(".nav-items li a");
    navItems.forEach((e) => {
      e.tabIndex = -1;
    });
    document.querySelector(".light-dark").tabIndex = -1;
    document.querySelector(".ham-container-inner").tabIndex = -1;
  }
});
document.querySelector(".ham-container-inner").addEventListener("click", () => {
  document.querySelector(".light-dark").tabIndex = -1;
});
