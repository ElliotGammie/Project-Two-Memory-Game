/*
 * Create a list that holds all of your cards
 */ // Array for clicked cards, matches that I can save, moves, we keep this with no contents so it can be stored for later use
const symbols = ['fa-taxi', "fa-taxi",
"fa-paper-plane-o", "fa-paper-plane-o",
"fa-anchor", "fa-anchor",
"fa-coffee", "fa-coffee",
"fa-phone", "fa-phone",
"fa-rocket", "fa-rocket",
"fa-bicycle", "fa-bicycle",
"fa-bomb", "fa-bomb",];

// container for the cards referring the DOM
const listofCards = document.querySelector ('.deck');

// Variables that will change through the DOM, and references to finished moves, stars and time
let cardList = document.querySelectorAll('.card')
let starChanger = document.querySelectorAll('.fa-star');
let clickReset = 0;
let endMessage = document.querySelector('.popup')
let clickedCards = [];
let matches = 0;
let finishedMoves = document.querySelector('.moveTotal');
let numberofMoves = document.getElementsByClassName('moves')[0]
let moves = 0;
let finishedTime = document.querySelector('.endTime');
let time = document.querySelector(".time");

// moves function , I increment the moves, this function is initialised at the select cards function.

function attemptedMoves() {
  moves++;
  numberofMoves.innerHTML = moves;
  finishedMoves.innerHTML = moves;
}

