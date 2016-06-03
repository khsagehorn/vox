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

  stage.addChild(cube);



  // Apply velocity values to position
  cube.x += cube.vx;
  cube.y += cube.vy;
  token.x += token.vx;

  //contain cube in game window
  contain(cube, {width: 1000, height: renderer.height})


  // When a token is collected
  var tokenCollect = false;

  if(hitTestRectangle(cube, token)){
    tokenCollect = true;
  }

  if(tokenCollect){
    cube.alpha = 0.5;
    cube.tint = 0x9E4D95;
    token.visible = false;
  } else {
    cube.alpha = 1;
    cube.tint = 0xffffff;}

  renderer.render(stage);
  
}