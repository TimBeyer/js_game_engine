function KeyboardInput(element){
  var element = element; //the element that registers the events
  var keys = new Array();

  registerHandlers();

  function registerHandlers(){
    element.onkeydown = keydown;
    element.onkeyup = keyup;
    element.onkeypress = keypress;

  }
  
  this.isPressed = function(keyCode){
    return keys[keyCode];
  }
  
  
  function keydown(event){
      keys[event.keyCode] = true;
      //alert("Down: " + event.keyCode);
  }
  
  function keyup(event){
      keys[event.keyCode] = false;
      //alert("Up: " + event.keyCode);
  }
  
  function keypress(event){
    
  }
  
}

function MouseInput(element){
  var x = 0; 
  var y = 0; 
  var mouseClicked = false;  
  registerHandlers();
  var wheelup = false;
  var wheeldown = false;

  this.getMouseCoords = function(){
    return {x: x, y: y};
  }
  this.isMouseClicked = function(){
    return mouseClicked;
  }
  
  this.getVector = function(point){
    return {x: x - point.x, y: y - point.y};
  }
  
  this.isWheelUp = function(){
    var wheel = wheelup;
    wheelup = false;
    return wheel;
  }
  
   this.isWheelDown = function(){
    var wheel = wheeldown;
    wheeldown = false;
    return wheel;
  }

  function registerHandlers(){
    element.onmousedown = mousedown;
    element.onmouseup = mouseup;
    element.onmousemove = mousemove;
    element.addEventListener("mousewheel", mousewheel);
  }
  
  function mousedown(event){
    mouseClicked = true;
  }
  
  function mousemove(event){
    x = event.offsetX;
    y = event.offsetY;
  }
  
  function mouseup(event){
    mouseClicked = false;
  }
  
  function mousewheel(event){
    console.log("Mousewheel")
    var delta = event.wheelDelta;
    if(delta > 0){
      wheelup = true;
    }
    if(delta < 0){
      wheeldown = true;
    }
  }
}
