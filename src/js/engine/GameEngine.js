function GameEngine(_canvas,_width,_height){
	
	var canvas = _canvas;
	var width = _width;
	var height = _height;
	var ctx = canvas.getContext("2d");
	canvas.width = width;
	canvas.height = height;
	var renderer;
	var game;
	var drawables;
	var camera;
	var direction;
	var keyboardInput;
	var mouseInput;
	var assets;
	var server;
  
  var drawLoop, gameLoop;
  
  //Workaround for the function scope bug
  var that = this;

  
  this.startEngine = function(){
      gameLoop = setInterval(nextFrame,10);
      drawLoop = setInterval(render,25);
  }
  
  this.stopEngine = function(){
    clearInterval(gameLoop);
    clearInterval(drawLoop);
  }
   
  
  this.connect = function(ip,port){
      server = new GameServer(ip,port);
      server.on('connect',function(){});
      server.on('disconnect',function(){alert('Disconnected');});
      server.on('gamePackage',loadGamePackage);
      server.on('scenePackage',loadScenePackage);
      server.on('deltaPackage',applyDeltaPackage);
      server.connect();
  }
  
  
  //load game from a package given out by the server
  this.loadGamePackage = function(_game, onload){
    game = _game;
    loadGameAssets(game.getGameAssets(), function(){
      //that.startEngine();
      onload({
        engine: that,
        camera: camera,
        assets: assets
      });
    });
  }
  
    function loadScenePackage(scene){
    
    
    
  }
  
  function applyDeltaPackage(delta){
    
  }

  function loadGameAssets(gameAssets,onload){
    that.stopEngine();
    setUpEngine();
    assets = gameAssets;
    loadTilesets(function(){loadSprites(assets);onload();});
   
    }
  
  function loadTilesets(_onload){
    var loaded = 0;
    var totalTilesets = 0;
    for(var key in assets.tilesets){
      totalTilesets++;
    }
    var onload = function(){loaded++; if(loaded == totalTilesets) _onload();};
    for(var tileset in assets.tilesets){
      var current = assets.tilesets[tileset];
      current.onload = onload;
      assets.tilesets[tileset] = new Tileset(current);                      
    }

    
  }
    
    function loadSprites(assets){
              //load the sprites
          for(var sprite in assets.sprites){
            var current = assets.sprites[sprite];
            assets.sprites[sprite] = assets.tilesets[current.tileset].get(current.sprite);
          }
        
    }
    
    function newAnimatedSprite(animation){
          //get the references to the sprites that we already loaded
          var aniSprites = new Array();
          var frames = 0;
          for(var i in animation.frames){
            aniSprites[i] = assets.tilesets[animation.tileset].get(i);
            frames++;
          }
          return new AnimatedSprite({
                                                sprites: aniSprites,
                                                frames: frames,
                                                interval: animation.frameDuration,
                                                repeat: true,
                                                isVisible: true     
                                   }); 
    }

  function parseMessage(data){
    if(data.x && data.y){
      camera.x = data.x;
      camera.y = data.y;
    }
    
  }


  function setUpEngine(){
    renderer = new Renderer(canvas,ctx);
    layers = new Array();
    camera = {
                     x: 0,
                     y: 0,
                     width: width,
                     height: height,
                     zoom: 1
                     
                };
    renderer.setCamera(camera);
    keyboardInput = new KeyboardInput(document);
    mouseInput = new MouseInput(canvas);
    direction = {x:0,y:0};
  }

  
  function buildRenderQueue(){
    var queue = new Array();
    for(var drawable in drawables){
      queue.push(drawables[drawable]);   
    }
    queue.sort(function(object1,object2){
      return (object1.getZIndex() - object2.getZIndex());
    });
    for(var drawable in queue){
      renderer.addToQueue(queue[drawable]);
    }
  }
  
  
  function render(){
    renderer.flushQueue();
    drawables = game.getDrawables();
    buildRenderQueue();
    renderer.render();
      
  }
  
  function nextFrame(){
   getInputs();
   update();
  }

	function getInputs(){
	  //if(mouseInput.isMouseClicked()){
	    var screenMiddle = {x:(width/2),y:(height/2)};
	    direction = mouseInput.getVector(screenMiddle);
	    direction.x = Math.round(direction.x / 10);
	    direction.y = Math.round(direction.y / 10);
	  //}
	  //UP arrow
	  if(keyboardInput.isPressed(38)){
	    direction.y--;
	  }
	  if(keyboardInput.isPressed(40)){
	    direction.y++;
	  }
	  //left
	  if(keyboardInput.isPressed(37)){
	    direction.x--;
	  }
	  if(keyboardInput.isPressed(39)){
	    direction.x++;
	  }
	  
	  if(mouseInput.isWheelDown()){
	    camera.zoom -= 0.05;
	  }
	  
	  if(mouseInput.isWheelUp()){
	    camera.zoom += 0.05;
	  }
	}


	function update(){
	  if((camera.x + direction.x) >= 0){
      camera.x += direction.x;
	  }
	  else{
	    camera.x = 0;
	  }
	  if((camera.y + direction.y) >= 0){
      camera.y += direction.y;  	    
	  }
	  else{
	    camera.y = 0;
	  }

	}
}