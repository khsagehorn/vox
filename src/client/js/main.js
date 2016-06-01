
var MicrophoneStream = require('microphone-stream');
 
getUserMedia({ video: false, audio: true }, function(err, stream) {
  var micStream = new MicrophoneStream(stream);
  
  // get Buffers (Essentially a Uint8Array DataView of the same Float32 values) 
  micStream.on('data', function(chunk) {
    // Optionally convert the Buffer back into a Float32Array 
    // (This actually just creates a new DataView - the underlying audio data is not copied or modified.) 
    var raw = MicrophoneStream.toRaw(chunk) 
    //... 
    
    // note: if you set options.objectMode=true, the `data` event will output AudioBuffers instead of Buffers 
   });
  
  // or pipe it to another stream 
  micStream.pipe(/*...*/);
  
  // It also emits a format event with various details (frequency, channels, etc) 
  micStream.on('format', function(format) {
    console.log(format);
  });
  
  // Stop when ready 
  document.getElementById('my-stop-button').onclick = function() {
    micStream.stop();
  };
});


















//Access the microphone from the browser
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;


// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// var audioContext =  new AudioContext();
// var bufferLength = null;
// var dataArray;

// function gotStream(stream) {
//   var source = audioContext.createMediaStreamSource(stream);
//   analyser = audioContext.createAnalyser();
//   source.connect(analyser);
//   analyser.fftSize = 256;
//   bufferLength = analyser.frequencyBinCount;
//   dataArray = new Uint8Array(bufferLength);
//   analyser.getByteFrequencyData(dataArray);
//   console.log("dataArray", dataArray);

//   source.start();

  
  
//   // for (var i = 0; i < bufferLength; i++) {
//   //   console.log(dataArray[i]);
//   // }
// }

// function error() {
//   console.log('error');
// }

// function analyse() {

// }

// // (function(){setInterval(function(){
// //   for (var i = 0; i < bufferLength; i++) {
// //     console.log(dataArray[i]);
// //   }
// // }, 1000)})();

navigator.getUserMedia( {audio:true}, gotStream(), error );




