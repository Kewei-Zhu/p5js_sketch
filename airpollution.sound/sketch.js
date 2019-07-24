

particles = [];
let amp;
let song;
// let airq;
var mic;

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
   // img = loadImage('cloudlet_breathe.jpg');
}

function draw() {
  background(0);
  let vol = mic.getLevel()*80;  
 	for (let i = 0; i < 4; i++) {
 		n = Math.floor(random(6));
 		let p = new Particle(vol*-20, vol*-20, vol);
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

 	constructor(vx, vy, s = 6) {
 		this.x = width/2;
 		this.y = height/2;
 		this.s = s;
 		this.alpha = 225;
 		this.vx = (vx + 1) * random(-0.25,0.25);
 		this.vy = (vy + 1) * random(-0.25,0.25);
 	}

  finished() {
    return this.alpha < 0;
  }

  update(vol) {
		this.x += this.vx;
		this.y += this.vy;
		this.vy += random(-0.025,0.025);
		this.alpha--;
		this.s = map(this.s*vol, 0, 5, 0, 100);
	}

  show() {
    noStroke();
    fill(255, this.alpha);
    // image(this.x, this.y, 10);
    ellipse(this.x, this.y, 150);
  }

}


