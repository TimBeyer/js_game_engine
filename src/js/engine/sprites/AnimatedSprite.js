function AnimatedSprite(arguments){
  
  var sprites = arguments.sprites;
  var frames = arguments.frames;
  var interval = arguments.interval;
  var repeat = arguments.repeat ? arguments.repeat : false;
  var current = 0;
  var isVisible = arguments.isVisible ? arguments.isVisible : false;
  var timer = new Timer({
                          funct: function(){
                            current++;
                            if(current >= frames){
                              current = 0;
                            }
                          },
                          interval: 200,
                          repeat: true
                        });
  
  this.playAnimation = function(){
    timer.start();
  }
  
  this.stopAnimation = function(){
    timer.stop();
  }
  
  this.rewind = function(){
    current = 0;
  }
  
  this.draw = function(ctx,options){
    if(!isVisible){
      return;
    }
    sprites[current].draw(ctx,options); 
  }
}
