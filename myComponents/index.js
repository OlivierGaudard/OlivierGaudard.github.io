
import './lib/webaudio-controls.js';

const getBaseURL = () => {
  const base = new URL('.', import.meta.url);
  console.log("Base = " + base);
	return `${base}`;
};

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
}

const displayDuration = (player, duration) => {
  duration.innerHTML = calculateTime(player.duration);
}

const displayCurrentTime = (player, current_time) => {
  current_time.innerHTML = calculateTime(player.currentTime);
}

const template = document.createElement("template");
template.innerHTML = `

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia">

  <style>

  @font-face {
    font-family: Marvelan;
    src: url('./myComponents/assets/font/Fruktur-Regular.ttf');
  }

    H1 {
      font-family: "Sofia", sans-serif;
      color: white;
    }

    H2 {
        color: white;
  }

    .progress_bar {
      height: 10px;
      width: 300px;
      background-color: white;
      margin-top:10px;
      margin-left:10px;
      margin-right:10px;
      
    }

    .progressed {
        height: 10px;
        background-color: #e8d082;
        width: 0%;
        transition: all 1s;
        position: relative;
        
    }

    .progressed:after{
      content: '';
      position: absolute;
      right: -10px;
      top: -5px;
      width: 20px;
      height: 20px;
      border-radius: 10px;
      background-color:#d6aa6f;

    }

    .box {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      vertical-align: middle;
      line-height: normal;
    }

    .current_time{
      margin-left:10px;
      margin-top: 5px;

    }

    .duration{
      margin-top:5px;
    }

    .vol{
      margin-top:5px;
    }

    input[type="image"]{
      height: auto; 
      width: auto; 
      max-width: 30px; 
      max-height: 30px;
      margin-left:10px;
    }

    .options{
      display: flex;
      justify-content: center;
    }

    .selectors{
      display: flex;
      justify-content: center;
    }

    .container{
      display: flex;
      flex-direction: column;
      border: 1px solid grey;
      border-radius: 25px;
      width: 40%;
      background-image: url("./myComponents/assets/imgs/background.jpg");
      
    }

    .knobFlex{
        display:flex;
        justify-content: center;
    }

    .canvasFlex{
        display: flex;
    }

    span{
        color:white;
    }

    webaudio-knob{
        padding: 5%;
    }

    .myCanvas{
        width: 98%;
        height: 100px;
    }

    .slidersFlex{
        display: flex;
        justify-content: center;
        
    }

    .knbBalance{
      margin-top: 3%;
    }
    webaudio-slider{
        padding: 5%;
    }
    
    ul{
      list-style:none;
    }

  </style>
  
  <audio id="myPlayer" crossorigin="anonymous">
    </audio>

    <div class="container">
      <h1 style="text-align:center";> Lecteur audio </h1>
      <h2  id="title" style="text-align:center";> ACDC - Thunderstruck </h2>
      
      <div class="selectors">
      
      <ul id="playlist">

      <li data-sound="./myComponents/sounds/acdc-thunderstruck.mp3">
        <input type="image" class="changeSound" id="sound0" src="./myComponents/assets/imgs/currentPlay.png" />
        <span>ACDC - Thunderstruck</span>
      </li>

        <li data-sound="./myComponents/sounds/red-hot-chili-peppers-snow.mp3">
          <input type="image" class="changeSound" id="sound1" src="./myComponents/assets/imgs/play.png" />
          <span>Red Hot Chili Peppers - Snow </span>
        </li>
        <li data-sound="./myComponents/sounds/sweet-home-alabama.mp3">
          <input type="image" class="changeSound" id="sound2" src="./myComponents/assets/imgs/play.png" />
          <span>Lynyrd Skynyrd - Sweet Home Alabama</span>
        </li>
        <li data-sound="./myComponents/sounds/metallica-enter-sandman.mp3">
          <input type="image" class="changeSound" id="sound3" src="./myComponents/assets/imgs/play.png" />
          <span>Metallica - Enter Sandman</span>
        </li>
      </ul>

      <webaudio-knob id="aiguilleKnob"
      src="./myComponents/assets/imgs/Vintage_VUMeter.png"
      width="128" height="128"
      value=0 min=0 max=100 step=1>
      </webaudio-knob>
    </div>

      <div class="box">
      <input type="image" class="playAndPauseButton" id="playAndPauseButton" src="./myComponents/assets/imgs/play.png" />
      <span class="current_time" id="current_time"></span>
      <div class="progress_bar" id="progress_bar">
        <div class="progressed" id="progressed"></div>
      </div>



      <span class="duration" id="duration"></span>
      <input width="64" height="64" type="image" class="loop" id="loop" src="./myComponents/assets/imgs/loopOffStyled.png" />
      <input type="image" class="mute" id="mute" src="./myComponents/assets/imgs/sound.png" />

      </div>


      <div class="options">
      <input type="image" class="previousSong" id="previousSong" src="./myComponents/assets/imgs/previousSong.png" />
      <input type="image" class="removeTime" id="removeTime" src="./myComponents/assets/imgs/back.png" />
      <input type="image" class="restartButton" id="restartButton" src="./myComponents/assets/imgs/restart.png" />
      <input type="image" class="addTime" id="addTime" src="./myComponents/assets/imgs/foward.png" />
      <input type="image" class="nextSong" id="nextSong" src="./myComponents/assets/imgs/nextSong.png" />

    </div>

    <div class="knobFlex">
    
    <webaudio-knob id="knbBalance" class="knbBalance"
    src="./myComponents/assets/imgs/equalizer.png" sprites="30" 
    width="128" height="32"
    value="0" min="-1" max="1" step="0.1"><span> Balance </span>
  </webaudio-knob>

    <webaudio-knob id="volumeKnob"
    src="./myComponents/assets/imgs/rotate.png" 
    value=0.5 min=0 max=1 step=0.01 
    diameter="64" 
    tooltip="Volume: %s"><span> Volume </span>
    </webaudio-knob>

    <webaudio-knob id="speedKnob" 
    src="./myComponents/assets/imgs/rotate.png" 
    value=1 min=0 max=4 step=0.25
    diameter="64" 
    tooltip="Vitesse: %s"><span> Vitesse </span>
</webaudio-knob>

<webaudio-switch id="switch" 
src="./myComponents/assets/imgs/switch_toggle.png" sprites="2" 
width="56" height="56"
style="margin-top:4.5vh;"><span> Switch </span>
</webaudio-switch>
</div>
      
            

        <div class="slidersFlex">
            <div>
              <span>60Hz</span>
                <webaudio-knob id="gain0" 
                src="./myComponents/assets/imgs/sliderVertical.png"
                width="24" height="128" sprites="127" 
                value="0" step="1" min="-30" max="30">0 dB
                </webaudio-knob>
              </div>
            <div>
              <span>170Hz</span>
                <webaudio-knob id="gain1" 
                src="./myComponents/assets/imgs/sliderVertical.png"
                width="24" height="128" sprites="127" 
                value="0" step="1" min="-30" max="30">0 dB
                </webaudio-knob>
              </div>
            <div>
              <span>350Hz</span>
                <webaudio-knob id="gain2" 
                src="./myComponents/assets/imgs/sliderVertical.png"
                width="24" height="128" sprites="127" 
                value="0" step="1" min="-30" max="30">0 dB
                </webaudio-knob>
              </div>
            <div>
              <span>1000Hz</span>
                <webaudio-knob id="gain3" 
                src="./myComponents/assets/imgs/sliderVertical.png"
                width="24" height="128" sprites="127" 
                value="0" step="1" min="-30" max="30">0 dB
                </webaudio-knob>
              </div>
            <div>
              <span>3500Hz</span>
              <webaudio-knob id="gain4" 
              src="./myComponents/assets/imgs/sliderVertical.png"
              width="24" height="128" sprites="127" 
              value="0" step="1" min="-30" max="30">0 dB
              </webaudio-knob>
            </div>
            <div>
              <span>10000Hz</span>
                <webaudio-knob id="gain5" 
                src="./myComponents/assets/imgs/sliderVertical.png"
                width="24" height="128" sprites="127"  
                value="0" step="1" min="-30" max="30"> 0 dB
                </webaudio-knob>
              </div>
        
        </div>


<canvas class="myCanvas" id="myCanvas" width: 100px height: 100px></canvas>

    </div>
        `;

class MyWebAudioPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    //this.shadowRoot.innerHTML = template;
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.basePath = getBaseURL(); // url absolu du composant

    // Fix relative path in WebAudio Controls elements

    
  }

  connectedCallback() {
    this.player = this.shadowRoot.querySelector("#myPlayer");
    this.player.src = this.getAttribute("src");
    this.progressed = this.shadowRoot.querySelector("#progressed");
    this.progress_bar = this.shadowRoot.querySelector("#progress_bar");
    this.current_time = this.shadowRoot.querySelector("#current_time");
    this.duration = this.shadowRoot.querySelector("#duration");
    this.playAndPauseButton = this.shadowRoot.querySelector("#playAndPauseButton");
    this.loopButton = this.shadowRoot.querySelector("#loop");
    this.mute = this.shadowRoot.querySelector("#mute");
    this.aiguille = this.shadowRoot.querySelector("#aiguilleKnob");
    this.switch = this.shadowRoot.querySelector("#switch");
    this.playlist = this.shadowRoot.querySelector("#playlist").children;

    // récupérer le canvas
    this.canvas = this.shadowRoot.querySelector("#myCanvas");
    this.ctx = this.canvas.getContext("2d");

    // Récupération du contexte WebAudio
    this.audioCtx = new AudioContext();

    this.player.loop = false;
    this.duration.innerHTML = "0:00";
    this.currentPlay = 0;
    this.buffer = 0;
    this.player.src = this.playlist[this.currentPlay].dataset.sound;
    
    
    this.player.ontimeupdate = (e) => {
      this.progressed.style.width = Math.floor(100*this.player.currentTime / this.player.duration)+"%";

      displayCurrentTime(this.player, this.current_time);


      if(this.duration.innerHTML == "NaN:NaN") {
        displayDuration(this.player, this.duration);
      }

      if(this.player.ended)
      {
        if(this.player.loop == false)
        {
          this.shadowRoot.querySelector("#sound"+ this.currentPlay).src = "./myComponents/assets/imgs/play.png"
          this.currentPlay++;
          if(this.currentPlay >= this.playlist.length)
          {
            this.currentPlay = 0;
          }
 
          this.changeSound(this.playlist[this.currentPlay].dataset.sound);
          this.shadowRoot.querySelector("#title").innerHTML = this.playlist[this.currentPlay].innerText;
          this.shadowRoot.querySelector("#sound"+ this.currentPlay).src = "./myComponents/assets/imgs/currentPlay.png"
        }
      }

    }

    this.declareListeners();


    this.buildAudioGraph();
    
    requestAnimationFrame(() => {
      this.animationLoop();
    });


    // on démarre l'animation
    
    
  }

  buildAudioGraph() {
    let audioContext = this.audioCtx;

    let playerNode = audioContext.createMediaElementSource(this.player);

    // Create an analyser node
    this.analyserNode = audioContext.createAnalyser();
    this.pannerNode = audioContext.createStereoPanner();

    // Try changing for lower values: 512, 256, 128, 64...
    this.analyserNode.fftSize = 256;
    this.bufferLength = this.analyserNode.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    let filters = [];

    [60, 170, 350, 1000, 3500, 10000].forEach(function(freq) {
      var eq = audioContext.createBiquadFilter();
      eq.frequency.value = freq;
      eq.type = "peaking";
      eq.gain.value = 0;
      filters.push(eq);
    });

    // Connect filters in serie
    playerNode.connect(filters[0]);
    for(var i = 0; i < filters.length - 1; i++) {
      filters[i].connect(filters[i+1]);
    }

    filters[filters.length - 1].connect(audioContext.destination);


    this.filters = filters;
    // lecteur audio -> analyser -> haut parleurs
    playerNode.connect(this.analyserNode);
    this.analyserNode.connect(audioContext.destination);

    playerNode.connect(this.pannerNode);
    this.pannerNode.connect(audioContext.destination);
}

