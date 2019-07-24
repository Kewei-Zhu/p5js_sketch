var osc;
var playing;
var weather;

var symbol;
var symbolSize = 50;

var windspeed = 2;
var position;

var api = 'http://api.openweathermap.org/data/2.5/weather?q=london';
// var city = ['Ningbo','Seattle','San%20Francisco'];
// var city = 'Ningbo';
var apiKey = '&APPID=001B0F58045147663B1EA518D34D88B4';
// var input;

var charactors = [
//床前明月光，疑是地上霜,30097,26159,22320,19978,38684
24202,21069,26126,26376,20809,30097,26159,22320,19978,38684];
var streams = [];

// particles = []

var env;

// function getweather(){
// 	var url = api + apiKey;
// 	loadJSON(url,gotData);
// }

function gotData(data) {
	weather = data;
   	windspeed = weather.wind.speed;
}

function gotWind(windspeed){
	if (weather){
 	windspeed = weather.wind.speed;
 }
 return windspeed;
	}

function setup(){
	createCanvas(windowWidth,windowHeight);
	
	var url = api + apiKey;
	loadJSON(url,gotData);

	 var button = select('#submit');
	 button.mousePressed(toggle);

	// button.mousePressed(toggle);

	// input = select('#city');

	// env = new p5.Env();
	// env.setADSR(0.05, 0.1, 0.5, 0.1);
	// env.setRange(1,0);

	osc = new p5.Oscillator();
	osc.setType('sine');
	// osc.freq(0);

	// slider = createSlider(100, 1200, 440);

	// button_play = createButton('play/pause');
	// button_play.mousePressed(toggle);


	// symbol = new Symbol(0,0,windspeed,1);
	background(255);
}



function draw(){

   
	background(255);
	
	if (weather){
		windspeed = weather.wind.speed;
		console.log(windspeed+ "asign");
		osc.freq(weather.wind.speed*50);
	}

	var x = 0;
	for(var i = 0; i <5; i++) {
		var stream = new Stream();
		stream.generate(x,random(0,-19200));
		streams.push(stream);
		x += 1.1;
	}
	// particles.forEach(p=>{p,draw()});

	if (playing){
		streams.forEach(function(stream){
		stream.render();
		});
	} else{
		background(255);
	}
}





function toggle(){
	if(!playing){
		osc.amp(1,1);
		osc.start();
		playing = true;
	} else {
		osc.stop();
		osc.amp(0,1);
		playing = false;
	}
}

// class Particle{
// 	constructor(args) {
// 		let def = {
// 			p: new Vec2(0,0),
// 			v: new Vec2(0,0),
// 			a: new Vec2(0,0),
// 			r: 10,
// 			color:"#fff"
// 		}
// 		Object.assign(def,args);
// 		Object.assign(this,def);
// 	}
// }

function Symbol(x,y,xspeed,yspeed){
	this.x = x;
	this.y = y;
	this.value;
	this.xspeed = xspeed;
	this.yspeed = yspeed;
	this.switchInterval = round(random(2,200));
	this.textS;

	this.setToRandomSymbol = function(){
		if (frameCount % this.switchInterval == 0){
			this.value = String.fromCharCode(charactors[round(random(charactors.length -1))]);
		 }
	}

	this.setToRandomSize = function(){
		this.textS = textSize(random(5,20));
	}

	this.render = function(){
		fill(0);
		textSize(20);
		text(this.value, this.x, this.y);
		this.setToRandomSymbol();
		this.fallx();
		this.fally();
	}

	this.fallx = function() {
		if (this.x >= height){
			this.x = 0;
		} else{
			this.x += this.xspeed;
		}
	}
	this.fally = function() {
		if (this.y >= height){
			this.y = 0;
		} else{
			this.y += this.yspeed;
		}
	}
}

function Stream() {
	console.log(windspeed);
	this.symbols = [];
	this.totalSymbols = 0;
	this.xspeed = windspeed;
	this.yspeed = 1;

	this.generate = function(x, y){
			for (var i = 0; i <= this.totalSymbols; i++){
			symbol = new Symbol(x,y,this.xspeed,this.yspeed);
			symbol.setToRandomSymbol();
			this.symbols.push(symbol);
			y -= symbolSize;
		}
	}

	this.render = function(){
		this.symbols.forEach(function(symbol){
			fill(0);
			text(symbol.value, symbol.x, symbol.y);
			symbol.setToRandomSymbol();
			symbol.fallx();
			symbol.fally();
		});
	}
}

// function update(){
// 	time++;
// 	particles = particles.concat(Array.from({length:5},(d,i)=>{return new Particle({p})}));
// }

// class assignvector{
// 	constructor(x,y){
// 		this.x = x
// 		this.y = y
// 	}
// 	set(x,y){
// 		this.x = x
// 		this.y = y
// 	}
// 	move(x,y){
// 		this.x += x
// 		this.y += y
// 		return this
// 	}
// }
