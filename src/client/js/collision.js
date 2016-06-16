class Collision {
  constructor(renderingEngine = PIXI) {
    if (renderingEngine === undefined) throw new Error("Please assign a rendering engine in the constructor before using bump.js"); 

    //Find out which rendering engine is being used (the default is Pixi)
    this.renderer = "";

    //If the `renderingEngine` is Pixi, set up Pixi object aliases
    if (renderingEngine.ParticleContainer && renderingEngine.Sprite) {
      this.renderer = "pixi";
    }
  }

  //`addCollisionProperties` adds extra properties to sprites to help
  //simplify the collision code. It won't add these properties if they
  //already exist on the sprite. After these properties have been
  //added, this methods adds a Boolean property to the sprite called `_bumpPropertiesAdded` 
  //and sets it to `true` to flag that the sprite has these
  //new properties
  addCollisionProperties(sprite) {

    //Add properties to Pixi sprites
    if (this.renderer === "pixi") {

      //gx
      if (sprite.gx === undefined) {
        Object.defineProperty(sprite, "gx", {
          get(){return sprite.getGlobalPosition().x},
          enumerable: true, configurable: true
        });
      }

      //gy
      if (sprite.gy === undefined) {
        Object.defineProperty(sprite, "gy", {
          get(){return sprite.getGlobalPosition().y},
          enumerable: true, configurable: true
        });
      }
      
      //centerX
      if (sprite.centerX === undefined) {
        Object.defineProperty(sprite, "centerX", {
          get(){return sprite.x + sprite.width / 2},
          enumerable: true, configurable: true
        });
      }

      //centerY
      if (sprite.centerY === undefined) {
        Object.defineProperty(sprite, "centerY", {
          get(){return sprite.y + sprite.height / 2},
          enumerable: true, configurable: true
        });
      }
      
      //halfWidth
      if (sprite.halfWidth === undefined) {
        Object.defineProperty(sprite, "halfWidth", {
          get(){return sprite.width / 2},
          enumerable: true, configurable: true
        });
      }
      
      //halfHeight
      if (sprite.halfHeight === undefined) {
        Object.defineProperty(sprite, "halfHeight", {
          get(){return sprite.height / 2},
          enumerable: true, configurable: true
        });
      }
      
      //xAnchorOffset
      if (sprite.xAnchorOffset === undefined) {
        Object.defineProperty(sprite, "xAnchorOffset", {
          get(){
            if (sprite.anchor !== undefined) {
              return sprite.height * sprite.anchor.x;
            } else {
              return 0;
            }
          },
          enumerable: true, configurable: true
        });
      }
      
      //yAnchorOffset
      if (sprite.yAnchorOffset === undefined) {
        Object.defineProperty(sprite, "yAnchorOffset", {
          get(){
            if (sprite.anchor !== undefined) {
              return sprite.width * sprite.anchor.y;
            } else {
              return 0;
            }
          },
          enumerable: true, configurable: true
        });
      }

      if (sprite.circular && sprite.radius === undefined) {
        Object.defineProperty(sprite, "radius", {
          get(){return sprite.width / 2},
          enumerable: true, configurable: true
        });
      }
    }

    //Add a Boolean `_bumpPropertiesAdded` property to the sprite to flag it
    //as having these new properties
    sprite._bumpPropertiesAdded = true;
  }

  hitTestPoint(point, sprite) {

    //Add collision properties
    if (!sprite._bumpPropertiesAdded) this.addCollisionProperties(sprite); 

    let shape, left, right, top, bottom, vx, vy, magnitude, hit;

    //Find out if the sprite is rectangular or circular depending
    //on whether it has a `radius` property
    if (sprite.radius) {
      shape = "circle";
    } else {
      shape = "rectangle";
    }

    //Rectangle
    if (shape === "rectangle") {

      //Get the position of the sprite's edges
      left = sprite.x - sprite.xAnchorOffset;
      right = sprite.x + sprite.width - sprite.xAnchorOffset;
      top = sprite.y - sprite.yAnchorOffset;
      bottom = sprite.y + sprite.height - sprite.yAnchorOffset;

      //Find out if the point is intersecting the rectangle
      hit = point.x > left && point.x < right && point.y > top && point.y < bottom;
    }

    //Circle
    if (shape === "circle") {

      //Find the distance between the point and the
      //center of the circle
      let vx = point.x - sprite.x - (sprite.width / 2) + sprite.xAnchorOffset,
          vy = point.y - sprite.y - (sprite.height / 2) + sprite.yAnchorOffset,
          magnitude = Math.sqrt(vx * vx + vy * vy);

      //The point is intersecting the circle if the magnitude
      //(distance) is less than the circle's radius
      hit = magnitude < sprite.radius;
    }

    //`hit` will be either `true` or `false`
    return hit;
  }
}