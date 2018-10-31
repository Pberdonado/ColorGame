let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.querySelectorAll('.square');
let colorDisplay = document.getElementById('colorDisplay');
let messageDisplay = document.querySelector('#message');
let h1 = document.querySelector('h1');
let resetButton = document.querySelector('#reset');
let modeButtons = document.querySelectorAll('.mode');

init();

function init() {
	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons() {
	for (let i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener('click', function() {
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			this.classList.add('selected');
			this.textContent === 'Easy' ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

function setupSquares() {
	for (let i = 0; i < squares.length; i++) {
	//add click listeners to squares
		squares[i].addEventListener('click', function() {
			//grab color of clicked square
			let clickedColor = this.style.background;
			//compare color to pickedColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = 'Correct!';
				resetButton.textContent = 'Play Again?';
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				this.style.background = '#232323';
				messageDisplay.textContent = 'Try Again';
			}
		});
	}
}

/** Start || Reset the Game */
function reset() {
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();  // pick a new random color from array
	colorDisplay.textContent = pickedColor;  //change colorDisplay to match picked Color
	resetButton.textContent = 'New Colors';
	messageDisplay.textContent = '';
    h1.style.background = 'steelblue';
	//change colors of squares
	for (let i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = 'block';
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = 'none';
		}
	}
}

/** Event Listener for the Reset Button */
resetButton.addEventListener('click', () => {
	reset();
});

function changeColors(color) {
	// loop through all squares
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}

/** Pick the correct color */
function pickColor() {
	const random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

/** Generate an array of random colors of length num */
function generateRandomColors(num) {
	return Array.from({length: num}, () => randomColor());
}

/** Chose Random Color **/
function randomColor() {
	const newColor = () => {
		return Math.floor(Math.random() * 256);
	};
	const rgb = Array.from({length: 3}, () => newColor());
	return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

