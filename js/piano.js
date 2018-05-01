const $ = document.querySelector.bind(document);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const cE = (element) => document.createElement(element);


// ===== GLOBALS, ELEMENTS AND EVENTLISTENERS ===== //


const audioCtx = new AudioContext();

const wrapperEl = $('.wrapper');
const keysWrapperEl = $('.keys');
const selectedOctaveEl = $('.js-octave-min');
const octaveDecrementButtonEl = $('.js-octave-decrement');
const octaveIncrementButtonEl = $('.js-octave-increment');


octaveDecrementButtonEl.addEventListener('click', handleOctaveDecrementClick);
octaveIncrementButtonEl.addEventListener('click', handleOctaveIncrementClick);
var v;
// var count;
// var threshhold;
var relativePower;

var tempoSelected = document.querySelector('#tempoSelect');
// On / off button
var btn = document.querySelector('#startstop');

btn.addEventListener('click', updateBtn);

let threshhold = 1000;
let count = 0;


function updateBtn() {
  if (btn.value === 'Start') {
    btn.value = 'Stop';
    r = setInterval(function(){updateRange();}, 1);
//    v = setInterval(function(){inputtopiano(relativePower);}, getTempo());

    btn.innerHTML = "Stop";
  }
  else if (btn.value === 'Stop'){
    btn.value = 'Start';
    clearInterval(r);
    count = 0;
//    clearInterval(v);
    btn.innerHTML = "Start";
  }
}
//var b=0;
//Start of code for Range Bar:
var range = document.querySelector('#formControlRange');
function updateRange() {
  var b = socket.getBeta();
  var a = socket.getAlpha();
  var t = socket.getTheta();
  relativePower=b/(t+a);

  range.value = relativePower;
  count++;
  getTempo();
  if(count >= threshhold){
      inputtopiano();
      count = 0;
  }

}
function getTempo(){
  if(tempoSelected.value==='1'){
    threshhold = 400;
  }
  else if(tempoSelected.value==='2'){
    threshhold = 200;
  }
  else if(tempoSelected.value==='4'){
    threshhold = 100;
  }
  else if(tempoSelected.value==='8'){
    threshhold = 50;
  }
  else{
    threshhold = 25;
  }
}
// ===== DATA ===== //

// Link to OSC data
socket = new NodeSocket();

function inputtopiano() {
    console.log(relativePower);
    if(relativePower < 0.4){
       $("#c"+selectedOctave).click()
    }
    else if(relativePower<0.8){
        $("#d"+selectedOctave).click()
    }
    else if(relativePower<1.2){
         $("#e"+selectedOctave).click()
    }
    else if (relativePower<1.6) {
	       $("#f"+selectedOctave).click()
    }
     else if  (relativePower<2.0) {
	       $("#g"+selectedOctave).click()
    }
    else if (relativePower<2.4 ){
	       $("#a"+selectedOctave).click()
    }
    else{
      $("#b"+selectedOctave).click()
    }
    count = 0;

if (btn.value === 'Start'){

clearInterval(v);}
}
//=====================================================================//

const OCTAVE_MIN = 0;
const OCTAVE_MAX = 9;

let selectedOctave = 4;
let selectedWaveform = "sine";

const frequencyColors = ["#ff0000", "#ff4e00", "#db7b01", "#ffcd01", "#e4ed00", "#81d700", "#02feb4", "#01ffeb", "#01baff", "#3c00ff", "#a801ff", "#fe00fd", "#ff0000", "#ff4e00", "#db7b01", "#ffcd01", "#e4ed00", "#81d700", "#02feb4", "#01ffeb", "#01baff", "#3c00ff", "#a801ff", "#fe00fd"];

const keys = ['c', 'cis', 'd', 'dis', 'e', 'f', 'fis', 'g', 'gis', 'a', 'ais', 'b'];

updateControlEls();
drawKeys();
// ===== LOGIC ===== //


function drawKeys() {
    keysWrapperEl.innerHTML = '';

    const frequenciesToDraw = getFreqs(selectedOctave);

    frequenciesToDraw.forEach(freqObj => {
        Object.keys(freqObj).forEach((freqKey, freqIndex) => {
            const freq = freqObj[freqKey];
            const keyEl = cE('div');
            let keyClassName = 'key key--';

            if (freqKey.indexOf('is') > -1) {
                keyClassName += 'black';
            } else {
                keyClassName += 'white';
            }
            keyEl.className = keyClassName;

            keyEl.innerHTML = `${formatFrequency(freq)}<br>${freqKey}`;
			keyEl.id = freqKey

          keyEl.addEventListener('click', () => handleKeyClick(keyEl, freq, freqIndex));

            keysWrapperEl.appendChild(keyEl);
        });
    });
}

function playSound(freq) {
    // oscillator controls frequency input, gain controls volume (amplitude)
    const oscillatorNode = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    getWavey();
    oscillatorNode.type = selectedWaveform;
    oscillatorNode.frequency.value = freq;

    oscillatorNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillatorNode.start();
    gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        audioCtx.currentTime + 1.5
    );
}

function handleOctaveChange(e, posneg) {
    e.preventDefault();
    selectedOctave += posneg;
    //updateBackground();
    drawKeys();
}

function handleOctaveDecrementClick(e) {
    e.preventDefault();
    selectedOctave--;
    updateControlEls();
    drawKeys();
}

function handleOctaveIncrementClick(e) {
    e.preventDefault();
    selectedOctave++;
    updateControlEls();
    drawKeys();
}

function getWavey(){
  if(waveform.value==='triangle'){
    selectedWaveform="triangle";
  }
  else if(waveform.value==='sawtooth'){
    selectedWaveform="sawtooth";
  }
  else if(waveform.value==='square'){
    selectedWaveform="square";
  }
  else{
      selectedWaveform="sine";
  }
}
// ===== HELPERS ===== //

function handleKeyClick(keyEl, freq, ind) {
    playSound(freq);
   //updateBackground(keyEl, ind);
}

/*function updateBackground(key, index) {
    keyEl.key.key--white:active.style.backgroundImage = frequencyColors[index];
}*/

function updateControlEls() {
    selectedOctaveEl.innerHTML = selectedOctave;
}

function formatFrequency(f) {
    return String(f).split('.')[0];
}

function getFreq(keyIndex) {
	return 440 * (2 ** ((keyIndex - 58) / 12));
}

function getFreqs(min) {
	const result = [];
	let keyIndex = 12 * min;


	const freqObj = {};
	keys.forEach((key, index) => {
		keyIndex++;
		freqObj[key + min] = getFreq(keyIndex);
	});
		result.push(freqObj);


	return result;
};
