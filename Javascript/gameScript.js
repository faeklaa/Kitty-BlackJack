
let playerSum = 0;
let dealerSum = 0;
let totalDealerSum = 0;
// keeping track of number of aces since A = 1 or 11
let playerAce = 0;
let dealerAce = 0;

var hidden;
var deck = [];

// canHit is true if the player's cards sum is <= 21
let canHit = true;

var wins = 0;
var losses = 0;
var ties = 0;

window.onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();
}

// createsd the deck on window load
function buildDeck() {
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    vLen = values.length;
    let suits = ["C", "S", "D", "H"];
    sLen = suits.length;

    // goes through each suit and adds each card value to the deck array per suit
    for (let i = 0; i < sLen; i++) {
        for (let j = 0; j < vLen; j++) {
            deck.push(values[j] + "-" + suits[i]);
        }
    }
}

// function to shuffle the built deck
function shuffleDeck() {
    let randIndex;
    for (let i = 0; i < 52; i++) {
        randIndex = Math.floor(Math.random() * 52);
        [deck[i], deck[randIndex]] = [deck[randIndex], deck[i]];
    }
     //console.log(deck);
}

//function to set up the game and start the game
function startGame() {
    hidden = deck.pop();
    totalDealerSum += getValue(hidden);
    // console.log(totalDealerSum);
    dealerAce += checkAce(hidden);
    //console.log(dealerAce);
    // setup the first few cards that are there at the start of the game
    dealerHit();
    for (let i = 0; i < 2; i++) {
        hit();
    }
   
    // if the player immediately gets dealt two cards that equal 21, then they automatically win
    if (changeAceValue(playerSum) == 21) {
        gameEnd();
    }

    // hit function and stay function
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

// function to get the number value of a card in the array
function getValue(card) {
    let splitCard = card.split("-");
    let value = splitCard[0];

    // checking for ace, jack, queen or king
    if (isNaN(value)) {
        if (value == "A") {
            value = 11;
        }
        else if (value == "J" || "Q" || "K") {
            value = 10;
        }
    }
    return Number(value);
}

//checking if the card taken from the array is an ace
function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

// function that gets and shows card for dealer
function dealerHit() {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    totalDealerSum += getValue(card);
    dealerSum += getValue(card);
    dealerAce += checkAce(card);
    document.getElementById("dealer_cards").append(cardImg);

    document.getElementById("dealer_sum").innerText = dealerSum;
}

// function that gets card and shows it from deck for the player
function hit() {

    if (changeAceValue(playerSum) > 21) {
        canHit = false;
    }

    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerSum += getValue(card);
    playerAce += checkAce(card);
    playerSum = changeAceValue(playerSum);
    document.getElementById("player_cards").append(cardImg);
    document.getElementById("player_sum").innerText = playerSum;

    if (playerSum > 21 || playerSum == 21) {
        gameEnd();
    }
}

// stay function
function stay() {
    gameEnd();
}

//checks for ace and reduces it to a value of 1 if hit cards + 11 > 21 
function changeAceValue(sum) {
    while (sum > 21 && playerAce > 0) {
        sum -= 10;
        playerAce -= 1;
    }
    return sum;
}

// called when the game is over and shows the final scores and who won
function gameEnd() {
    while (totalDealerSum < 17) {
        dealerHit();
    }
    dealerSum = totalDealerSum;
    playerSum = changeAceValue(playerSum);

    canHit = false;
    document.getElementById("back").src = "./cards/" + hidden + ".png";
    document.getElementById("dealer_sum").innerText = totalDealerSum;
    document.getElementById("player_sum").innerText = playerSum;

    setTimeout(endMsg, 1500);
}

function endMsg() {
    let endMessage = "";
    // if you or dealer are > 21
    if (playerSum > 21) {
        endMessage = "L loss";
    }
    else if (dealerSum > 21) {
        endMessage = "W";
    }
    //both you and dealer <= 21
    else if (playerSum == dealerSum) {
        endMessage = "L tie";
    }
    else if (playerSum > dealerSum) {
        endMessage = "W";
    }
    else if (playerSum < dealerSum) {
        endMessage = "L loss";
    }

    document.getElementById("results").innerText = endMessage;
}