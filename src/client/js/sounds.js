var music = new Howl({
  urls: ['audio/gameDrone.mp3'],
  autoplay: true,
  loop: true
});

var sounds = new Howl({
  urls: ['audio/gameTones.mp3'],
  sprite: {
    pitch1: [0,2000],
    pitch2: [3000,1900],
    pitch3: [5000,1900],
    pitch4: [7000,1900],
    pitch5: [9000,1900],
    pitch6: [11000,1900]
  },
  volume: 0.3
});


function playSound(){
  var rand = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  
  sounds.play('pitch' + rand );
};