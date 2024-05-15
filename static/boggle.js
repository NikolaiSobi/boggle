let score = 0;

let correctWordsArr = []
const h1HighScore = document.getElementById('High-Score')
const h3GamesPlayed = document.getElementById('Games-Played')
const h4 = document.getElementById('Word-Guess')
const h3Score = document.getElementById('Score')
const boggleForm = document.getElementById('Boggle-Form')

// check local storage to see if obj is in local storage and if it is
// set the h1 and h3 text to high score and games played stored in local
// storage
let gameObjStorage = JSON.parse(localStorage.getItem("gameObj"))
if(gameObjStorage){
  h1HighScore.innerText = `High Score: ${gameObjStorage.highScore}`
  h3GamesPlayed.innerText = `Games Played: ${gameObjStorage.gamesPlayed}`
}


boggleForm.addEventListener('submit', function(e){
    e.preventDefault()
    let input = document.getElementById('boggle-input').value
    axios.post('http://127.0.0.1:5000/submit', {
        boggleName : input
      })
      .then(function (response) {
        let word = response.data.result
        
        // check to see if word exists and that it hasn't been guessed before
        if (response.data.isWord && !correctWordsArr.includes(word)) {
          score += word.length
          correctWordsArr.push(word)
          h3Score.innerText = "Score: " + score
          h4.innerText = `${word} is a word`
          
        } else if (correctWordsArr.includes(word)) {
          h4.innerText = `${word} already found`
        } else {
          h4.innerText = `${word} not found`
        }
        document.getElementById('boggle-input').value = ""
      })
      .catch(function (error) {
        console.log(error);
      });

})

let timeLeft = 10;
const timer = document.getElementById('Timer')
let timerId = setInterval(countdown, 1000)

// creating a countdown timer with the above variables

function countdown() {
  if(timeLeft === -1){
    clearTimeout(timerId)
    document.getElementById('Submit-Button').disabled = true

    // at the end of timer if there is something in local storage
    // increment games played by 1 in and check to see if
    // we need to set a new high score in local storage

    if(localStorage.getItem("gameObj") !== null) {
      console.log("obj exists")
      let gameObj = JSON.parse(localStorage.getItem("gameObj"))
      if(gameObj.highScore < score) gameObj.highScore = score
      gameObj.gamesPlayed +=1
      localStorage.setItem('gameObj', JSON.stringify(gameObj))
      h1HighScore.innerText = `High Score: ${gameObj.highScore}`
      h3GamesPlayed.innerText = `Games Played: ${gameObj.gamesPlayed}`
    
    } else {
      
      // if local storage is empty then create an object with highscore and
      // games played set to 0 then make it a string to store it in local storage
      localStorage.setItem('gameObj', JSON.stringify({
        highScore: score,
        gamesPlayed: 1
      }))
      h1HighScore.innerText = `High Score: ${score}`
      h3GamesPlayed.innerText = `Games Played: 1`
    }
    
  } else {
    timer.innerHTML = `Timer: ${timeLeft} seconds left`
    timeLeft--
  }
}


