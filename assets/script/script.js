let bot = new RiveScript();

let inputElement = document.getElementById("userInput");
let submit = document.getElementById("submit");
let output = document.getElementById("output");

let typingTimer;
let doneTypingInterval = 800;


// Load the brain.rive file 
bot.loadFile("assets/riveScript/brain.rive").then(loading_done).catch(loading_error);

inputElement.addEventListener("keyup", () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(chat, doneTypingInterval);
});

inputElement.addEventListener("keydown", () => {
    clearTimeout(typingTimer);
});



const chat = () => {
    bot.sortReplies();
    let username = "local-user";
    let input = inputElement.value
    if (input != '') {
        bot.reply(username, input).then((reply) => {
            output.innerHTML = reply;
            setTimeout(() => {
                output.innerHTML = '';
                console.log(inputElement.innerHTML);
                inputElement.innerHTML = '';
            }, 2000)
        });
    }

}

// Bouffe allergie
//Vegan 


function loading_done() {
    console.log("Brain ready");
}

// It's good to catch errors too!
function loading_error() {
    console.log("ERRRR...OR");
}