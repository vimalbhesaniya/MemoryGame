document.onsubmit = (event) => {
    event.preventDefault()
}

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
let inputsFromUser = {};
let { movesFromUser, minutesFromUser, secondsFromUser } = inputsFromUser;
const memoryState = {
    iconContainer: document.getElementById("memoryContainer"),
    restartButton: document.getElementById("restartButton"),
    clickedIcons: [],
    handledIconsId: [],
    resultState: [],
    shuffledIcons: [],
    minutes: 0,
    time: null,
    moves: Number(movesFromUser),
    second: 0,
    timerContainer: document.getElementById("timer"),
    movesContainer: document.getElementById("moves"),
    countState: true,
    temp: {},
    errorColor: "red",
    succesColor: "#0572c0",
    errorState: false,
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
    temp,
    errorColor,
    succesColor,
    errorState,
    defaultErrorMessage


} = memoryState;



const checkValueIsPresent = (value) => {
    return value.trim().length == 0 ? true : false
}

// const handleErrors = (inputValue, errorId, textMessage, errorElementToShow, defaultErrorMessage) => {
//     let value = Number(inputValue)
//     let errorElement = document.getElementById(errorElementToShow);
//     function clear() {
//         errorElement.innerHTML = ''
//     }
//     switch (errorId) {
//         case 'movesFromUser':
//             {
//                 if (checkValueIsPresent(inputValue)) {
//                     errorElement.innerHTML = defaultErrorMessage
//                     return true
//                 } else {
//                     if (value <= 5 || value > 50) {
//                         errorElement.innerHTML = textMessage
//                         return true
//                     }
//                     clear()
//                     return false
//                 }
//             }
//             break;
//         case 'minutesFromUser':
//             {
//                 if (checkValueIsPresent(inputValue)) {
//                     errorElement.innerHTML = defaultErrorMessage
//                     return true
//                 } else {
//                     if (value < 0 || value > 5) {
//                         errorElement.innerHTML = textMessage
//                         return true
//                     }
//                     clear()
//                     return false
//                 }
//             }
//             break;
//         case 'secondsFromUser':
//             {
//                 if (checkValueIsPresent(inputValue)) {
//                     errorElement.innerHTML = defaultErrorMessage

//                     return true
//                 } else {
//                     if (value < 0 || value > 59) {
//                         errorElement.innerHTML = textMessage
//                         errorState = true
//                         return true
//                     }
//                     clear()
//                     return false
//                 }
//             }
//             break;
//         default:
//             break;
//     }

// }
// function checkError(value, id, errorElement) {
//     let checkErrorsIsHaveOrNot = [
//         id == 'movesFromUser' && handleErrors(value, id, 'Moves must be between 5 to 50', errorElement, 'Moves are required'),
//         id == 'minutesFromUser' && handleErrors(value, id, 'Please complete the game between 0 to 5 minutes', errorElement, 'Minutes are required'),
//         id == 'secondsFromUser' && handleErrors(value, id, 'Please enter second between 0 to 59', errorElement, 'Seconds are required'),
//     ]
//     return checkErrorsIsHaveOrNot;
// }

const handleChange = (inputEvent) => {
    let { id, value } = inputEvent;
    temp = { ...temp, [id]: value }
}

const handleSubmit = () => {
    inputsFromUser = temp
    moves = movesFromUser
    resetGame()
    modal.classList.add("hide")
}

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
    moves = movesFromUser;
    console.log(moves);
    handleMoves();
};

let handleMoves = () => {
    moves--;
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
    if (moves == -1 || (minutes == Number(minutesFromUser) && second == Number(secondsFromUser))) {
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
        if (second == Number(secondsFromUser)) {
            second = 0;
            clearInterval(time);
            minutes++;
            counter();
        }
    }, 1000);
};

const handleIcons = (icon, id) => {
    handleMoves();
    checkExpiry();
    movesContainer.innerHTML = moves;
    const button = document.getElementById(id);
    button.setAttribute("disabled", true);
    const iconElement = document.getElementById(`icon${id}`);
    iconElement.classList.remove("disabledIcons");
    clickedIcons.push({ icon, id });
    if (clickedIcons.length === 2) {
        const [first, second] = clickedIcons;
        if (first.icon === second.icon) {
            resultState = [...resultState, first.id];
            document.querySelectorAll(`.${icon.split(" ")[1] + 1}`).forEach((e) => e.classList.add("activeAfterMatch"))
            clearStates();
        } else {
            setTimeout(() => {
                clickedIcons.forEach((clicked) => {
                    document.getElementById(clicked.id).removeAttribute("disabled");
                    document.getElementById(`icon${clicked.id}`).classList.add("disabledIcons");
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
    for (let i = array.length - 1; i >= 0; i--) {
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
    movesContainer.innerHTML = moves;
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
    if (countState) {
        // counter();
        countState = false;
    }
};
