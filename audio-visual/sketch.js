var sound;
var amp;
var accum = 0;
const SIDES = 6
const CRYSTAL_SIZE = 500



// Preload the sound file
function preload(){
    sound = loadSound("./music/In Love With A Ghost - comet.mp3");
}

function setup(){
    createCanvas( windowWidth, windowHeight );
    circleRGBA = color(10, 200, 180, 100);

    // Start playing the sound
    sound.play();

    amp = new p5.Amplitude( .5 );
    amp.setInput(sound);
    rectMode(CENTER)


}

function draw() {

    background( 255 );
    var level = amp.getLevel();

    var t = floor( sound.currentTime() ) % 5;
    accum += level;

    switch( t ){
        case 0:
            background(235, 255, 251);
            strokeWeight(3);
            noFill();
            for (var i = 1; i < 5000; i = i+1000){
                ellipse(width / 2, height / 2, level*i, level* i);
                strokeWeight(1);
            }
            break;
        case 1:
            background(239, 255, 235);
            rect( random(0, width), random(0, height), level*1000, level* 1000);
            var pos = map(noise(accum), 0, 1, 0, width );
            ellipse( pos, pos, level*500, level*500);
            break;
        case 2:
            background(255, 235, 254);
            rectMode(CENTER);
            push();
            for (var j = 0; j <10; j++){
                for(var i = 0; i < 5000; i= i +500){
                    rect( i, j, level * i, level *i);
                    rotate(accum/1000); 
                }
            }
            pop();
            break;
        case 3:
                background(255, 235, 254);
                push();
                translate(width/2, height/2)
                for (let i = 0; i <= 6; i++) {
                    ellipseMode(CORNER);
                    ellipse(0, 0, 100+level*500, 100+level*500);
                    rotate(accum/8);
                }
                pop();
                break;
        case 4:
            background(255, 253, 235);
            push();
            translate(width / 2, height / 2);
            ellipseMode(CENTER);
            rotate(-accum / 10);
            noFill();
            ellipse(0,0, 250+level*500, 250+level*500);
            pop();

            push();
            translate(width / 2, height / 2);
            ellipseMode(CORNER);
            rotate(accum);
            ellipse(0,0, 100+level*300, 100+level*300);
            pop();

            push();
            translate(width / 2, height / 2);
            ellipseMode(CORNER);
            rotate(accum - .25);
            noFill();
            ellipse(0,0, 100+level*300, 100+level*300);
            pop();

            break;
    }

}

function circles() {
    const numShapes = SIDES
    const angle = 360 / numShapes
    const shapeSize = (CRYSTAL_SIZE / 2) * 0.93
    const position = (CRYSTAL_SIZE / 2) - (shapeSize / 2)
    const strokeColor = getRandomFromPalette()
  
    noFill()
    stroke(strokeColor)
    strokeWeight(1)
    push()
    translate(width/2, height/2)
    for (let i = 0; i <= numShapes; i++) {
      ellipse(position, 0, shapeSize, shapeSize)
      rotate(angle)
    }
    pop()
  
  }

















