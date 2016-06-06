function gameLoop(){
  requestAnimationFrame(gameLoop);
  // contain(cube, window);


  // background movement
  background.vx = -3 
  background.tilePosition.x += background.vx;
  foreground.vx = -5
  foreground.tilePosition.x += foreground.vx;

  // Update token velocity
  // token.vx = -4;

  // stage.addChild(cube);

  // logFreq();



  // Apply velocity values to position
  cube.x += cube.vx;
  cube.y += cube.vy;
  token.x += token.vx;

  //contain cube in game window
  // contain(cube, background);


  // When a token is collected
  var tokenCollect = false;

  if(hitTestRectangle(cube, token)){
    tokenCollect = true;
  }

  if(tokenCollect){
    playSound();
    cube.alpha = 0.5;
    cube.tint = 0x9E4D95;
    stage.removeChild(token)
    score += 1;
    console.log(score);
  } else {
    cube.alpha = 1;
    cube.tint = 0xffffff;}

  renderer.render(stage);
  
}