// document.querySelector("button").addEventListener("click", respond);

// document.querySelector("button").addEventListener("click", function() {
//     alert("Hello World");
//     document.querySelector("h1").innerHTML = "I got clicked!";
//     document.querySelector("h1").style.color = "yellow";
// });

function respond() {
    alert("Hello World");
    document.querySelector("h1").innerHTML = "Good Bye";
    document.querySelector("h1").style.color = "red";
};

// // for all the buttons if i want it to show differenct messages when it is clicked then use this approach 
// for (var i = 0; i < document.querySelectorAll("button").length; i++) {
//     document.querySelectorAll("button")[i].addEventListener("click", function() {
//         var buttonInnerHTML = this.innerHTML;
//         alert(buttonInnerHTML);
//         document.querySelector("h1").innerHTML = buttonInnerHTML + " was clicked!";
//         document.querySelector("h1").style.color = "blue";
//     });
// }

// adding sound to the buttons
// document.querySelector("button").addEventListener("click", function() {
//     var audio = new Audio("sounds/tom-1.mp3");
//     audio.play();
// });

for (var i = 0; i < document.querySelectorAll("button").length; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", function() {
        var buttonInnerHtml = this.innerHTML;
        switch (buttonInnerHtml) {
            case "w":
                var audio = new Audio("sounds/tom-1.mp3");
                audio.play();
                break;
            case "a":
                var audio = new Audio("sounds/tom-2.mp3");
                audio.play();
                break;
            case "s":
                var audio = new Audio("sounds/tom-3.mp3");
                audio.play();
                break;
            case "d":
                var audio = new Audio("sounds/tom-4.mp3");
                audio.play();
                break;
            case "j":
                var audio = new Audio("sounds/snare.mp3");
                audio.play();
                break;
            case "k":
                var audio = new Audio("sounds/crash.mp3");
                audio.play();
                break;
            case "l":
                var audio = new Audio("sounds/kick-bass.mp3");
                audio.play();
                break;
            default:
                console.log(buttonInnerHtml);
        }
    });
}




