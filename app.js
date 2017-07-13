 
var playerMoveLeft = function() {
  player.x += player.speedX*-1;
};
 
var playerMoveRight = function() {
  player.x += player.speedX;
};
 
window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // Left
      playerMoveLeft();
    break;
 
    case 39: // Right
      playerMoveRight();
    break;
  }
}, false);

var GAME_WIDTH = 640;
var GAME_HEIGHT = 360;
 
var enemies = [
    //index#=0
    {x:100, y:100, speedY:1, w: 40, h:40},
    //index#=1
    {x:260, y:100, speedY:2, w: 40, h:40},
    //index#=2
    {x:380, y:100, speedY:3, w: 40, h:40},
    //index#=3
    {x:450, y:100, speedY:7, w: 40, h:40}
    ];
    
var player = {x: 10, y: 160, speedX: 2, w: 40, h: 40, isMoving: false};
 
var movePlayer = function(){
    player.isMoving = true;
};
 
var stopPlayer = function(){
    player.isMoving = false;
};
 
var goal = {x:580, y:160, w:40, h:40};
 
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    
    canvas.addEventListener("mousedown", movePlayer);
    canvas.addEventListener("mouseup", stopPlayer);
    canvas.addEventListener("touchstart", movePlayer);
    canvas.addEventListener("touchend", stopPlayer);
   
    var sprites = { };
var load = function() {
sprites.player = new Image();
sprites.player.src = 'drawings/player.jpg';

sprites.enemy = new Image();
sprites.enemy.src = 'drawings/enemies.jpg';

sprites.background = new Image();
sprites.background.src = 'drawings/background.jpg';

sprites.goal = new Image();
sprites.goal.src = 'drawings/goal.jpg';
}

    function draw (){
ctx.clearRect(0,0, GAME_WIDTH, GAME_HEIGHT);
     
ctx.drawImage(sprites.background, 0, 0);
ctx.drawImage(sprites.player, player.x, player.y);
ctx.drawImage(sprites.goal, goal.x, goal.y);
       
    //draw enemies   
        //ctx.fillStyle="#3333FF";
    
        /*var j = 0;
        
        //var n = 4
        var n = enemies.length;
        
        while(j<n){
        ctx.fillRect(enemies[j].x, enemies[j].y, enemies[j].w, enemies[j].h);
        j= j+1;
        }*/
        
        
        /*for(var j = 0 j<n; j++){
            ctx.fullrect(enemies[j].x, enemies[j].y, enemies[j].w, enemies[j].h);
        }*/
        
        enemies.forEach(function(element, index){
ctx.drawImage(sprites.enemy, element.x, element.y);
    });
    
    }
    
    function update (){
      //collision code
      //collision between player & goal
      if(checkCollision(player, goal)){
          gameLive = false;
          alert('You Won!');
          window.location = "";
      }
      
      //collision between player & enemies
      enemies.forEach(function(element, index){
             
             if(checkCollision(player, element)){
                 gameLive = false;
                 alert('Game Over!');
                 window.location = "";
             }
             
       //player move
       if(player.isMoving){
           player.x = player.x + player.speedX;
       }
       
       //enemies move
        /*var j = 0;
        var n = enemies.length;*/
        
                /*while(j<n){
        ctx.filRect(enemies[j].x, enemies[j].y, enemies[j].w, enemies[j].h);
        j= j+1;
        }*/
        
        element.y = element.y + element.speedY;
    
    if(element.y <= 10){
        element.y = 10;
        element.speedY = element.speedY*-1;
    }
    
    else if(element.y >= GAME_HEIGHT-50){
        element.y = GAME_HEIGHT - 50;
        element.speedY = element.speedY*-1;
    }
        });
        
      /*  while (j<n){
            enemies[j].y = enemies[j].y + enemies[j].speedY;
            j = j + 1;
        }*/
        
    }
    
    function step (){
        update();
        draw();
        window.requestAnimationFrame(step);
    }
    
    //collision detection function code
    var checkCollision = function(rect1, rect2){
        
        var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
        
        var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
        
        return closeOnWidth && closeOnHeight;
    };
      load( );
    step();
