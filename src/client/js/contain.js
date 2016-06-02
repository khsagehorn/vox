function contain(sprite, container) {

  var collision;

  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }

  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  if (sprite.x + sprite.width > container.x) {
    sprite.x = container.x - sprite.width;
    collision = "right";
  }


  if (sprite.y + sprite.height > container.y) {
  sprite.y = container.height - sprite.height;
  sprite.vy = 0;
  collision = "down";
  }
  return collision;
}