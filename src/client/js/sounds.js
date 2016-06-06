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
  }
});

function playSound(){
  if (token.y = (renderer.height-token.height)/6){
    sounds.play('pitch6');
  } 
  if (token.y = (renderer.height-token.height)/5){
    sounds.play('pitch5');
  }
  if (token.y = (renderer.height-token.height)/4){
    sounds.play('pitch4');
  }
  if (token.y = (renderer.height-token.height)/3){
    sounds.play('pitch3');
  }
  if (token.y = (renderer.height-token.height)/2){
    sounds.play('pitch2');
  }
  if (token.y = (renderer.height-token.height)/1){
    sounds.play('pitch1');
  }
};