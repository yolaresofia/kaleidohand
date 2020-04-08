let angle = 100
let despl = 190
let escalar = 170
let vel = 0.01

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  frameRate(4)
}

function draw() {
  stroke(random(24))
 ellipse(mouseX,mouseY,random(20),random(20))
}