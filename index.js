var Hangman = function () {
  // Function keys/variable

  const words = ["PROGRAMMER", "RUBY", "PYTHON", "APACHE", "HADOOP"];
  this.score = 0;
  this.player_score = 0;
  this.alreadyGuessed = [];
  this.currentWord = "";
  this.isGameRunning = false;

  this.setCurrentWord = function setCurrentWord(w) {
    console.log(this);
    this.currentWord = w;
  };

  this.setGameRunning = function setGameRunning(w) {
    console.log(this);
    this.isGameRunning = w;
  };

  this.startGame = function () {
    this.resetGame();
    let rand_word_index = Math.floor(Math.random() * words.length);
    this.setCurrentWord(words[rand_word_index]);
    this.setGameRunning(true);

    this.createDashes();
  };
  this.createDashes = function () {
    if (this.isGameRunning && this.currentWord) {
      let dashesDiv = document.getElementById("dashes_div");
      [...this.currentWord].forEach((letter, index) => {
        let spanElement = document.createElement("span");
        spanElement.classList.add("dashes");
        spanElement.classList.add("underscore");
        spanElement.setAttribute("id", "dash" + index);
        spanElement.innerText = "";
        dashesDiv.appendChild(spanElement);
      });
    }
  };

  const findIndexes = (arr, letter) => {
    let returnvalue = [];
    arr.forEach((charactor, index) => {
      if (letter.toLowerCase() == charactor.toLowerCase()) {
        returnvalue.push(index);
      }
    });

    return returnvalue;
  };
  function drawHangman(score) {
    let hangman;
    if (score == 1) {
      hangman = document.querySelector(".vertical");
      hangman.classList.remove("display_none");
    } else if (score == 2) {
      hangman = document.querySelector(".horizontal");
      hangman.classList.remove("display_none");
    } else if (score == 3) {
      hangman = document.querySelector(".rope");
      hangman.classList.remove("display_none");
    } else if (score == 4) {
      hangman = document.querySelector(".circle");
      hangman.classList.remove("display_none");
    } else if (score == 5) {
      hangman = document.querySelector(".body_stick");
      hangman.classList.remove("display_none");
    } else if (score == 6) {
      hangman = document.querySelector(".hand1");
      hangman.classList.remove("display_none");
    } else if (score == 7) {
      hangman = document.querySelector(".hand2");
      hangman.classList.remove("display_none");
    } else if (score == 8) {
      hangman = document.querySelector(".leg1");
      hangman.classList.remove("display_none");
    } else if (score == 9) {
      hangman = document.querySelector(".leg2");
      hangman.classList.remove("display_none");
    }
  }
  this.guessLetter = function (letter) {
    let alreadyGuessedMatched = this.alreadyGuessed.includes(
      letter.toUpperCase()
    );
    if (this.isGameRunning) {
      let matches = findIndexes([...this.currentWord], letter);

      if (matches.length && !alreadyGuessedMatched) {
        matches.forEach((index) => {
          let target_span = document.querySelector("#dash" + index);
          target_span.innerText = letter.toUpperCase();
          this.alreadyGuessed.push(letter.toUpperCase());
        });
        this.player_score = this.player_score + matches.length;
        console.log(this.currentWord.length);
        console.log(this.player_score);
        if (this.player_score == this.currentWord.length) {
          alert("you won");
          this.resetGame();
        }
      } else {
        if (!alreadyGuessedMatched) {
          this.score++;
          drawHangman(this.score);
        }
      }
    }
  };

  this.resetHangMan = function () {
    var hangman_container = document.getElementsByClassName("hangman_absolute");
    [].forEach.call(hangman_container[0].children || [], function (child) {
      child.classList.add("display_none");
    });
    const dashes_div = document.getElementById("dashes_div");
    while (dashes_div.children[0]) {
      dashes_div.removeChild(dashes_div.children[0]);
    }
  };
  this.resetGame = function () {
    this.score = 0;
    this.player_score = 0;
    this.alreadyGuessed = [];
    this.currentWord = "";
    this.isGameRunning = false;
    this.resetHangMan();
  };
  this.resetHangMan = this.resetHangMan.bind(this);
  this.resetGame = this.resetGame.bind(this);
  this.createDashes = this.createDashes.bind(this);
  this.startGame = this.startGame.bind(this);
  this.setCurrentWord = this.setCurrentWord.bind(this);
  this.setGameRunning = this.setGameRunning.bind(this);
  this.guessLetter = this.guessLetter.bind(this);
};
var newInstance = new Hangman();
console.log(newInstance);
var button = document.getElementsByTagName("button");
button[0].addEventListener("click", newInstance.startGame);
var reset = document.querySelector("#reset");
reset.addEventListener("click", newInstance.resetHangMan);
document.addEventListener("keyup", (e) => newInstance.guessLetter(e.key));
