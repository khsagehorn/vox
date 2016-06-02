function gameLoop(){
  requestAnimationFrame(gameLoop);
  // contain(sprite, window);


  // background movement
  background.vx = -3 
  background.tilePosition.x += background.vx;
  foreground.vx = -5
  foreground.tilePosition.x += foreground.vx;

  // Update token velocity
  // token.vx = -4;



  // Apply velocity values to position
  sprite.x += sprite.vx;
  sprite.y += sprite.vy;
  token.x += token.vx;

  //contain sprite in game window
  contain(sprite, {width: 1000, height: renderer.height})


  // When a token is collected
  var tokenCollect = false;

  if(hitTestRectangle(sprite, token)){
    tokenCollect = true;
  }

  if(tokenCollect){
    sprite.alpha = 0.5;
    sprite.tint = 0x9E4D95;
    token.visible = false;
  } else {
    sprite.alpha = 1;
    sprite.tint = 0xffffff;}

  renderer.render(stage);
  
}