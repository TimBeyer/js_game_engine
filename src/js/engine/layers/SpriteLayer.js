function SpriteLayer(spriteLayer){
  
    console.log("SpriteLayer Constructor")
    this.sprites = spriteLayer.sprites;
    //Where to draw the spriteLayer | screen coordinates with (0|0) at the top left corner
    this.xPos = spriteLayer.x ? spriteLayer.x : 0;
    this.yPos = spriteLayer.y ? spriteLayer.y : 0;
    //get the tile timensions from the tileset
    this.tileWidth = tileSet.getTileDimensions().w;
    this.tileHeight = tileSet.getTileDimensions().h;
    
    //Array holding the tiles
    this.tileMap = spriteLayer.tilemap.map;
   //height and width of layer in tiles
    this.layerWidth = spriteLayer.tilemap.width;
    this.layerHeight = spriteLayer.tilemap.height; 

    this.zIndex = tileLayer.zIndex;
 
}

 SpriteLayer.prototype.setPosition = function(x,y){
   console.log("Set SpriteLayer position to " + x + "|" + y);
    xPos = x;
    yPos = y;
  }
  
  SpriteLayer.prototype.getPosition = function(){
    var position = {
      x: xPos,
      y: yPos
    };
    return position;
  }
  
  SpriteLayer.prototype.getZIndex = function(){
    return zIndex;
  }
  

  

  //Now to the drawing part
  SpriteLayer.prototype.draw = function(context,options){
    if(!tileLayer.visible){
      return;
    }
    //StartX and startY are the coordinates where the drawing starts
    var startX = 0,startY = 0;
    //per default, draw the entire layer ( even offscreen)
    var drawWidth = this.layerWidth, drawHeight = this.layerHeight;
    //set defaults
    var visibleTiles = {startX:0,startY:0,drawWidth:drawWidth,drawHeight:drawHeight};
    //So we have a camera that tells us what part of this layer to render
    if(options.camera){
      //update the list of visible tiles
      visibleTiles = this.getVisibleTiles(options.camera);
      //override the default values
      startX = visibleTiles.x;
      startY = visibleTiles.y;
      drawWidth = visibleTiles.h;
      drawHeight = visibleTiles.v;
      //alert(startX + "|" + startY + " " + drawWidth + " " + drawHeight);
    }
    //check if we actually have something to draw;
    if(drawWidth <= 0 && drawHeight <= 0){
        return; 
    }
    //We render in vertical lines iterating first over x and then over y
    for(var x = startX > 0 ? startX : 0; x < startX + drawWidth; x++){
      for(var y = startY > 0 ? startY : 0; y < startY + drawHeight; y++){
        //current tile to draw
        var tile;
        var newX=x,newY=y;
        //We check if the repeat option is enabled
        //then we use the modulo operator to wrap around when the last tile is reached 
        if(repeat.h){
          //if x is bigger than the actual layer, wrap around
          if(x >= layerWidth){
            if(layerWidth == 1){
              newX = 0;
            }
            else{
              newX = x%layerWidth;
            }
          }
        }
        if(repeat.v){
          //now also wrap vertically
          if(y >= layerHeight){
            if(layerHeight == 1){
              newY = 0;
            }
            else{
             newY = y % layerHeight;
            }
          }
        }
          //and get the tile to draw
          tile = getTile(newX,newY);
    
    
        //drawOptions object
        //      drawOptions.override: if true, the default drawOptions for the sprites will be overridden 
        //      drawOptions.x: x coordinate to draw
        //      drawOptions.y: y coordinate to draw
        //      drawOptions.scale: scaling factor| unscaled: 1
        //      drawOptions.width: width of each tile
        //      drawOptions.height: height of each tile
        var drawOptions = {};
    
        //override the drawoptions
        //the tiles are actually sprites
        //since a sprite usually can only be at one place at a time, we override the parameters
        //and just draw it wherever we want
        drawOptions.override =  true;
        //make sure to advance the Sprite position tileWidth or tileHeight pixels each tile
        drawOptions.x = xPos + (x*tileWidth);
        drawOptions.y = yPos + (y*tileHeight);
        //alert(drawOptions.x + " " + drawOptions.y);
        drawOptions.scale = 1;
        drawOptions.width = tileWidth;
        drawOptions.height = tileHeight;
        //if camera present, then load the camera options
        if(options.camera){
            drawOptions.camera = options.camera;    
        }
        else{
            drawOptions.camera = false;
        }
        if(tile == undefined){
          alert(x + " | " + y + " " + newX + " " + newY + " " + drawOptions.width + " " + drawOptions.height);
          //return; //cheap way out
        }
        else{
           tile.draw(context,drawOptions);
          //alert("Draw " + x + "|" + y);
        }
        
      }
    }
  }
  
  //Get the (x|y)th tile as seen on the tilemap, indexed with (0|0)
  SpriteLayer.prototype.getTile = function(x,y){
    //alert("GetTile: " + getIndex(x,y) + " ID: " + tiles[getIndex(x,y)]);
    if(x < 0 || y < 0 || x >= layerWidth || y >= layerHeight){
      alert("Tile out of bounds " + x + " | " + y);
    }
    return tileSet.get(tileMap[(layerWidth*y)+x]);
  }
  
  
  //clipping calculation
  SpriteLayer.prototype.getVisibleTiles = function(camera){
 
 
    //Determines the tiles that will be rendered
    //The x and y options signify the tile at the (x|y) position as seen on the tilemap
    //The origin is (0|0)
    //The w and h options determine how many tiles to the right of the origin
    //And down from the origin to draw
    var visibleTiles = {};
    
    //calculate the top left tile that is seen by the camera
    visibleTiles.x = Math.floor((camera.x-this.xPos)/this.tileWidth);        
    visibleTiles.y = Math.floor((camera.y-this.yPos)/this.tileHeight);
    //alert("Visible: "+ visibleTiles.x + " " + visibleTiles.y);
 
    //calculate how many tiles we have to display at a time ( overestimate)
    //if it doesn't repeat, we either draw as many tiles as the camera sees
    //or, if the layerWidth is smaller than that value, the tiles that are left
    //remember, we don't want to repeat 
    visibleTiles.h = Math.min(this.layerWidth-visibleTiles.x,Math.round((camera.width/camera.zoom) / this.tileWidth) + 1);
    visibleTiles.v = Math.min(this.layerHeight-visibleTiles.y,Math.round((camera.height/camera.zoom) / this.tileHeight) + 1);
  
    //if we should repeat the tiles, then take as many tiles as the camera captures
    if(repeat.h){
      visibleTiles.h = Math.round((camera.width/camera.zoom)/ this.tileWidth) + 1;
    }
    if(repeat.v){
       visibleTiles.v = Math.round((camera.height/camera.zoom)/ this.tileHeight) + 1;        
    }
    
    console.log("Visible Tiles: x:" + visibleTiles.x + " y:" + visibleTiles.y);
    
    return visibleTiles;
  }

