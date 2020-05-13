
const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
let bankAmount = 100;
let tableAmount = 0;
let bankAmount_span = document.getElementById("bankAmount");
let tableAmount_span = document.getElementById("tableAmount");
let playButton = document.getElementById("playButton");
let high = document.getElementById('high');
let low = document.getElementById('low');
let takeHalf = document.getElementById('takeHalf');
let takeAll = document.getElementById('takeAll');
let message = document.getElementById('message');
let displayingCards = document.getElementById('cards');
let guesses = 0;
let guessesWon = 0;
let rate_span = document.getElementById('rate_span');
let resetRate = document.getElementById('reset');
let highScore = 0;
let image = document.createElement('img');

function start() {
	 bankAmount = 100;
	 tableAmount = 0;
	 playButton.disabled = false;
}

function play() {
	bankAmount = bankAmount - 10;
	tableAmount = tableAmount + 10;
	playButton.disabled = true;
	high.style.backgroundColor = "yellow";
	low.style.backgroundColor = "yellow";
	playButton.style.backgroundColor = "white";
	message.innerHTML = 'Guess if next card is high or low!';
	bankAmount_span.innerHTML = bankAmount;
	tableAmount_span.innerHTML = tableAmount;
	high.disabled = false;
	low.disabled = false;
	while (displayingCards.firstChild) {
			displayingCards.removeChild(displayingCards.firstChild);
		}
		displayingCards.appendChild(image);
		image.src = 'gemblaImages/reverseCard.jpg';
		
}

function guess(guess) {
	let winSound = new Audio('sounds/winSound.mp3');
	let looseSound = new Audio('sounds/looseSound.mp3');
	guessesWon = guessesWon;
	guesses++;
	guessesRate = Math.floor(guessesWon * 100 / guesses);
	let random = Math.floor(Math.random() * 13);
	let randomCard = cards[random];
	
	highScore = highScore;
	displayingCards.removeChild(displayingCards.lastChild);
	image.src = 'gemblaImages/' + randomCard + '.jpg';
	displayingCards.appendChild(image);

		if (guess === high && randomCard <= 7) {
			tableAmount = 0;
			tableAmount_span.innerHTML = tableAmount;
			high.disabled = true;
			low.disabled = true;
			playButton.disabled = false;
			rate_span.innerHTML = guessesRate + ' %'; 
			looseSound.play();
			reset();

		} else if (guess === high && randomCard > 7) {
			image = document.createElement('img');
			displayingCards = document.getElementById('cards');
			message.innerHTML = 'You win!';
			tableAmount = tableAmount * 2;
			tableAmount_span.innerHTML = tableAmount;
			guessesWon++;
			guessesRate = Math.floor(guessesWon * 100 / guesses);
			rate_span.innerHTML = guessesRate + ' %';
			image.src = 'gemblaImages/reverseCard.jpg';
			displayingCards.appendChild(image);
			winSound.play();


		} else if (guess === low && randomCard <= 7) {
			image = document.createElement('img');
			displayingCards = document.getElementById('cards');
			message.innerHTML = 'You win!';
			tableAmount = tableAmount * 2;
			tableAmount_span.innerHTML = tableAmount;
			guessesWon++;
			guessesRate = Math.floor(guessesWon * 100 / guesses);
			rate_span.innerHTML = guessesRate + ' %';
			image.src = 'gemblaImages/reverseCard.jpg';
			displayingCards.appendChild(image);
			winSound.play(); 
			
		} else {
			tableAmount = 0;
			tableAmount_span.innerHTML = tableAmount;
			high.disabled = true;
			low.disabled = true;
			playButton.disabled = false;
			rate_span.innerHTML = guessesRate + ' %';
			looseSound.play();
			reset();
		}
	if (tableAmount <= 10) {
		takeHalf.disabled = true;
		takeAll.disabled =  true;
	} else {
		takeHalf.disabled = false;
		takeAll.disabled = false;
		takeHalf.style.backgroundColor = "#2955a5";
		takeAll.style.backgroundColor = "#2955a5";
	}
 		
 		if (bankAmount >= 1000000) {
			message.innerHTML = 'Congratulations, you\'re a millionere. Spend wisely.';
			start();
		}

		myHighScore();
	}

function eventListeners() {
	let takeHalfSound = new Audio('sounds/takeHalfSound.mp3');
	let takeAllSound = new Audio('sounds/takeAllSound.mp3');	
	guesses = guesses;
	guessesWon = guessesWon;
	if (tableAmount <= 10) {
			takeHalf.disabled = true;
			takeAll.disabled = true;
		} 
		else {
			takeHalf.disabled = false;
			takeAll.disabled = false;
		}

	playButton.addEventListener('click', function() {
		play();
	message.innerHTML = 'Guess if next card is high or low!';	
	});
	high.addEventListener('click', function() {
		guess(high);
	});
	low.addEventListener('click', function() {
		guess(low);
	});
	takeHalf.addEventListener('click', function() {
		tableAmount = tableAmount / 2;
		tableAmount_span.innerHTML = tableAmount;
		bankAmount = bankAmount + tableAmount;
		bankAmount_span.innerHTML = bankAmount;
		takeHalfSound.play();
		myHighScore();
	});
	takeAll.addEventListener('click', function() {
		bankAmount = bankAmount + tableAmount;
		bankAmount_span.innerHTML = bankAmount; 
		tableAmount = tableAmount - tableAmount;
		tableAmount_span.innerHTML = tableAmount;
		takeAllSound.play();
			if(bankAmount <= 200) {
				message.innerHTML = 'Giving up already?!';
			} else if(bankAmount > 200 && bankAmount < 500) {
				message.innerHTML = 'Wise man\'s choice. Buy yourself something nice!';
			} else if(bankAmount > 500 && bankAmount < 100000) {
				message.innerHTML = 'You are quite a gambler, are you?';
			} else{
				message.innerHTML = 'You should have go for a million!';
			}
		takeHalf.disabled = true;
		takeAll.disabled = true;
		high.disabled = true;
		low.disabled = true;
		playButton.style.backgroundColor = "yellow";
		high.style.backgroundColor = "white";
		low.style.backgroundColor = "white";
		takeAll.style.backgroundColor = "white";
		takeHalf.style.backgroundColor = "white";
		myHighScore();
		start();
	})
	resetRate.addEventListener('click', function() {
		guessesWon = 0;
		guesses = 0;
		rate_span.innerHTML = 0;
	})
}
function reset() {
	message.innerHTML = 'You lost. Next bet..';
	high.disabled = true;
	low.disabled = true;
	playButton.disabled = false;
	playButton.style.backgroundColor = "yellow";
	high.style.backgroundColor = "white";
	low.style.backgroundColor = "white";
	takeAll.style.backgroundColor = "white";
	takeHalf.style.backgroundColor = "white";
	if (bankAmount == 0 && tableAmount == 0) {
		message.innerHTML = 'Game Over. Play Again?';
		start();
	} 
} 

	function myHighScore() {
		highScore = highScore;
		let highScore_span = document.getElementById('highScore');
	if (bankAmount > highScore) {
		highScore = bankAmount;
		highScore_span.innerHTML = bankAmount + '$';
	}
}

eventListeners();
