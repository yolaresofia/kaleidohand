let yoff = 0.0; 
let offset = 0

function setup() {
  cv = createCanvas(windowWidth, windowHeight);
  cv.position(0,0)
  cv.style('z-index','-1')

  background(250, 140, 0);

}

function draw() {
  noStroke()
  smooth()
  let r = random(100)
//  blendMode(BLEND)

  fill(mouseY - 190, (mouseX / 5) - 60, ((mouseY / 2) + 40), r);
 

  let xoff = 0;
  for (let x = 0; x <= 100; x += 1) {
  
    let y = map(noise(xoff, yoff), 0, 1, 20, windowHeight);

    vertex(x, y);
    
    xoff += 0.01;
    ellipse(200 + y + (mouseX / 2) * xoff / 2, 50 + y + (mouseY / 2000), y - (mouseX), y - mouseY)
   // stroke(223)
   
  }

  yoff += 0.01;
 
 

}