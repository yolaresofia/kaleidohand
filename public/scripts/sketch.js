// console.log("hello from index")
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
let osc, reverb;

let symmetry = 6;

let angle = 360 / symmetry;
let easing = 0.05;

let x = 1
let y = 1



function setup(){


    cnv = createCanvas(550, 550).parent("#mySketch");
    angleMode(DEGREES);
    video = createCapture(VIDEO);
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
    video.size(width, height);
    video.hide()
   
    pixelDensity(1);

    submitButton = select("#submitButton");
    submitButton.mousePressed(handleSubmit);

    

    
}
function modelReady() {
    console.log("model ready");
}
function draw(){
    background(220,0.4);
    drawKeypoints();
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
            stroke(random(255), random(255), random(255))
            strokeWeight(random(10));

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

    console.log(last_img)

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(output)
    }
    fetch(`/api`, options).then(result => {

        console.log('success')
    })

}



