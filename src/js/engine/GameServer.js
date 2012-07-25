function GameServer(ip,port){
  var socket = new io.Socket(ip,{port:port,transports : ['websocket']}); 
  var eventHandlers = {
			connect : function(){},
			disconnect : function(){},
			gamePackage : function(game){},
			scenePackage : function(scene){},
			deltaPackage : function(delta){}
    
  }
  
  this.on = function(string, funct){
    //look through event handlers array
      for(var e in eventHandlers){
	//if the string is in there, we have a handler to attach
	if(string === e){
	    eventHandlers[e] = funct;
	}
      }
  }
  
  this.connect = function(){
      socket.disconnect();
      socket.on('connect', onConnect);
      socket.on('message', onMessage);
      socket.on('disconnect', onDisconnect);
      socket.connect();
      socket.send({type:'gamePackageRequest'});
  }
  
  
  function onConnect(){
     eventHandlers.connect();
  }
  
  function onDisconnect(){
    eventHandlers.disconnect();   
  }
  
  function onMessage(message){
      if(message.type == 'gamePackage'){
	  eventHandlers.gamePackage(message.package);
      }
      if(message.type == 'scenePackage'){
	 eventHandlers.scenePackage(message.package);
      }
      if(message.type == 'deltaPackage'){
	eventHandlers.deltaPackage(message.package);
      }
      
  }
  
  
  
 
  
}
