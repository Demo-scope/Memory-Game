// بسم الله الرحمن الرحيم
// Start Project



// handel with Splash Screen
document.querySelector(".memoryGame .button-start span").onclick = function () {
    let yourName = prompt("Whats Your Name ?")

    if (yourName == null || yourName == "") {
        yourName = "Unknown"
    } else if (yourName.match(/\s/ig)) {
        let Name = prompt("Please Enter Your Name Without Spaces !")
        yourName = Name
        if (Name == null || Name == "") {
            yourName = "Unknown"
        } else if (Name == Name.match(/\s/ig)) {
            yourName = "Fucker"
        }
    }

    document.querySelector(".memoryGame .info .name span").innerHTML = `${yourName}`
    document.querySelector(".memoryGame .button-start").style.cssText = "display: none;"
    document.querySelector(".memoryGame #play").play()
}



let duration = 1000;

let blocks = Array.from(document.querySelector(".memoryGame .blocksContaner").children)
let orderRange = [...Array(blocks.length).keys()] // => [0, 1, ... 19]
let randomArray = [];
shuffle(orderRange)

// shuffle function
function shuffle(arr) {
    let current = arr.length;
    let box = [];
    let random;

    while (current > 0) {
        random = Math.floor(Math.random() * current)
        current--;
        box.push(random)
    }
    randomArray = box
}


// set attribute order randpmly on all blocks
blocks.forEach(function (block, index) {
    block.style.order = randomArray[index]

    block.addEventListener("click", function () {
        flibBlock(block)
    })
})


function flibBlock(selectedBlock) {
    selectedBlock.classList.add("is-flipped")

    let allFlibedBlocks = blocks.filter(flibedBlock => flibedBlock.classList.contains("is-flipped"))
    if (allFlibedBlocks.length === 2) {
        stopClicking();
        checkMachedBlocks(allFlibedBlocks[0], allFlibedBlocks[1]);
    }


}

function stopClicking() {
    document.querySelector(".memoryGame .blocksContaner").classList.add("noClick")
    setTimeout(function () {
        document.querySelector(".memoryGame .blocksContaner").classList.remove("noClick")
    }, duration)
}

function checkMachedBlocks(FirstBlock, secondBlock) {
    let trayes = document.querySelector(".memoryGame .info .trayes span")

    if (FirstBlock.getAttribute("data-vero") === secondBlock.getAttribute("data-vero")) {
        FirstBlock.classList.remove("is-flipped")
        secondBlock.classList.remove("is-flipped")

        FirstBlock.classList.add("good")
        secondBlock.classList.add("good")

        document.querySelector(".memoryGame #nice").play();
    } else {
        trayes.innerHTML = parseInt(trayes.innerHTML) + 1

        setTimeout(function () {
            FirstBlock.classList.remove("is-flipped")
            secondBlock.classList.remove("is-flipped")
        }, duration)

        document.querySelector(".memoryGame #error").play();
    }

}