const allICONS = [
    "fa-brands fa-twitter",
    "fa-solid fa-camera-retro",
    "fa-solid fa-heart",
    "fa-solid fa-bell",
    "fa-solid fa-bookmark",
    "fa-solid fa-wifi",
    "fa-brands fa-whatsapp",
    "fa-brands fa-google-play"
];

const hideIcons = () => {
    document.querySelectorAll(".iconContainer").forEach((element) => {
        element.classList.add("disabledIcons");
    });
};

const clearStates = () => {
    memoryState.clickedIcons = [];
    memoryState.handledIconsId = [];
};

const memoryState = {
    iconContainer: null,
    restartButton: null,
    clickedIcons: [],
    handledIconsId: []
};

const handleIcons = (icon, id) => {
    const button = document.getElementById(id);
    button.setAttribute("disabled", true);
    const iconElement = document.getElementById(`icon${id}`);
    iconElement.classList.remove("disabledIcons");
    memoryState.clickedIcons.push({ icon, id });
    
    if (memoryState.clickedIcons.length === 2) {
        const [first, second] = memoryState.clickedIcons;

        if (first.icon === second.icon) {
            document.querySelectorAll(`.${icon.split(" ")[1] + 1}`).forEach((e) => {
                e.classList.add("activeAfterMatch");
            });
            clearStates();
        } else {
            setTimeout(() => {
                memoryState.clickedIcons.forEach(clicked => {
                    document.getElementById(clicked.id).removeAttribute("disabled");
                    document.getElementById(`icon${clicked.id}`).classList.add("disabledIcons");
                });
                clearStates();
            }, 800);
        }
    }
};

const displayIcons = (shuffledArray) => {
    let text = ``;
    shuffledArray.forEach((icon, index) => {
        text += `<div class='icons'>
                    <button class='hiddenButton' id='${index}' onclick='handleIcons("${icon}", "${index}")'></button>
                    <div class='iconContainer ${icon.split(" ")[1] + 1}' id='icon${index}'><i class='${icon}'></i></div>
                 </div>`;
    });
    memoryState.iconContainer.innerHTML = text;
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

window.onload = () => {
    memoryState.iconContainer = document.getElementById("memoryContainer");
    memoryState.restartButton = document.getElementById("restartButton");

    const shuffledIcons = shuffleArray([...allICONS, ...allICONS]);
    displayIcons(shuffledIcons);
    hideIcons();

    memoryState.restartButton.onclick = () => {
        clearStates();
        const newShuffledIcons = shuffleArray([...allICONS, ...allICONS]);
        displayIcons(newShuffledIcons);
        hideIcons();
    };
};
