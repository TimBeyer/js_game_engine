/**
* The tiles takes an image source as a parameter and 
* the width and height of each tile
* It then slices the image into single tiles
* and makes them available as RawSprites / Sprites
**/
function Tileset(parameters){
  
    //Name of tileset
    var id = parameters.id;
    //How many tiles are on the horizontal line
    var hTiles = parameters.hTiles;
    
    //How many tiles are on the vertical line
    var vTiles = parameters.vTiles;
    
    //By how many pixels are the tiles separated (usually 1 or 0)
    var spacing = parameters.spacing;
    
    //What function to execute when the tileset is initialized
    var onload = parameters.onload;
    
    //Array that holds the Tile objects
    var tiles = new Array();  
    
    //The dimensions of a tile
    //dimensions.w = the width of the tile in pixels
    //dimensions.h = the height of the tile in pixels
    var dimensions = new Object();
    
    //The Image object that holds the tile file //lol
    var source = new Image();
    
    //onload handler that triggers the initializaton procedure
    source.onload = init; 
    
    //we set the image and let the games begin
    source.src = parameters.source;

    function init(){
      //So we'll go and take out the mighty ImageSlicer
      //It asks us for the width and the height of the image in pixels
      var slicer = new ImageSlicer(source.width,source.height);
      
      //And then we feed it the image... wait, what? why doesn't he look at the image instead of asking?
      slicer.loadImage(source);
     
      //we set the color key that determines what color will be rendered transparently
      if(parameters.colorKey){
        slicer.colorKey.r = parameters.colorKey.r;
        slicer.colorKey.g = parameters.colorKey.g;
        slicer.colorKey.b = parameters.colorKey.b;
        //enable color keying
        slicer.colorKeying = true;
      }
      else{
        slicer.colorKeying = false;
      }
      
      //slice it
      var slices = slicer.slice(hTiles,vTiles,spacing);
      
      //convert the RawSprites to Sprites and add them to the tiles array
      for(var slice in slices.slices){
        tiles.push(new RawSprite(slices.slices[slice]).toSprite());
      }
      
      //set the dimensions of the tiles
      dimensions.w = slices.sliceWidth;
      dimensions.h = slices.sliceHeight;
     
      //delete the old image
      delete source;
      //execute onload handler
      onload();
    }
    
    this.getTileDimensions = function(){
      return dimensions;
    }
    this.get = function(id){
      return tiles[id];
    }
    
    this.size = function(){
      return tiles.length;
    }
    
    this.getId = function(){
      return id;
    }
}