visualize() {
  // clear the canvas
  // like this: canvasContext.clearRect(0, 0, width, height);

  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  
  // Or use rgba fill to give a slight blur effect
  this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
  // Get the analyser data
  this.analyserNode.getByteTimeDomainData(this.dataArray);

  this.ctx.lineWidth = 2;
  this.ctx.strokeStyle = 'Moccasin';

  // all the waveform is in one single path, first let's
  // clear any previous path that could be in the buffer
  this.ctx.beginPath();
  
  var sliceWidth = this.canvas.width / this.bufferLength;
  var x = 0;

  for(var i = 0; i < this.bufferLength; i++) {
     var v = this.dataArray[i] / 255;
     var y = v * this.canvas.height;

     if(i === 0) {
      this.ctx.moveTo(x, y);
     } else {
      this.ctx.lineTo(x, y);
     }

     x += sliceWidth;
  }

  this.ctx.lineTo(this.canvas.width, this.canvas.height/2);
  
  // draw the path at once
  this.ctx.stroke();  
  
  // call again the visualize function at 60 frames/s
  requestAnimationFrame(() => {
    this.visualize();
});
  
}


animationLoop() {
// 1 on efface le canvas
this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

// 2 on dessine les objets
//this.ctx.fillRect(10+Math.random()*20, 10, 100, 100);
// Get the analyser data
this.analyserNode.getByteFrequencyData(this.dataArray);

let barWidth = this.canvas.width / this.bufferLength;
let barHeight;
let x = 0;

// values go from 0 to 256 and the canvas heigt is 100. Let's rescale
// before drawing. This is the scale factor
let heightScale = this.canvas.height / 128;

for (let i = 0; i < this.bufferLength; i++) {
    barHeight = this.dataArray[i];
    this.aiguille.value = this.dataArray[20] / 3 + 10;
    

    
    //this.ctx.fillStyle = 'rgb(' + (barHeight + 10) + ',' + (barHeight+50) + ',' + (barHeight+130) + ')';
    this.ctx.fillStyle = 'rgb(235,' + (barHeight + 80) + ',130)';

    //this.ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';

    barHeight *= heightScale;
    this.ctx.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight / 2);

    // 2 is the number of pixels between bars
    x += barWidth + 1;
}
// 3 on deplace les objets

