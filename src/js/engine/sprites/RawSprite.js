function RawSprite(imageData){
  
    this.x = 50;
    this.y = 50;
    this.imageData = imageData;
    this.width = this.imageData.width;
    this.height = this.imageData.height;

    var drawX,drawY;
    
    this.draw = function(ctx,options){
      if(options.override){
        drawX = options.x;
        drawY = options.y;        
      }
      if(options.camera){
        drawX -= options.camera.x;
        drawY -= options.camera.y;
      }
      
      //clipping
      //if(x+width >= 0 && y+height >= 0){
        ctx.putImageData(imageData,drawX,drawY);
      //}
    } 
  
    this.toSprite = function(){
      //create new empty canvas
      //its only purpose is to hold the image to be saved 
      var canvas=document.createElement("canvas");
      var context=canvas.getContext("2d");
      canvas.width = this.width;
      canvas.height = this.height;
      context.putImageData(imageData,0,0);
      return new Sprite(canvas.toDataURL());
      
    }
}
