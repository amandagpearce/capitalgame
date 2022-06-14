let button = document.getElementById("load");
//button.addEventListener('click', myLoader, false)

let capital = null;
let output = document.getElementById("output");
let countriesObj;

let flag = 3;
let gameplay = false;
let rightGuesses = 0;

let hearts = document.querySelectorAll("#heart-block > div span");

let init = (options, country) => {
  document.querySelector("#question span").innerHTML = country;
  let html = "";
  for (let i = 0; i < options.length; i++) {
    html +=
      '<li><a class="opt" onclick="checkAnswer()" href="javascript:;" data-value="' +
      options[i] +
      '">' +
      options[i] +
      "</a></li>";
  }
  document.getElementById("options").innerHTML = html;
};

let shuffleArray = (arr) => {
  for (let x = arr.length - 1; x > 0; x--) {
    let holder = Math.floor(Math.random() * (x + 1));
    let temp = arr[x];
    arr[x] = arr[holder];
    arr[holder] = temp;
  }
  return arr;
};

let myLoader = () => {
  button.classList.add("hide");

  const xHR = new XMLHttpRequest();
  xHR.open("get", "https://restcountries.com/v3.1/all", true);
  xHR.send();

  xHR.onload = requestOutput;
};

function requestOutput() {
  countriesObj = JSON.parse(this.responseText);
  //console.log("countriesObj", countriesObj);

  showLives();
  gameplay = true;

  output.innerHTML = " ";

  pickRandomCountry();
}

let showLives = () => {
  document.getElementById("question").classList.remove("hide");
  document.getElementById("heart-block").classList.remove("hide");
};

let pickRandomCountry = () => {
  let randomPick;
  let randomOpts = "";
  let randomCapitals = "";
  let opts = [];
  let country = "";

  randomPick = Math.floor(Math.random() * countriesObj.length);
  //console.log('randomPick', randomPick);
  //console.log('countriesObj[randomPick]', countriesObj[randomPick].name.common, countriesObj[randomPick].capital);
  country = countriesObj[randomPick].name.common;
  capital = countriesObj[randomPick].capital ? countriesObj[randomPick].capital : null;
  
  if (!capital) {
    capital = "It doesn't have one, silly";
    opts.push(capital);
  } else {
    opts.push(capital);
  }
  //console.log(country+'-'+capital);

  for (let x = 0; x < 3; x++) {
    randomOpts = Math.floor(Math.random() * countriesObj.length);
    randomCapitals = countriesObj[randomOpts].capital;
    if (
      !randomCapitals.length ||
      randomCapitals.length === 0 ||
      randomCapitals == null ||
      randomCapitals == ""
    ) {
      randomCapitals = "It does not have one";
      opts.push(randomCapitals);
    } else {
      opts.push(randomCapitals);
    }
  }
  //console.log(opts);
  shuffleArray(opts);
  init(opts, country);
};

let checkAnswer = () => {
  if (gameplay) {
    event.target.classList.add("active");
    let guess = event.target.dataset.value;

    if (guess == capital) {
      output.innerHTML = "<h4>You're right!</h4>";
      rightGuesses++;
      window.setTimeout(myLoader, 2000);
    } else {
      output.innerHTML = "<h4>You're wrong, it's " + capital + "</h4>";
      flag--;
      hearts[flag].classList.add("grey");
      if (flag == 0) {
        if (rightGuesses == 1) {
          output.innerHTML +=
            "<h3>You got " + rightGuesses + " capital right</h3>";
        } else {
          output.innerHTML +=
            "<h3>You got " + rightGuesses + " capitals right</h3>";
        }
        output.innerHTML += "<br><h4 class='blink'>Game over</h4>";
        resetGame();
      } else {
        window.setTimeout(myLoader, 2000);
      }
    }
  }
};

let resetGame = () => {
  button.value = "Restart";
  button.classList.remove("hide");

  for (let x = 0; x < hearts.length; x++) {
    hearts[x].classList.remove("grey");
  }
  document.getElementById("heart-block").classList.add("hide");
  flag = 3;
  rightGuesses = 0;
  gameplay = false;
};
