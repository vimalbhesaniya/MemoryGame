alert("Start Game")
const allICONS = [
    "fa-brands fa-twitter",
    "fa-solid fa-camera-retro",
    "fa-solid fa-heart",
    "fa-solid fa-bell",
    "fa-solid fa-bookmark",
    "fa-solid fa-wifi",
    "fa-brands fa-whatsapp",
    "fa-brands fa-google-play",
];

const memoryState = {
    iconContainer: document.getElementById("memoryContainer"),
    restartButton: document.getElementById("restartButton"),
    clickedIcons: [],
    handledIconsId: [],
    resultState: [],
    shuffledIcons: [],
    minutes: 0,
    time: null,
    moves: 26,
    second: 0,
    timerContainer: document.getElementById("timer"),
    movesContainer: document.getElementById("moves"),
    countState: true,
};

let {
    timerContainer,
    movesContainer,
    clickedIcons,
    handledIconsId,
    restartButton,
    iconContainer,
    resultState,
    shuffledIcons,
    minutes,
    moves,
    second,
    time,
    countState,
} = memoryState;

const hideIcons = () => {
    document.querySelectorAll(".iconContainer").forEach((element) => {
        element.classList.add("disabledIcons");
    });
};

const clearStates = () => {
    clickedIcons = [];
    handledIconsId = [];

};

const clearTimeAfterGameIsOver = () => {
    second = 0;
    minutes = 0;
    moves = 26;
    handleMoves();
};

let handleMoves = () => {
    let newMove = moves--;
    movesContainer.innerHTML = newMove;
};

let handleHiddenButtons = (status) => {
    document.querySelectorAll(".hiddenButton").forEach((button) => {
        if (status) {
            button.setAttribute("disabled", true);
        }
        else {
            button.removeAttribute("disabled");
        }
    });
};

const checkExpiry = () => {
    if (moves == 0 || (minutes == 0 && second == 60)) {
        alert("Game is Over");
        resetGame();
        handleHiddenButtons(true);
        resultState = [];
        return false;
    } else if (resultState.length == 8) {
        alert(`You did it! in ${second}s with ${25 - moves} moves`);
        resetGame();
        resultState = [];
        return false;
    } else {
        return true;
    }
};

const counter = () => {
    time = setInterval(() => {
        if (!checkExpiry()) {
            clearTimeAfterGameIsOver();
            clearTimeout(time);
        }
        {
            timerContainer.innerHTML = `${minutes}:${second <= 9 ? "0" + second++ : second++}`;
        }
        if (second == 61) {
            second = 0;
            clearInterval(time);
            minutes++;
            counter();
        }
    }, 1000);
};

const handleIcons = (icon, id) => {
    checkExpiry();
    const button = document.getElementById(id);
    button.setAttribute("disabled", true);
    const iconElement = document.getElementById(`icon${id}`);
    iconElement.classList.remove("disabledIcons");
    clickedIcons.push({ icon, id });
    if (clickedIcons.length === 2) {
        const [first, second] = clickedIcons;
        if (first.icon === second.icon) {
            resultState = [...resultState, first.id];
            document.querySelectorAll(`.${icon.split(" ")[1] + 1}`).forEach((e) => {
                e.classList.add("activeAfterMatch");
            });
            clearStates();
        } else {
            handleMoves();
            setTimeout(() => {
                clickedIcons.forEach((clicked) => {
                    document.getElementById(clicked.id).removeAttribute("disabled");
                    document
                        .getElementById(`icon${clicked.id}`)
                        .classList.add("disabledIcons");
                });
                clearStates();
            }, 300);
        }
    }
};

const displayIcons = (shuffledArray) => {
    let text = ``;
    shuffledArray.forEach((icon, index) => {
        text += `<div class='icons'>
        <button class='hiddenButton' name='hiddenButton' id='${index}' onclick='handleIcons("${icon}", "${index}")'></button>
        <div class='iconContainer ${icon.split(" ")[1] + 1}' 
            id='icon${index}'><i class='${icon}'></i></div>
        </div>`;
    });
    iconContainer.innerHTML = text;
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function resetGame() {
    shuffledIcons = shuffleArray([...allICONS, ...allICONS]);
    displayIcons(shuffledIcons);
    clearTimeAfterGameIsOver();
    clearStates();
    handleMoves();
    hideIcons();
    restartButton.onclick = () => {
        clearInterval(time);
        clearTimeAfterGameIsOver();
        counter();
        clearStates();
        const newShuffledIcons = shuffleArray([...allICONS, ...allICONS]);
        displayIcons(newShuffledIcons);
        hideIcons();
        handleMoves();
    };
}

window.onload = () => {
    resetGame();
    if (countState) {
        counter();
        countState = false;
    }
};
