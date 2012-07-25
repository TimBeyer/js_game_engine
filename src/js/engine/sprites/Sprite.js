function Sprite(source){
  
    this.image = new Image();
    this.image.onload = init;
    this.image.src = source;
    this.width = 0;
    this.height = 0;
    this.scale = 1;
    this.x = 0;
    this.y = 0;
        
     Sprite.prototype.draw = function(ctx,options){
          var x = this.width ,y = this.y,width = this.width,height = this.height,scale = this.scale;
          if(options.override){
            x = options.x;
            y = options.y;
            width = options.width;
            height = options.height;
            scale = options.scale;        
          }
          if(options.camera){
            x -= options.camera.x;
            y -= options.camera.y;
            scale = options.camera.zoom;
          }
    
          ctx.drawImage(this.image,x*scale,y*scale,width * scale, height * scale);
    
    }    
    function init(){
      this.width = this.image.width;
      this.height = this.image.height;
    }

}



