//I already hate that naming convention. will refactor when everything is working
//I promise!

var GAME_ASSETS = {
  
  //The sceneAssets object contains information about all the sprites, tiles etc.
  //The information is then used to create the corresponding objects
  //and store them in the same structure.
  //
  //After loading the scene, everything declared in this file can be accessed in the game engine
  
  /** Available tilesets **/
  
  tilesets: {
               mario: {
                        source: "assets/tileset.png",
                        hTiles: 17,
                        vTiles: 17,
                        spacing: 1,
                        colorKey: {
                                    r: 1,
                                    g: 1,
                                    b: 1
                                   }
                      },
              notmario: {
                        source: "assets/tileset2.png",
                        hTiles: 10,
                        vTiles: 10,
                        spacing:0,
                        colorKey: {
                                    r: 255,
                                    g: 255,
                                    b: 255
                                   }
              },
              testtiles: {
                        source: "assets/testTile.png",
                        hTiles: 1,
                        vTiles: 1,
                        spacing:0
                        
              }
            } ,
            
    sprites: {
              flower: {
                         tileset: "mario",
                         sprite: 280,
                      }
                      
             },
                   
    animations: {
                  questionMark: {
                                  tileset: "mario",
                                  frames: [3,4,5,6],
                                  frameDuration: 100
                                }                           
              },
  
  /** The tilemaps **/       
  tilemaps: {
              map1: {
                      width: 3,
                      height: 3,
                      map:
                            [
                              0,1,2,
                              17,18,19,
                              34,35,36
                            ]
                    },
             map2: {
                      width: 4,
                      height: 5,
                      map:  
                            [  
                             3,4,5,6,
                             190,190,190,190,
                             190,190,190,190,
                             211,211,211,211,
                             3,3,3,3
                            ]
                    },
              map3: {
                      width: 3,
                      height: 3,
                      map:  
                            [  
                             0,1,2,
                             10,11,12,
                             0,1,2
                            ]
                    },
             testmap: {
                      width: 1,
                      height: 1,
                      map: [0]
             }        
            } 
}
