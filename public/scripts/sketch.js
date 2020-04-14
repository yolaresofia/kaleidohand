let capture;
let submitButton;
let locationData;
let state = 0;
let video;
let poseNet;
let poses = [];
let skeletons = [];

let keypoints = [];
let prevkeypoints = [];

let symmetry = 6;

let angle = 360 / symmetry;
let easing = 0.05;

let x = 1
let y = 1
let sliderSymmetry;
let strokeSize;
let knob
let succededDiv 

function setup(){


    cnv = createCanvas(500, 500).parent("#mySketch");
    angleMode(DEGREES);
    video = createCapture(VIDEO);
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
    video.size(width, height);
    video.hide()
   
    pixelDensity(1);

    submitButton = select("#submitButton");
    submitButton.mousePressed(handleSubmit);
    knob = select('#knob')

    //symmetry
    sliderSymmetry = createSlider(4, 12, 6, 1)
    sliderSymmetry.style('width', '80px');
    sliderSymmetry.parent("#knobs")
    sliderSymmetry.class('input');
    //size
    strokeSize = createSlider(2, 40, 10, 1)
    strokeSize.style('width', '80px');
    strokeSize.parent("#knobs")

    //R
    strokeR = createSlider(0, 250, 255, 1)
    strokeR.style('width', '80px');
    strokeR.parent("#knobs")
    //G
    strokeG = createSlider(0, 250, 0, 1)
    strokeG.style('width', '80px');
    strokeG.parent("#knobs")
    //B
    strokeB = createSlider(0, 250, 255, 1)
    strokeB.style('width', '80px');
    strokeB.parent("#knobs")
    background(255)
}

function modelReady() {
    console.log(".");
}

function draw(){
    background(220,0.4);
    drawKeypoints();
    symmetry = sliderSymmetry.value()
}

function drawKeypoints() {
    if (poses.length == 0) {
        return;
    }

    prevkeypoints = keypoints;
    keypoints = poses[0].pose.keypoints;
    rightw = keypoints[10].position;
    let ran1 = random(255)
    fill(ran1)
    translate(width / 2, height / 2);

    // EASING 

    let targetX = rightw.x;
    let dx = targetX - x;
    x += dx * easing;

    let targetY = rightw.y;
    let dy = targetY - y;
    y += dy * easing;

    // Kaleidoscope 

    if (rightw.x > 0 && rightw.x < width && rightw.y > 0 && rightw.y < height) {
        let mx = x - width / 2;
        let my = y - height / 2;
        let pmx = x - width / 2;
        let pmy = y - height / 2;


        for (let i = 0; i < symmetry; i++) {
            rotate(angle);
            stroke(strokeR.value(), strokeG.value(), strokeB.value())
            strokeWeight(random(strokeSize.value()));

            line(mx, my, pmx, pmy);
            push();
            scale(1, -1);
            line(mx, my, pmx, pmy);
            pop();
        }
    }
}

function gotPoses(results) {
    poses = results;
}

function handleSubmit(e){
    let output = {
        location: {},
        image: ''
    }
    const last_img = get()
    output.image = last_img.canvas.toDataURL()
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(output)
    }
    fetch('/api', options)
    .then(() => { appendSucces()})
    .catch(err => console.log(err));

}

function appendSucces(){
    setTimeout(() => {
        removeD() 
    }, 2000);
    
    succededDiv = createDiv('Created!')
    succededDiv.class('succededDiv')
    succededDiv.style('width','50px')
    succededDiv.parent("#knobs")
    let notLoggedIn = select('#notLogged')
    notLoggedIn.style('display','inline')

   // notLoggedIn.style('right','300px')
}


function removeD() {
   succededDiv.remove()
}





