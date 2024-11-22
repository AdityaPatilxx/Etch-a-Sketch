function makeGrid(size) {
    const displayHolder = document.querySelector('.display-holder');
    displayHolder.innerHTML = ""; // Clear previous grid
    const container = document.createElement('div');
    container.className = 'display';

    const boxSize = 500 / size + 'px'; // Adjust for dynamic grid sizing
    for (let i = 0; i < size; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < size; j++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.style.width = boxSize;
            box.style.height = boxSize;
            box.dataset.touchCount = 0;
            row.appendChild(box);
        }
        container.appendChild(row);
    }
    displayHolder.appendChild(container);
}

// Initialize default grid
makeGrid(16);


// Reset button functionality
const reset = document.querySelector('#reset')
reset.addEventListener('click', () => {
    randomizer = false
    makeGrid(sliderValue.textContent); // Reset grid with current slider value
});

// Change back to normal color on color selection
const color = document.querySelector('#display-color')
color.addEventListener('click', () => {
    randomizer = false
})


// add random colors to boxes
let randomizer = false
const rainbow = document.querySelector('.random')
rainbow.addEventListener('click', () => {
    randomizer = true
})


// Add trail effect to boxes
const display = document.querySelector('.display-holder')
display.addEventListener('mouseover', (event) => {
    const target = event.target

    let oldColor = getCurrentColor()
    let randomColor = getRandomRGBColors()

    let touchCount = parseInt(target.dataset.touchCount)
    let opacity = getOpacity(touchCount)
    target.dataset.touchCount = touchCount + 1;

    if (target.className == 'box') {
        let newColor
        (randomizer)
            ? newColor = `rgba(${randomColor[0]},${randomColor[1]},${randomColor[2]}, ${opacity})`
            : newColor = `rgba(${oldColor[0]},${oldColor[1]},${oldColor[2]}, ${opacity})`

        target.style.backgroundColor = newColor
    }
});


// Update grid size dynamically
const sliderValue = document.querySelector('.slider-value')
const slider = document.querySelector('#grid-slider')
slider.addEventListener('input', () => {
    const size = slider.value
    sliderValue.textContent = size
    makeGrid(size)

})

// Generate a random RGB color array
function getRandomRGBColors() {
    let rgb = []
    for (let i = 1; i < 4; i++) {
        rgb.push(Math.floor(Math.random() * 256))
    }
    return rgb
}

// Return the current color used in a array
function getCurrentColor() {
    let tempDiv = document.createElement("div");
    tempDiv.style.color = color.value;
    tempDiv.style.visibility = 'hidden'
    document.body.appendChild(tempDiv);

    // Get computed color in RGB format
    let rgbString = window.getComputedStyle(tempDiv).color;
    let rgbArray = rgbString.match(/\d+/g);
    document.body.removeChild(tempDiv);

    return rgbArray
}

// Return increased opacity based on touch count of div
function getOpacity(touchCount) {
    const baseOpacity = 0.4;
    const increment = 0.06;

    let newOpacity = baseOpacity + (increment * touchCount);

    // Ensure opacity doesn't exceed 1
    if (newOpacity > 1) {
        newOpacity = 1;
    }

    return newOpacity
}


