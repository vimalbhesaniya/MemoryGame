let memoryState = {}
const formState = {
    temp: {},
    formObject: {},
    submitState: false,
    handleIcons: ''
}

let { temp, formObject, submitState, handleIcons } = formState

const handleChange = (event) => {
    let { value, id } = event;
    temp = { ...temp, [id]: Number(value) }
}

const handleSubmit = () => {
    formObject = temp;
    submitState = true;
    modal.classList.add("hide")
    startGame()
    game()
}

document.onsubmit = (event) => {
    event.preventDefault();
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

const startGame = () => {
    memoryState = {
        iconContainer: document.getElementById("memoryContainer"),
        restartButton: document.getElementById("restartButton"),
        clickedIcons: [],
        handledIconsId: [],
        resultState: [],
        shuffledIcons: [],
        minutes: 0,
        time: null,
        moves: formObject.movesFromUser,
        second: 0,
        timerContainer: document.getElementById("timer"),
        movesContainer: document.getElementById("moves"),
        countState: true,
        handleIcons: '',
        lastIndex: 1,
        maxSecond: 60,
        initialSecond: 0,
        initialMinute: 0
    };
}

function game() {
    let { movesFromUser, minutesFromUser, secondsFromUser } = formObject;

    let {
        timerContainer,
        movesContainer,
        clickedIcons,
        handledIconsId,
        restartButton,
        maxSecond,
        iconContainer,
        initialSecond,
        resultState,
        shuffledIcons,
        minutes,
        moves,
        second,
        time,
        countState,
        lastIndex,
        initialMinute
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
        second = initialSecond;
        minutes = initialMinute;
        moves = movesFromUser;
        handleMoves();
    };

    let handleMoves = () => {
        moves--;
        movesContainer.innerHTML = moves
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
        if (moves == -1 || (minutes == minutesFromUser && second == secondsFromUser)) {
            resetGame();
            alert("Game is Over");
            handleHiddenButtons(true);
            resultState = [];
            return false;
        } else if (resultState.length == 8) {
            alert(`You did it! in ${second}s with ${movesFromUser - moves} moves`);
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
            if (second == maxSecond) {
                second = initialSecond;
                clearInterval(time);
                minutes++;
                counter();
            }
        }, 1000);
    };

    handleIcons = (icon, id) => {
        handleMoves();
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
                document.querySelectorAll(`.${icon.split(' ')[lastIndex]}i`).forEach((e) => e.classList.add("activeAfterMatch"));
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
            <div class='iconContainer ${icon.split(' ')[lastIndex]}i' 
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
        hideIcons();
        movesContainer.innerHTML = moves;
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
        if (countState) {
            counter();
            countState = false;
        }

    }
    resetGame()
}
