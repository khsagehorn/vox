function gameLoop(){
  requestAnimationFrame(gameLoop);

  // background movement
  background.vx = -3 
  background.tilePosition.x += background.vx;
  foreground.vx = -5
  foreground.tilePosition.x += foreground.vx;

  // run pitch detection function
  movementByFrequency();

  // Apply velocity values to position
  cube.x += cube.vx;
  cube.y += cube.vy;
  token.x += token.vx;

  // When a token is collected
  var tokenCollect = false;


  if(c.hitTestPoint({x: token.x, y: token.y}, cube)){
    tokenCollect = true;
  }

  if(tokenCollect){
    // remove the token
    stage.removeChild(token);
    // play sound
    playSound();
    // change color of cube
    cube.alpha = 0.5;
    cube.tint = 0x9E4D95;
    // score += 1;
  } else {
    cube.alpha = 1;
    cube.tint = 0xffffff;}


  renderer.render(stage);
  
}