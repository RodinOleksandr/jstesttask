

var start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    score = document.getElementById('score'),
    canvas = document.getElementById('canvas');

canvas.addEventListener('mousedown', clickTarget);
start.addEventListener("click", handleStart);
stop.addEventListener("click", handleStop);

var gameOn = false,
    point = 0,
    squares = [],
    addSquare,
    addSquare2,
    ctx = canvas.getContext('2d');


function InitialState(){
    this.currentPos = 0;
    this.xPos = Math.random() * (620 - 0) + 0;
    this.step = Math.random() * (3 - 1) + 1;
    this.color = getRandomColor();
}


function clickTarget() {
  var elemLeft = canvas.offsetLeft,
      elemTop = canvas.offsetTop;

  var x = event.pageX - elemLeft,
      y = event.pageY - elemTop;
console.log(squares , y)
  for (let i = 0; i < squares.length - 1; i++) {
    console.log(squares , y)
    if (squares[i]) {

      if (y > squares[i].currentPos && y < squares[i].currentPos + 20 && x > squares[i].xPos && x < squares[i].xPos + 20) {
            console.log(squares[i].currentPos , squares[i]);

          point += 1;
          score.innerText = point;
          squares[i] = null;
          addSquare2 = setTimeout(function () {
            squares[i] = new Square();
          } , Math.random() * (5000 - 3000) + 3000)}
    }

  }

}


function handleStart(){
  gameOn = true
  addSquares();
  start.disabled = true;
  stop.disabled = false;
  animate();
  point = 0;
  score.innerText = point;
  squares = [];
}


function handleStop(){
  clearTimeout(addSquare)
  gameOn = false
  start.disabled = false;
  stop.disabled = true;
  point = 0;
  squares = [];
  clearTimeout(addSquare2);
}


function Square() {
  InitialState.apply(this, arguments);
  this.draw = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xPos, this.currentPos, 20, 20);
    this.currentPos += this.step;
  }
}


function animate() {

  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
  for (let i = 0; i < squares.length - 1 ; i++) {
    if (squares[i]) {
      squares[i].draw();

      if(squares[i].currentPos >= canvas.clientHeight ) {

          squares[i] = null;
          addSquare2 = setTimeout(function () {
            squares[i] = new Square();
          } , Math.random() * (5000 - 3000) + 3000)
        }
    }
  }

  if (gameOn) {
      requestAnimationFrame(animate);
  } else {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
    return;
  }
}


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}


function addSquares() {
   addSquare = setInterval(function(){
    if (squares.length < 10) squares.push(new Square());
  }, Math.random() * (5000 - 3000) + 3000)
}
