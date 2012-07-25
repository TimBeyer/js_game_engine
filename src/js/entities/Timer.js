function Timer(arguments){
  var funct = arguments.funct;
  var interval = arguments.interval;
  var repeat = false;
  var cycles = 1;
  var currentCycle = 0;
  if(arguments.repeat){
    repeat = arguments.repeat;
  }
  if(arguments.cycles){
    cycles = arguments.cycles;
  var timer;
    
  }
  
  this.start = function(){
    timer = setInterval(function(){
                                    funct();
                                    if(!repeat){
                                      currentCycle++;
                                      if(currentCycle >= cycles){
                                        this.stop();
                                      }
                                    }             
                                   }
                                   ,interval);
  }
  
  this.stop = function(){
    clearInterval(timer);
    if(arguments.onStop){
      arguments.onStop();
    }
  }
  
}
