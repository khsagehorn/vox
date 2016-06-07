function gameLoop(){
  requestAnimationFrame(gameLoop);


  // background movement
  background.vx = -3 
  background.tilePosition.x += background.vx;
  foreground.vx = -5
  foreground.tilePosition.x += foreground.vx;


  logFreq();



  // Apply velocity values to position
  cube.x += cube.vx;
  cube.y += cube.vy;
  token.x += token.vx;

  //contain cube in game window
  // contain(cube, background);


  // When a token is collected
  var tokenCollect = false;


  if(b.hitTestPoint({x: token.x, y: token.y}, cube)){
    tokenCollect = true;
  }

  if(tokenCollect){
    stage.removeChild(token);
    playSound();
    u.shake
    cube.alpha = 0.5;
    cube.tint = 0x9E4D95;
    score += 1;
  } else {
    cube.alpha = 1;
    cube.tint = 0xffffff;}


  renderer.render(stage);
  
}