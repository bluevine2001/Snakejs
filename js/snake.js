var slg = 20;
var s;
var food;
let direction;

function putFood() {
  cols = int(width / slg);
  rows = int(height / slg);
  col = int(random(cols));
  row = int(random(rows));
  food = createVector(col, row);
  food.mult(slg);
}
var video = 15.1;

function snake() {
  this.x = 0;
  this.y = 0;
  this.speedx = 1;
  this.speedy = 0;
  this.tail = [];
  this.total = 0;
  this.update = function () {
    if (this.total == this.tail.length)
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    this.tail[this.total - 1] = createVector(this.x, this.y);
    fill(255, 255, 255);
    for (var i = 0; i < this.tail.length; i++)
      rect(this.tail[i].x, this.tail[i].y, slg, slg);

    this.x = this.x + this.speedx * slg;
    this.y = this.y + this.speedy * slg;
    this.x = constrain(this.x, 0, width - slg);
    this.y = constrain(this.y, 0, height - slg);
    frameRate(10);
    fill(0, 255, 0);
    rect(this.x, this.y, slg, slg);
    keypressed();
  };
  this.death = function () {
    for (var i = 0; i < this.tail.length; i++) {
      if (dist(this.x, this.y, this.tail[i].x, this.tail[i].y) < 2) {
        this.tail = [];
        document.getElementById("overlay").style.display = "block";
        document.getElementById("score2").innerHTML = this.total;
        this.total = 0;
      }
    }
  };
  this.dir = function (x, y) {
    this.speedx = x;
    this.speedy = y;
  };
  this.eat = function () {
    d = dist(this.x, this.y, food.x, food.y);
    if (d < 2) {
      this.total++;
      document.getElementById("score").innerHTML = this.total;
      return true;
    } else {
      return false;
    }
  };
}

function setup() {
  createCanvas(400, 400);
  s = new snake();
  putFood();
}

function draw() {
  background(0);
  s.update();
  fill(255, 0, 0);
  rect(food.x, food.y, slg, slg);
  if (s.eat()) putFood();
  s.death();
}

function keypressed() {
  if (keyCode == UP_ARROW && direction != "DOWN") {
    direction = "UP";
    console.log("up");
    s.dir(0, -1);
  } else if (keyCode == DOWN_ARROW && direction != "UP") {
    direction = "DOWN";
    console.log("down");
    s.dir(0, 1);
  } else if (keyCode == LEFT_ARROW && direction != "RIGHT") {
    direction = "LEFT";
    console.log("left");
    s.dir(-1, 0);
  } else if (keyCode == RIGHT_ARROW && direction != "LEFT") {
    direction = "RIGHT";
    console.log("right");
    s.dir(1, 0);
  }
}