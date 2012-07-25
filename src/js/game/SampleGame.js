function SampleGame(){
  
  var engine;
  var direction;
  var camera;
  var assets;
  var drawables;
  
  
  function initialize(){
    drawables = [];
    var trees = 
                {
                  x: 0,
                  y: 0,
                  tileset: assets.tilesets.notmario,
                  tilemap: assets.tilemaps.map3,
                  repeat: {v:true,h:true},
                  zIndex: 1,
                  visible: true
    
                };
    var testLayer = new TileLayer(trees);
    drawables.push(testLayer);
    
    var randomStuff =
                  {
                    x: 0,
                    y: 0,
                    tileset: assets.tilesets.mario,
                    tilemap: assets.tilemaps.map2,
                    repeat: {v:true,h:true},
                    zIndex: 3,
                    visible: true
                  }
    testLayer = new TileLayer(randomStuff);
    drawables.push(testLayer);
    engine.startEngine();
                          
  }
  
  this.onLoad = function(args){
    engine = args.engine;
    assets = args.assets;
    camera = args.camera;
    initialize();
  }
  
  this.getDrawables = function(){
    //return the graphics that have to be drawn by the engine
    //will be called once per screen update cycle
    return drawables;
    
  }
  
  this.getGameAssets = function(){
    return GAME_ASSETS;
  }
  
  this.tick = function(engineEvent){
    
  }
  
  
}