// 4 On demande au navigateur de recommencer l'animation
requestAnimationFrame(() => {
    this.animationLoop();
});
}

  
  declareListeners() {
    this.shadowRoot.querySelector("#playAndPauseButton").addEventListener("click", () => {
      this.playAndPause();
    });

    this.shadowRoot.querySelector("#restartButton").addEventListener("click", () => {
      this.restart();
    });

    this.shadowRoot.querySelector("#addTime").addEventListener("click", () => {
      this.addTime();
    });

    this.shadowRoot.querySelector("#removeTime").addEventListener("click", () => {
      this.removeTime();
    });

    this.shadowRoot.querySelector("#loop").addEventListener("click", () => {
      this.loop();
    });

    this.shadowRoot.querySelector("#progress_bar").addEventListener("click", (event) => {
      this.moveToClick(event);
    });

    this.shadowRoot.querySelector("#volumeKnob").addEventListener("input", (event) => {
        this.setVolume(event.target.value);
      });

    this.shadowRoot.querySelector("#speedKnob").addEventListener("input", (event) => {
        this.vitesse(event.target.value);
        //console.log("vitesse =  " + this.player.playbackRate);
    });

    this.shadowRoot.querySelector("#knbBalance").addEventListener("input", (event) => {
      this.balance(event.target.value);
  });

    this.shadowRoot.querySelector("#gain0").addEventListener("input", (event) => {
      this.changeGain(event.target.value,0);
  });
    this.shadowRoot.querySelector("#gain1").addEventListener("input", (event) => {
      this.changeGain(event.target.value,1);
  });

  this.shadowRoot.querySelector("#gain2").addEventListener("input", (event) => {
    this.changeGain(event.target.value,2);
  });

  this.shadowRoot.querySelector("#gain3").addEventListener("input", (event) => {
    this.changeGain(event.target.value,3);
  });

  this.shadowRoot.querySelector("#gain4").addEventListener("input", (event) => {
    this.changeGain(event.target.value,4);
  });

  this.shadowRoot.querySelector("#gain5").addEventListener("input", (event) => {
    this.changeGain(event.target.value,5);
  });
  

  this.shadowRoot.querySelector("#mute").addEventListener("click", () => {
        this.muted();
      });
    
  this.shadowRoot.querySelector("#switch").addEventListener("click", () => {
        this.switchVisualize();
      });

  this.shadowRoot.querySelector("#nextSong").addEventListener("click", () => {
    this.nextSong();
  });

  this.shadowRoot.querySelector("#previousSong").addEventListener("click", () => {
    this.previousSong();
  });

  for(var i = 0; i < this.playlist.length; i++) { 
    this.shadowRoot.querySelector("#sound"+i).addEventListener('click', (e) => {

      this.shadowRoot.querySelector("#title").innerHTML = e.path[1].innerText;
      this.shadowRoot.querySelector("#sound"+ this.currentPlay).src = "./myComponents/assets/imgs/play.png"
      var nb = e.path[0].id;
      var numb = nb.match(/\d/g);
      numb = numb.join("");
      this.currentPlay = parseInt(numb);
      this.shadowRoot.querySelector("#sound"+ this.currentPlay).src = "./myComponents/assets/imgs/currentPlay.png"
      this.changeSound(e.path[1].dataset.sound);
    });
  }
    
  }

  // API
  setVolume(val) {
    this.player.volume = val;
  }

  playAndPause(newSrc="") {
    if(this.player.paused){

      if(newSrc!="") this.player.src = newSrc;
      this.player.play();
      this.audioCtx.resume();
      
      this.playAndPauseButton.innerText = "Pause";
      this.playAndPauseButton.src="./myComponents/assets/imgs/pause.png"
      displayDuration(this.player, this.duration);

    }
    else{

      if(newSrc!="") this.player.src = newSrc;
      this.player.pause();
      this.playAndPauseButton.src="./myComponents/assets/imgs/play.png"
      this.playAndPauseButton.innerText = "Play";
    }
  }

  restart(){
    this.player.currentTime = 0;
  }

  addTime(){
    this.player.currentTime += 10;
  }

  removeTime(){
    this.player.currentTime -= 10;
  }

  loop(){
    if(this.player.loop){
      this.player.loop = false;
      this.loopButton.src="./myComponents/assets/imgs/loopOffStyled.png"
    }
    else
    {
      this.player.loop = true;
      this.loopButton.src="./myComponents/assets/imgs/loopOnStyled.png"
    }
  }

  moveToClick(e){
    this.player.currentTime = ((e.offsetX/this.progress_bar.offsetWidth) * this.player.duration);

  }

  muted(){
    if(this.player.muted){
      this.player.muted = false;
      this.mute.src="./myComponents/assets/imgs/sound.png"
    }
    else
    {
      this.player.muted = true;
      this.mute.src="./myComponents/assets/imgs/mute.png"
    }
  }

  vitesse(e){
    this.player.playbackRate = parseFloat(e);
  }

  balance(e) {
    this.pannerNode.pan.value = parseFloat(e);
  }

  changeGain(sliderVal,nbFilter) {
    var value = parseFloat(sliderVal);
    this.filters[nbFilter].gain.value = value;
    
    // update output labels
    var output = this.shadowRoot.querySelector("#gain"+nbFilter);
    output.innerHTML = value + " dB";
  }
  switchVisualize(){
    
    if(this.switch.value == 0) {
      requestAnimationFrame(() => {
        this.animationLoop();
    });
    }
    else {
      requestAnimationFrame(() => {
        this.visualize();
    });
    }
  }

  changeSound(src) {
    // if(this.player.paused) {

      this.player.src = src;
      this.audioCtx.resume();
      this.player.play();
      this.audioCtx.resume();
      displayDuration(this.player, this.duration);
            
      this.playAndPauseButton.innerText = "Pause";
      this.playAndPauseButton.src="./myComponents/assets/imgs/pause.png"
  }

  nextSong(){
    this.shadowRoot.querySelector("#sound"+ this.currentPlay).src = "./myComponents/assets/imgs/play.png"
    this.currentPlay++;
    if(this.currentPlay >= this.playlist.length)
    {
      this.currentPlay = 0;
    }

    this.changeSound(this.playlist[this.currentPlay].dataset.sound);
    this.shadowRoot.querySelector("#title").innerHTML = this.playlist[this.currentPlay].innerText;
    this.shadowRoot.querySelector("#sound"+ this.currentPlay).src = "./myComponents/assets/imgs/currentPlay.png"
  }
  
  previousSong(){
    this.shadowRoot.querySelector("#sound"+ this.currentPlay).src = "./myComponents/assets/imgs/play.png"
    this.currentPlay--;
    if(this.currentPlay < 0)
    {
      this.currentPlay = 0;
    }

    this.changeSound(this.playlist[this.currentPlay].dataset.sound);
    this.shadowRoot.querySelector("#title").innerHTML = this.playlist[this.currentPlay].innerText;
    this.shadowRoot.querySelector("#sound"+ this.currentPlay).src = "./myComponents/assets/imgs/currentPlay.png"
  }
}

customElements.define("my-webaudioplayer", MyWebAudioPlayer);
