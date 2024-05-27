const allICONS = [
    `fa-brands fa-twitter`,
    "fa-solid fa-camera-retro",
    "fa-solid fa-heart",
    "fa-solid fa-bell",
    "fa-solid fa-bookmark",
    "fa-solid fa-wifi",
    "fa-brands fa-whatsapp",
    "fa-brands fa-google-play"
]
let clickedIcons = [], result = [], prevIcon = [];
const memoryState = {
    iconContainer: document.getElementById("memoryContainer"),
    handleMatchedIcons: (icon, id) => {
        
        if (clickedIcons.length == 2) {
            if (clickedIcons.includes(icon)) {
                result.push(icon)
                displayIcons(currentState);
            }
            else {
                clickedIcons = []
                displayIcons(currentState);
            }
        }
        {
            clickedIcons = [clickedIcons, icon];
            prevIcon = [];
        }
        return result;
    },
    restartButton: document.getElementById("restartButton"),
    currentState: []
}

let { iconContainer, handleMatchedIcons, restartButton, currentState } = memoryState;

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const displayIcons = (shuffledArray) => {
    let text = ''
    for (let i = 0; i < 2; i++) {
        shuffledArray.map((icon, index) => {
            text += `<div class='${result.includes(icon) ? 'activeIcon' : ''}  iconContainer' 
            id='${index + `_` + i}' onclick="handleMatchedIcons('${icon}','${index + '_' + i}')" > <i class='${icon}'></i> </div>`
        })
    }
    iconContainer.innerHTML = text;
}

window.onload = () => {
    currentState = allICONS;
    displayIcons(currentState)
}

restartButton.onclick = () => {
    currentState = shuffleArray(allICONS)
    displayIcons(currentState);
}

