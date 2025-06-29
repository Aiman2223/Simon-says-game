const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let score = 0;
let inPlay = false;

const levelNum = document.getElementById('level-num');
const scoreNum = document.getElementById('score-num');
const message = document.getElementById('message');

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('reset-btn').addEventListener('click', resetGame);

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!inPlay) return;
    const color = btn.id;
    userPattern.push(color);
    playSound(color);
    animatePress(color);
    checkAnswer(userPattern.length - 1);
  });
});

function startGame() {
  if (inPlay) return;
  inPlay = true;
  level = 0;
  score = 0;
  gamePattern = [];
  userPattern = [];
  updateDisplay();
  document.getElementById('game-over-visual').classList.add('hidden');  
  
  nextSequence();
}

function resetGame() {
  inPlay = false;
  level = 0;
  score = 0;
  gamePattern = [];
  userPattern = [];
  updateDisplay();
  message.textContent = 'Game reset. Press Start!';
  document.getElementById('game-over-visual').classList.add('hidden');  

}

function nextSequence() {
  userPattern = [];
  level++;
  updateDisplay();
  
  const color = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(color);
  
  flashButton(color);
  playSound(color);
}

function flashButton(color) {
  const btn = document.getElementById(color);
  btn.classList.add('pressed');
  setTimeout(() => btn.classList.remove('pressed'), 300);
}

function animatePress(color) {
  const btn = document.getElementById(color);
  btn.classList.add('pressed');
  setTimeout(() => btn.classList.remove('pressed'), 100);
}

function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}



function updateDisplay() {
  levelNum.textContent = level;
  scoreNum.textContent = score;
  if (!inPlay) message.textContent = 'Press Start to play!';
}
function checkAnswer(idx) {
  if (userPattern[idx] === gamePattern[idx]) {
    score += 10;
    updateDisplay();
    if (userPattern.length === gamePattern.length) {
      message.textContent = 'Great! Next round...';
      setTimeout(() => {
        document.getElementById('game-over-visual').classList.add('hidden');
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    message.textContent = "Oops! You missed it. Try again next time! 😢";
    document.getElementById('game-over-visual').classList.remove('hidden');
    inPlay = false;
  }
}
