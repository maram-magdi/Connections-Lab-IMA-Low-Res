let arrowR = document.getElementById('arrow-right');
let arrowL = document.getElementById('arrow-left');
let girlImg = document.getElementById('girl-image');
let textStory = document.getElementById('text-story');
let audio = new Audio("images/crunch.mp3");
// let isPageCookie = false;

arrowR.addEventListener("click", () => {

    // isPageCookie = true;
    textStory.textContent = "The cookie's fortune read:";
    girlImg.src = "images/cookie1.jpg";
    girlImg.classList.add("togImg");
    // arrowL.src = "images/arrow-left.png";
    arrowR.src = "images/empty-arrow.png";
    arrowR.style.cursor = "default";

    girlImg.addEventListener("mouseover", () => {
        girlImg.src = "images/cookie2.jpg";
        girlImg.classList.remove("togImg");
        audio.currentTime = 0.6;
        audio.play();

        girlImg.addEventListener("mouseout", () => {
            girlImg.src = "images/cookie1.jpg";
            girlImg.classList.add("togImg");
            audio.pause();
            audio.currentTime = 0;

        });
    });

    // tried to add a removeEventListener but removed the rest of it
    // { signal: controller.signal };

    // console.log(isPageCookie);

});





// arrowR.addEventListener("click", () => {

//     if (isPageCookie == false) {
//         isPageCookie = true;
//         textStory.textContent = "The cookie's fortune read:";
//         girlImg.src = "images/cookie1.jpg";
//         arrowL.src = "images/arrow-left.png";
//         arrowR.src = "images/empty-arrow.png";


//         girlImg.addEventListener("mouseover", () => {
//             girlImg.src = "images/cookie2.jpg";

//             girlImg.addEventListener("mouseout", () => {
//                 girlImg.src = "images/cookie1.jpg";
//             });
//         });


//     };

//     if (isPageCookie == true) {

//         arrowL.addEventListener("click", () => {

//             isPageCookie = false;
//             textStory.textContent = "I felt guilty for procrastinating all day, and decided to have a fortune cookie to cheer me up...";
//             girlImg.src = "images/girl-cookie.jpg";
//             arrowL.src = "images/empty-arrow.png";
//             arrowR.src = "images/arrow-right.png";



//         });
//     }

// });





// ChatGPT's answer below seemed to work - can't understand why though. The mouseover and mouseout event listeners did not follow the conditional if statement of isPageCookie == false when it was added only in the beginning of the anonymous function.


// let handleArrowR = true;  // Flag to handle or ignore arrowR events

// function handleMouseOver() {
//     if (isPageCookie) {
//         girlImg.src = "images/cookie2.jpg";
//     }
// }

// function handleMouseOut() {
//     if (isPageCookie) {
//         girlImg.src = "images/cookie1.jpg";
//     }
// }

// function handleArrowRClick() {
//     if (handleArrowR && isPageCookie === false) {
//         isPageCookie = true;
//         textStory.textContent = "The cookie's fortune read:";
//         girlImg.src = "images/cookie1.jpg";
//         girlImg.style.animation = "toggle, 1s, infinite";
//         arrowL.src = "images/arrow-left.png";
//         arrowR.src = "images/empty-arrow.png";
//         arrowR.style.cursor = "default";

//         girlImg.addEventListener("mouseover", handleMouseOver);
//         girlImg.addEventListener("mouseout", handleMouseOut);

//         // Set the flag to false to ignore future arrowR events
//         handleArrowR = false;
//     }
// }

// arrowR.addEventListener("click", handleArrowRClick);

// arrowL.addEventListener("click", () => {
//     if (isPageCookie === true) {
//         isPageCookie = false;
//         textStory.textContent = "I felt guilty for procrastinating all day, and decided to have a fortune cookie to cheer me up...";
//         girlImg.src = "images/girl-cookie.jpg";
//         arrowL.src = "images/empty-arrow.png";
//         arrowR.src = "images/arrow-right.png";

//         // Reset the flag to true to handle future arrowR events
//         handleArrowR = true;
//     }
// });