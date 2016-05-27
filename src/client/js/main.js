  function gotStream(stream) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();
    var analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    // analyser.getFloatFrequencyData(dataArray);
    // analyser.getByteFrequencyData(dataArray);
    // for(var i=0; i < bufferLength; i++){
    //   console.log(dataArray[i]);
     // }

      
    

  //   // Create an AudioNode from the stream.
    var mediaStreamSource = audioContext.createMediaStreamSource( stream );

  //   // Connect it to the destination to hear yourself (or any other node for processing!)
    mediaStreamSource.connect( audioContext.destination );
  }
  function error() {
    console.log('error');
  }


// Access the microphone from the browser
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
  navigator.getUserMedia( {audio:true}, gotStream, error );


