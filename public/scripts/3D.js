let font;
let menu;

function preload() {
  font = loadFont('/resources/font3.ttf');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}


function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(font);
  textAlign(CENTER, BASELINE);
  canvas.position(0, 0);
  canvas.id('canvas3d')
  canvas.style('z-index', '-1');
  menu = select('.menu')
  menu.style('display', 'none');
}



function draw() {
  smooth()
    let time = millis();
  background(mouseX/15);

  textSize(150);
  rotateX(mouseX / 1000);
  rotateZ(mouseY/ 1134);
  rotateY(time/30%2000/1000)
  text('C', -320, -30);
  rotateY(mouseX/ 1200)
  text('R', -200, -30);
  rotateY(mouseX/ 12000)
  text('E', -90, -30);
  rotateY(mouseY/ 2200)
  text('A', 10, -30);
  rotateY(mouseY/ 1200)
  text('T', 120, -30);
  rotateY(mouseY/ 2000)
  text('E', 220, -30);
  
  text('C', -320, 90);
  rotateY(mouseX/ -1200)
  text('O', -210, 90);
  rotateY(mouseX/ 12000)
  text('N', -100, 90);
  rotateY(mouseY/ 2200)
  text('N', -60, 90);
  rotateY(mouseY/ 1200)
  text('E', 40, 90);
  rotateY(mouseY/ 1200)
  text('C', 120, 90);
  rotateY(mouseY/ 1200)
  text('T', 220, 90);
}

function mousePressed() {
  window.location.href = "/main";
 }