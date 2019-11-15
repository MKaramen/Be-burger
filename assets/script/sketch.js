// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/Nfm7vDBZ/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let bot = new RiveScript();

let inputElement = document.getElementById("userInput");
let submit = document.getElementById("submit");
let output = document.getElementById("output");
let body = document.querySelector("body");

let typingTimer;
let doneTypingInterval = 800;
let imgInput = false;
let count = 0;

// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
    noCanvas();
    // Create the video
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();

    // Load the brain.rive file
    bot
        .loadFile("assets/riveScript/brain.rive")
        .then(loading_done)
        .catch(loading_error);

    inputElement.addEventListener("keyup", () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(chat, doneTypingInterval);
    });

    inputElement.addEventListener("keydown", () => {
        clearTimeout(typingTimer);
    });

    inputElement.addEventListener("click", () => {
        inputElement.value = "";
    });

    inputElement.addEventListener("change", () => {
        console.log("yes");
    });
}

function draw() {
    change_input(label);
}

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
    // If there is an error
    if (error) {
        console.error(error);
        return;
    }

    // The results are in an array ordered by confidence.
    // console.log(results[0])
    if (results[0].confidence > 0.80) {
        label = results[0].label;
    }

    if (count == 0) {
        document.getElementById("loading").classList.add("none");
        count++;
    }

    // Classifiy again!
    classifyVideo();
}

const chat = () => {
    bot.sortReplies();
    let username = "local-user";
    let input = inputElement.value;
    if (input != "") {
        bot.reply(username, input).then(reply => {
            output.innerHTML = reply;
            setTimeout(() => {
                output.innerHTML = "";
                inputElement.value = "";
            }, 2000);
        });
    }
};

// Bouffe allergie
//Vegan

function loading_done() {
    console.log("Brain ready");
}

// It's good to catch errors too!
function loading_error() {}

function change_input(name_of_imput) {
    if (name_of_imput != "human") {
        inputElement.value = name_of_imput;
        chat();
    }
}
// switch (label) {
//     case "":
//         break;
//     case "location":
//         inputElement.value = "location";
//         chat();
//         label = "";
//         break;
//     case "die":
//         inputElement.value = "die";
//         label = "";
//         chat();
//         break;
//     case "kind":
//         inputElement.value = "kind";
//         label = "";
//         chat();
//         break;
// }