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

// On / off button
var btn = document.querySelector('input');

btn.addEventListener('click', updateBtn);

function updateBtn() {
  if (btn.value === 'Start') {
    btn.value = 'Stop';
	v=   setInterval(function(){inputtopiano();}, 1000);

  } else if (btn.value === 'Stop'){
    btn.value = 'Start';
	clearInterval(v);

    //clearInterval(myVar);
  }
}

// ===== DATA ===== //


// Link to OSC data
socket = new NodeSocket();





function inputtopiano() {

var b = socket.getBeta();
var a = socket.getAlpha();
var t = socket.getTheta();
b=b/(t+a);
//console.log("b="+b+"  a="+a+"  t="+t);

    if(b > 0.0 && b<0.4){
      //$("#c"+selectedOctave).onkeydown();
       $("#c"+selectedOctave).click()
         document.getElementById("output5").innerHTML=document.getElementById("output4").innerHTML
         document.getElementById("output4").innerHTML=document.getElementById("output3").innerHTML
         document.getElementById("output3").innerHTML=document.getElementById("output2").innerHTML
         document.getElementById("output2").innerHTML=document.getElementById("output1").innerHTML
         document.getElementById("output1").innerHTML=("c4, b="+b);

   }
   else if(b > 0.4 && b<0.8){
      $("#d"+selectedOctave).click()
        document.getElementById("output5").innerHTML=document.getElementById("output4").innerHTML
        document.getElementById("output4").innerHTML=document.getElementById("output3").innerHTML
        document.getElementById("output3").innerHTML=document.getElementById("output2").innerHTML
        document.getElementById("output2").innerHTML=document.getElementById("output1").innerHTML
      document.getElementById("output1").innerHTML=("d4, b="+b);
   }
   else if(b > 0.8 && b<1.2){
      $("#e"+selectedOctave).click()
        document.getElementById("output5").innerHTML=document.getElementById("output4").innerHTML
        document.getElementById("output4").innerHTML=document.getElementById("output3").innerHTML
        document.getElementById("output3").innerHTML=document.getElementById("output2").innerHTML
        document.getElementById("output2").innerHTML=document.getElementById("output1").innerHTML
      document.getElementById("output1").innerHTML=("e4, b="+b);
   }
   else if (b > 1.2 && b<1.6) {
	    $("#f"+selectedOctave).click()
        document.getElementById("output5").innerHTML=document.getElementById("output4").innerHTML
        document.getElementById("output4").innerHTML=document.getElementById("output3").innerHTML
        document.getElementById("output3").innerHTML=document.getElementById("output2").innerHTML
        document.getElementById("output2").innerHTML=document.getElementById("output1").innerHTML
      document.getElementById("output1").innerHTML=("f4, b="+b);
   }
    else if  (b > 1.6 && b<2.0) {
	     $("#g"+selectedOctave).click()
       document.getElementById("output5").innerHTML=document.getElementById("output4").innerHTML
       document.getElementById("output4").innerHTML=document.getElementById("output3").innerHTML
       document.getElementById("output3").innerHTML=document.getElementById("output2").innerHTML
       document.getElementById("output2").innerHTML=document.getElementById("output1").innerHTML
       document.getElementById("output1").innerHTML=("g4, b="+b);
   }
   else{
	     $("#a"+selectedOctave).click()
       document.getElementById("output5").innerHTML=document.getElementById("output4").innerHTML
       document.getElementById("output4").innerHTML=document.getElementById("output3").innerHTML
       document.getElementById("output3").innerHTML=document.getElementById("output2").innerHTML
       document.getElementById("output2").innerHTML=document.getElementById("output1").innerHTML
       document.getElementById("output").innerHTML=("a4, b="+b);
    
   }
  
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
            //inputtopiano();
        });
    });
}

function playSound(freq) {
    // oscillator controls frequency input, gain controls volume (amplitude)
    const oscillatorNode = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

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

// ===== HELPERS ===== //

function handleKeyClick(keyEl, freq, ind) {
    playSound(freq);
    //updateBackground(keyEl, ind);
}

function updateBackground(key, index) {
    wrapperEl.style.backgroundColor = frequencyColors[index];
}

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

/* if(btn.value === 'Start') {
     setInterval(function(){inputtopiano();}, 1000);
  } 

function myStopFunction() {
    
} */
// ===== DRAW EVENTS ===== //
	  //if (btn.value=='Stop'){ var v=   setInterval(function(){inputtopiano();}, 1000)}


//updateControlEls();
//drawKeys();
