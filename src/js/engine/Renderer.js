function Renderer(viewport,context){
  
  var renderQueue = new Array();
  var camera = {
                 x: 0,
                 y: 0,
                 width: 0,
                 height: 0,
                 zoom: 0
                };
  var previousRenderTime = 0;
  var currRenderTime = 0;
  var showFps = true;
  var debug = true;
  
  
  this.addToQueue = function(drawable){
    renderQueue.push(drawable);
  }
  
  this.flushQueue = function(){
    renderQueue = new Array();
  }
  
  this.setCamera = function(cam){
    camera = cam;
  }
  
  this.render = function(){
    previousRenderTime = currRenderTime;
    var startTime = new Date().getTime();
    context.clearRect(0,0,viewport.width,viewport.height);

    for(var i in renderQueue){
      renderQueue[i].draw(context,{camera:camera});
    }
    var endTime = new Date().getTime();
    currRenderTime = endTime - startTime;
    if(showFps){
       context.fillText(getFps() + "fps",15,15);
    }
    if(debug){
        context.fillStyle = "grey";
        context.fillRect(0,viewport.height-20,viewport.width,20);
        context.fillStyle = "black";
        context.fillText(camera.x + "|" + camera.y,15,viewport.height - 5);
        context.fillText("Zoom: " + camera.zoom,viewport.width - 50,viewport.height - 5);
      
    }
  }
  
  function getFps(){
    return Math.round(1000 / (currRenderTime* 0.9 + previousRenderTime * 0.1));
  }
  
}
