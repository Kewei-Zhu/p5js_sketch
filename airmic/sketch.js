

particles = [];
let amp;
let song;
// let airq;
var mic;
var img;

function setup() {
  createCanvas(windowWidth,windowHeight);
  // amp = new p5.Amplitude();
  // song.loop();
  mic = new p5.AudioIn();
  mic.start();
  // loadJSON('http://api.airvisual.com/v2/city?city=San%20Francisco&state=California&country=USA&key=nreYpo92oQagdtCk7');
}

 function gotData(data) {
 	airq = data;
 }

function preload() {
   // song = loadSound('Academy of Art University Library-[AudioTrimmer.com].m4a');
   img = loadImage('misc-cloud-smoke-element-png-by-dbszabo1-on-deviantart-19.png');
}

function draw() {
  background(0);
  let vol = mic.getLevel()*100;  
 	for (let i = 0; i < 1; i++) {
 		let p = new Particle(vol*5, vol*5, vol);
 		particles.push(p);
 	}
 	for (let i = particles.length-1; i > 0; i--) {
 		particles[i].show();
 		particles[i].update(vol);
 		if (particles[i].finished()){
 			particles.splice(i, 1);
 		}
 	}
}

class Particle {

 	constructor(vx, vy, s = 1) {
 		this.x = width/2;
 		this.y = height/2;
 		this.alpha = 225;
 		this.vx = (vx ) * random(-0.25,0.25);
 		this.vy = (vy ) * random(-0.25,0.25);
 	}

  finished() {
    return this.alpha < 0;
  }

  update(vol) {
		this.x += this.vx;
		this.y += this.vy;
		this.vy += random(-0.025,0.025);
		this.alpha--;
	}

  show() {
    noStroke();
    fill(255, this.alpha);
    // imageMode(CENTER);
    // image(img,this.x, this.y);
    ellipse(this.x, this.y, 100);
  }

}


