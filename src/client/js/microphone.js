window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var audioInput = null, 
    realAudioInput = null,
    inputPoint = null;
var rafId = null;
var analyserContext = null;
var recIndex = 0;
var audioData;
var freqByteData = [];
var frequency = [0,0];

// PITCH STUFF
var tracks = null;
var buflen = 1024;
var buf = new Float32Array( buflen );
var MIN_SAMPLES = 0;
var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];



function updateAnalysers() {
    var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);
    analyserNode.getByteFrequencyData(freqByteData);
    
    
    // PITCH STUFF
    // var cycles = new Array;
    analyserNode.getFloatTimeDomainData( buf );
    var pitch = autoCorrelate( buf, audioContext.sampleRate );



    // limit framerate
    setTimeout(function(){


        // PITCH STUFF
        frequency.push((Math.round(pitch)));
        frequency.shift();
        console.log(frequency);
        // console.log(Math.round( pitch ) );
        var note =  noteFromPitch( pitch );
        // console.log(noteStrings[note%12]);

        // console.log(freqByteData);
        // logFreq();

        rafId = window.requestAnimationFrame(updateAnalysers);
    }, 1000 / 5);
}

function logFreq(){
    
    if (frequency[1] > frequency[0] 
        && (frequency[1] - frequency[0]) > 10
        && (!(frequency[1] === -1))){
        // console.log(frequency);
        // console.log("up");
        return cube.vy = -5;
    }
    if (frequency[1] < frequency[0]
        && (frequency[0] - frequency[1]) > 10
        && (!(frequency[0] === -1))){
        // console.log(frequency);
        // console.log("down");
        return cube.vy = 5;
    }
    if (frequency[1] === -1
        && frequency[0] === -1) {
        if (cube.y > renderer.height/2) {
            return cube.vy = -10;
        }
        if (cube.y < renderer.height/2) {
            return cube.vy = 10;
        }
        if (cube.y === renderer.height/2){
            return cube.vy = 0;
        }

        
    }
    // return cube.vy = 0;
}



function noteFromPitch( frequency ) {
    var noteNum = 12 * (Math.log( frequency / 440 )/Math.log(2) );
    return Math.round( noteNum ) + 69;
}


function gotStream(stream) {
    inputPoint = audioContext.createGain();

    audioInput = audioContext.createMediaStreamSource(stream);
    audioInput.connect(inputPoint);

    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 2048;
    inputPoint.connect(analyserNode);

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect(zeroGain);
    zeroGain.connect(audioContext.destination);
    updateAnalysers();
}




function initAudio() {
        if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;

    navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
        }, 
        gotStream, 
        function(error) {
            alert('Error getting audio');
            console.log(error);
        });
}

// PITCH STUFF
function autoCorrelate( buf, sampleRate ) {
  var SIZE = buf.length;
  var MAX_SAMPLES = Math.floor(SIZE/2);
  var best_offset = -1;
  var best_correlation = 0;
  var rms = 0;
  var foundGoodCorrelation = false;
  var correlations = new Array(MAX_SAMPLES);

  for (var i=0;i<SIZE;i++) {
    var val = buf[i];
    rms += val*val;
  }
  rms = Math.sqrt(rms/SIZE);
  if (rms<0.01) // not enough signal
    return -1;

  var lastCorrelation=1;
  for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
    var correlation = 0;

    for (var i=0; i<MAX_SAMPLES; i++) {
      correlation += Math.abs((buf[i])-(buf[i+offset]));
    }
    correlation = 1 - (correlation/MAX_SAMPLES);
    correlations[offset] = correlation; // store it, for the tweaking we need to do below.
    if ((correlation>0.9) && (correlation > lastCorrelation)) {
      foundGoodCorrelation = true;
      if (correlation > best_correlation) {
        best_correlation = correlation;
        best_offset = offset;
      }
    } else if (foundGoodCorrelation) {
      var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];  
      return sampleRate/(best_offset+(8*shift));
    }
    lastCorrelation = correlation;
  }
  if (best_correlation > 0.01) {
    // console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
    return sampleRate/best_offset;
  }
  return -1;
}

window.addEventListener('load', initAudio);
