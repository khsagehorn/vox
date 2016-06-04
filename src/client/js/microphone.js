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



function updateAnalysers(time) {
    var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);
    
    analyserNode.getByteFrequencyData(freqByteData);

    setTimeout(function(){

        console.log(freqByteData);
    // showFreq(freqByteData);


        rafId = window.requestAnimationFrame(updateAnalysers);
    }, 1000 / 5);
}

// function showFreq(freqByteData){
//     setInterval(function(){
//         console.log(freqByteData);
//     }, 1000)
// }

// showFreq(freqByteData);

function gotStream(stream) {
    inputPoint = audioContext.createGain();

    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
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
        }, gotStream, function(e) {
            alert('Error getting audio');
            console.log(e);
        });
}

window.addEventListener('load', initAudio);
