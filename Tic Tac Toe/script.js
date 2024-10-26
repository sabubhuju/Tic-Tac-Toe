let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; //player1 or player2

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

//reset the game

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("Box is clicked");
        if (turn0) {
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkwinner();
    });
});

//disable all boxes (when game ends)
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};


//enable all boxes (when game is reset)
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

//show the winner and trigger confetti
const showwinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    triggerFireworksConfetti();
};

//trigger conffetti effect
const triggerFireworksConfetti = () => {
    const end = Date.now() + 4 * 1000; // Show confetti for 4 seconds

    (function fireworks() {
        confetti({
            particleCount: 50,
            spread: 100,
            origin: { x: Math.random(), y: Math.random() }, // Random explosion points
            colors: ['#ff0', '#f00', '#0f0', '#00f', '#f0f']
        });

        if (Date.now() < end) {
            requestAnimationFrame(fireworks);
        }
    }());
};


//check if there is a winner 
const checkwinner = () => {
    for (pattern of winPatterns) {
     

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
        
                showwinner(pos1Val);
            }
        }
    }
    // Check for a draw
    const allBoxesFilled = [...boxes].every(box => box.innerText !== "");
    if (allBoxesFilled) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);


