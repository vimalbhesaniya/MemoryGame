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

const hideIcons = () => {
    document.querySelectorAll(".iconContainer").forEach((elements) => {
        elements.classList.add("disabledIcons")
    })
}

const  clearStates = ()=>{
    currentState = [],
    tempororyState = []
    clickedIcons = []
    handledIconsId =[]
}

const memoryState = {
    iconContainer: document.getElementById("memoryContainer"),
    restartButton: document.getElementById("restartButton"),
    tempororyState: [],
    clickedIcons: [],
    handledIconsId: []
}

let { iconContainer, handledIconsId, clickedIcons, handleMatchedIcons, currentState } = memoryState;

const handleIcons = (icon, id) => {
    hideIcons()
    this.document.onclick = (event) => {
        document.getElementById(id).setAttribute("disabled" , true);
        if (handledIconsId.length <= 1) {
            handledIconsId = [...handledIconsId, `icon${id}`]
            handledIconsId.map((e) => {
                document.getElementById(e).classList.remove("disabledIcons")
            })
        }
        else {
            handledIconsId = [`icon${id}`]   
        }
        if (clickedIcons.length == 1) {
            if (clickedIcons.includes(icon)) {
                document.querySelectorAll(`.${icon.split(" ")[1] + 1}`).forEach((e) => {
                    e.classList.add("activeAfterMatch")
                })
                clearStates()
            }
            clearStates()
        }
        {
            if (clickedIcons.length < 2) {
                clickedIcons = [...clickedIcons, icon]
            }
            else {
                clickedIcons = []
            }

        }
    }
}



const displayIcons = (shuffledArray) => {

    let text = ``
    for (let i = 0; i < 2; i++) {
        shuffledArray.map((icon, index) => {
            text += `<div class='icons' >
            <button class='hiddenButton' id='${i}${index}' onclick='handleIcons("${icon}" , "${i}${index}")' ></button>  
            <div class='iconContainer ${icon.split(" ")[1] + 1}' id='icon${i}${index}'><i class='${icon}'></i> 
            </div>
            </div>`
        })
    }
    iconContainer.innerHTML = text;

}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


window.onload = () => {
    currentState = allICONS;
    displayIcons(currentState)
    hideIcons()
    
    
}

restartButton.onclick = () => {
    clearStates()
    currentState = shuffleArray(allICONS)
    displayIcons(currentState);
    displayIcons(currentState);
    hideIcons()
}