function shuffleCards () {
    const symbolsList = shuffle(symbols);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/* Card Creation
Loop over the symbols , create the element in the DOM, add the cards to a class, add the symbols and finally move the card to the page. */
function gameStart(){
  shuffleCards ();
  for (let i = 0; i < 16; i++) {
    let cards = document.createElement('li');
    cards.classList.add('card');

// Declare the variable to create the symbols within the card, and create the card to be used
  let symbolList = document.createElement('i');
    symbolList.classList.add('fa');
    symbolList.classList.add(symbols[i]);

    listofCards.appendChild(symbolList);

  // move the card to the deck to be showed to the user
    cards.appendChild(symbolList);
		document.getElementById('deck').appendChild(cards);

    // the selecting of each card by a click
    select(cards);
  }
}

// on click functionality
/*
First start the stopwatch at the start of the game, I also made the click refer to an event so it can be used in a variable.
I prefered to use an event handler rather than the "this" statment.
I then made sure the timer wouldn't increment double but putting a variable that will change to 1 on start and with resets.
*/

function select (cards) {
    cards.addEventListener("click", (e) => {
      if (clickReset === 0) {
          stopWatch ();
          clickReset = 1;
      }
      console.log(cards.innerHTML);
      // put the first click and the second click into variables that can be used
      const firstCard = e.target;
      const secondCard = clickedCards[0];


      // This will record if we have a currently opened card,
      // I use the ignore css class to make sure we are not matching the same card, this is utlising css pointer-events

        if (clickedCards.length === 1) {
          cards.classList.add('open' , 'show', 'ignore');
          clickedCards.unshift(firstCard);

        // Comparision of cards for further use
        comparingCards(firstCard, secondCard);

      // This will record if we do not having an currently opened cards

      } else {
        firstCard.classList.add('open' , 'show', 'ignore');
        clickedCards.push(firstCard);
       }
    });
}

/* Comparision of cards and if they are matching or not, I use the pushed event to
   compare with the current click to distingush whether it is matching or not.
   We also need to reset the cards so additional matches can be made
   As i put matches into an exact number I can increment them for further use to complete the game
*/

function comparingCards (firstCard , secondCard) {
  if(firstCard.innerHTML === secondCard.innerHTML) {
    console.log('matched')
    // Matched commands
    firstCard.classList.add('match');
    secondCard.classList.add('match');
    matches ++
    clickedCards = [];
    // implementing a constant referal if the game is over or not
    gameComplete();
  }

  /* This else statement is for making sure that the cards reset themselves to facedown,
  I do this by a remove statement of the show, open and then push the array back to empty.
  I must do this inside the setTimeout function so it will do this at the duration I desire.
  At the end empty the array that stored the first and second card.
  If there isn't a setTimeout function then the non-matching of cards looks too fast and clunky.
  */
  else {
    setTimeout(function() {
    firstCard.classList.remove('open', 'show', 'ignore');
    secondCard.classList.remove('open', 'show', 'ignore');
    clickedCards = [];
  }, 250);

    console.log('not matched');
  }

  attemptedMoves();
  starRating();
}


// function for completing the game
function gameComplete () {
  if (matches === 8) {
    gameMessage();
    stopTime();
  }
}

// Popup Message
// function for displaying the pop up on game complete by removing the hide css class and adding the styles to the message
function gameMessage () {
  endMessage.classList.remove('hide');
  endMessage.classList.add('popupMessage');
}

/* Resetting the Game
restart all matches, clickedCards, comparisions, and move the stars back to the correct colors and number
also introduce the gameStart function after all this is done
*/
const resettingGame = document.querySelector(".restart");
  resettingGame.addEventListener('click', function(){
  // first step removing all cards
  listofCards.textContent = "";
  // recreate cards
  resetClick();
  gameStart();
  // restart all moves, time, stars etc
  matchesRestart();
  movesRestart();
  starRestart();
  popupClear ();
  timeRestart();});

// Invoke the same functions to reset everything back to its starting state
const popupRestart = document.querySelector (".finRestart");
  popupRestart.addEventListener('click' , function(){
  listofCards.textContent = "";
  resetClick();
  gameStart();
  matchesRestart();
  movesRestart();
  starRestart();
  popupClear ();
  timeRestart();
  });

cardFlip();

function cardFlip () {
listofCards.textContent = "";
}

function matchesRestart () {
  matches = 0;
}

function movesRestart() {
  numberofMoves.innerHTML = 0;
  moves = 0;
}

// removing the star css classes that have been invoked or changed
function starRestart() {
  starChanger[0].classList.remove('hide');
  starChanger[3].classList.remove('hide');
  starChanger[1].classList.remove('hide');
  starChanger[4].classList.remove('hide');
  starChanger[1].classList.remove('silver');
  starChanger[4].classList.remove('silver');
  starChanger[2].classList.remove('silver');
  starChanger[5].classList.remove('silver');
  starChanger[2].classList.remove('bronze');
  starChanger[5].classList.remove('bronze');
}

// hide the popup again
function popupClear () {
  endMessage.classList.remove('.popup');
  endMessage.classList.add('hide');
  endMessage.style.top = "-200%";
}
function resetClick () {
  clickReset = 0;
}

// move all values in the timer but to their orginal starting point
function timeRestart () {
  stopTime();
  seconds = 0;
  minutes = 0;
  time.innerHTML = "0" + minutes + ":" + "0" + seconds;
}

// Start the Game
// Call gameStart to prepare a new set of cards and move all cards back to facedown position
gameStart();

/* Stopwatch
Change  to add 1 minute if seconds is equal to 60
I also reference the finished time to the current time so it displays this on the popup Message
*/

let currentTimer, seconds = 0 , minutes = 0;
time.innerHTML = "0" + minutes + ":" + "0" + seconds;
function stopWatch() {
  currentTimer = setInterval(function(){
 seconds ++;
  if (seconds === 60) {
    seconds = 0;
    minutes ++;
  }
    if (seconds <= 9) {
      time.innerHTML = "0" + minutes + ":" + "0" + seconds;
    }
      if (seconds >= 10 && seconds <= 59) {
        time.innerHTML = "0" + minutes + ":" + seconds;
      }
      finishedTime.innerHTML = time.innerHTML;
} , 1000);
}

// for stopping the time
function stopTime() {
    clearInterval(currentTimer);
}

//Removes stars based on the number of moves. I added a hide class in css to hide stars and i also add or
// remove colors depending on the number of moves

function starRating() {
  if (moves === 15) {
    starChanger[0].classList.add('hide');
    starChanger[3].classList.add('hide');
    starChanger[1].classList.add('silver');
    starChanger[4].classList.add('silver');
    starChanger[2].classList.add('silver');
    starChanger[5].classList.add('silver');

  } if (moves === 20) {
    starChanger[1].classList.add('hide');
    starChanger[4].classList.add('hide');
    starChanger[2].classList.add('bronze');
    starChanger[5].classList.add('bronze');
  }
}
