/************************************************
 *						*
 * 	Objects					*
 *						*
 ************************************************/
 
 

function ImageSlicer(width,height){

	var width = width;
	var height = height;
	this.colorKey = {r:0,g:0,b:0,a:0};
	this.colorKeying = false;
	

	var imageData = createEmptyImgData(width,height);
	
	this.loadImage = function(image){
	    imageData = getImageData(image);
	    width = imageData.width;
	    height = imageData.height;
	
	}

	
	function createEmptyImgData(width,height){

		var canvas=document.createElement("canvas");
		var context=canvas.getContext("2d");

		canvas.width = width;
		canvas.height = height;
		
		//fill with black
		context.fillStyle = "rgb(0,0,0)";
		context.fillRect (0, 0, width, height);
	  
		// Get the imageData from canvas
		var imgd = context.getImageData(0, 0, width, height);
		
		return imgd;
	
	}
	
	this.slice = function(hParts,vParts,spacing){
	  var slices = new Array(); //array that holds the imgData of each slice
	  
	  var sliceWidth = Math.round((width + spacing - spacing*hParts)/hParts);
	  var sliceHeight = Math.round((height + spacing - spacing*vParts)/vParts);

	  
    for(var v = 0; v < vParts; v++){
      for(var h = 0; h < hParts; h++){
        var current = createEmptyImgData(sliceWidth,sliceHeight);
        //calculate position of top left pixel
        var xPos = h * (sliceWidth + spacing);
        var yPos = v * (sliceHeight + spacing);
        for(var y = yPos; y < yPos+sliceHeight; y++){
          for(var x = xPos; x < xPos+sliceWidth; x++){
           // alert("Get Pixel " + x + "|" + y + "Put Pixel" + (x-xPos) + " " + (y-yPos));
            var sourcePixel = getPixel(imageData,x,y);
            if(this.colorKeying){
              //If we have a color key match, make the pixel transparent
              if(pixelsEqual(sourcePixel,this.colorKey)){
                sourcePixel.a = 0; 
              }
            }
            putPixel(current,sourcePixel,x-xPos,y-yPos);
          }
        }
        slices.push(current);
      }
    }	  
	  return {
	           sliceWidth: sliceWidth,
	           sliceHeight: sliceHeight,
	           slices: slices
	         };
	}


/************************************************
 *						*
 * 	Functions				*
 *						*
 ************************************************/

/*
 * Extracts the image data from an image 
 */
 
  function pixelsEqual(pixel1,pixel2){
    if(pixel1.r != pixel2.r) return false;
    if(pixel1.g != pixel2.g) return false;
    if(pixel1.b != pixel2.b) return false;
    return true;
  }
  
  function getImageData(image){
  
  		//create new empty canvas
  		//its only purpose is to hold the image to be converted 
  		var canvas=document.createElement("canvas");
  		var context=canvas.getContext("2d");
    
  		var width = image.width;
  		var height = image.height;
  		canvas.width = width;
  		canvas.height = height;
  		context.drawImage(image,0,0);
  	  
  		// Get the imageData from the given coordinates and dimensions.
  		var imgd = context.getImageData(0, 0, width, height);
  		
  		return imgd;
   }
  
  
   
  function getPixel(imageData,x,y){
      var startIndex = imgDataArrayIndex(imageData,x,y);
      var r = imageData.data[startIndex];
      var g = imageData.data[startIndex+1];
      var b = imageData.data[startIndex+2];
      var a = imageData.data[startIndex+3];
      
      return {r:r,g:g,b:b,a:a};
  
  }
  
  function putPixel(imageData,pixel,x,y){
      var startIndex = imgDataArrayIndex(imageData,x,y);
      imageData.data[startIndex] = pixel.r;
      imageData.data[startIndex+1] = pixel.g;
      imageData.data[startIndex+2] = pixel.b;
      imageData.data[startIndex+3] = pixel.a;
  
  }
  
  
  //turns an x,y coordinate into the corresponding number, points at red pixel
  function imgDataArrayIndex(imageData,x,y){
      return (y*(imageData.width*4)) + (x*4);
  }


}



