# VOCOL
An interactive audiovisual experience built with Pixi.js, WebGL, and the Web Audio API


## What It Is:
Control the hypercube sprite around the stage using live audio input from your computer's microphone. 
An increase in pitch or frequency will cause the cube to move up, a decrease in pitch moves it down. 
Collecting a pyramid sprite will result in a procedurally generated musical chord, the notes of which 
are determined by the number of pixels that collide between the two objects.

## How It Works:
The stage and sprites are built on an HTML5 canvas element. [Pixi.js](https://github.com/pixijs/pixi.js), a 2D WebGL library, is utilized 
for animation and game logic. The game sprites and background have been drawn in the open-source vector graphics software [Inkscape](https://inkscape.org/en/). Audio is captured from the microphone via the [MediaDevices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices) 
and is fed to the [WebAudio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) for analysis and processing. I created the music and sounds with Apple's GarageBand, and [howler.js](https://github.com/goldfire/howler.js/tree/2.0) is used to manage the audio files and allow for multiple individual sound sprites to be played simultaniously.

Most of these browser-based technologies are very new, and in the case of the MediaDevices API, still in experimental stages. Hopefully this project gives a glimpse into some exciting new features of the modern web browser!
