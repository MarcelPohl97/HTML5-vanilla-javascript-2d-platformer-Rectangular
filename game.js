//acces the canvas in html == game_root
let game_root = document.querySelector('canvas')

//set width and height of the game window
game_root.width = 900;
game_root.height = 600;


//acces the game_root
let g_r = game_root.getContext('2d');

//set keys to false at the beginning of the game
let leftkey = false;
let rightkey = false;
let upkey = false;
let onground = false;


//initialize mouse variables
let mouse = {
    x: 900,
    y: 600
};
  


//player function
function Player(x, y, width, height, color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dx = 0;
    this.dy = 0;
    this.gravity = 0;
    this.friction = 0.9;

    //draw player on the screen
    this.draw = function(){
        g_r.clearRect(0, 0, 900, 600);
        g_r.rect(this.x, this.y, this.width, this.height);
        g_r.fillStyle = this.color;
        g_r.fill();
        this.y += this.gravity
        this.x += this.dx;
        this.y += this.dy;
        this.dx *= this.friction;
        this.dy *= this.friction;
    }
    //collision detection function might get removed cause ground is not used anymore since we have tiles
    this.collision_detection = function() {
        if(this.y >= 570){
            this.gravity = 0;
            this.y = 570;
            onground = true;
        }
    }
    //update function for moving collision and redrawing
    this.update = function() {
        this.draw();
        this.movement();
        this.collision_detection();
    }
    //movement function to move the player
    this.movement = function() {
        if(upkey){
            if(onground){
                onground = false;
                this.dy -= 9;
                this.gravity = 4;
            }
        }
        if(leftkey){
            this.gravity = 4;
            this.dx -= 0.5
        }
        if(rightkey){
            this.gravity = 4;
            this.dx += 0.5
        }
    }
}

//gun class
function Cannon(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.color = color;
  
    //update the position and angle of the gun
    this.update = function() {
      desiredAngle = Math.atan2(mouse.y - this.y, mouse.x - 250 - this.x);
      this.angle = desiredAngle;
      this.draw();
      this.x = player.x;
      this.y = player.y;	
    };
  
    //draw the gun including rotation
    this.draw = function() {
      g_r.save();
      g_r.translate(this.x, this.y);
      g_r.rotate(this.angle);
      g_r.beginPath();
      g_r.fillStyle = this.color;
      g_r.shadowColor = this.color;
      g_r.shadowBlur = 3;
      g_r.shadowOffsetX = 0;
      g_r.shadowOffsetY = 0;
      g_r.fillRect(0, -this.height / 2, this.width, height);
      g_r.closePath();
      g_r.restore();
    };
  }


//X tile class for X-coordinate collisions
function X_tile(x, y, width, height, color){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    
    //draw the tile
    this.draw = function(){
        g_r.beginPath();
        g_r.rect(this.x, this.y, this.width, this.height);
        g_r.fillStyle = this.color;
        g_r.fill();
        
    }
    // set collision for left and right 
    this.collision = function() {
        //simple collision if clause
        if(player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.width > this.y){
                //if player is colliding and less than x set him back
                if(player.x <= this.x){
                    player.x = this.x - 30;
                }//if player is colliding and more than x set him next to him
                if(player.x >= this.x){
                    player.x = this.x + 30; 
                    
                }
            }
    }
    //update function for position and colliding 
    this.update = function(){
        this.draw();
        this.collision()
    }
}

//Y tile class for Y-coordinate collisions
function Y_tile(x, y, width, height, color){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color
    //draw the tile
    this.draw = function(){
        g_r.beginPath();
        g_r.rect(this.x, this.y, this.width, this.height);
        g_r.fillStyle = this.color;
        g_r.fill();
    }
    //set collision for left and right
    this.collision = function() {
        //simple collision if clause
        if(player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.width > this.y){
                //if player is colliding and less than y set him above
                if(player.y <= this.y){
                    onground = true
                    player.gravity = 2;
                    player.y = this.y - 30;
                }//if player is colliding and more than y set him down
                if(player.y >= this.y){
                    onground = false;
                    player.y = this.y + 30; 
                    
                }
            }
    }
    //update function for position and colliding 
    this.update = function(){
        this.draw();
        this.collision()
    }
}

//arrays for tiles
tile_map_x = []
tile_map_y = []

//initialize player
player = new Player(400, 100, 30, 30, "green");
//initialize gun
cannon = new Cannon(player.x, player.y, 20, 10, "white");

//columns for tile map array
let columns = 30;
//rows for tile map array
let rows = 20;
//set the size of the tiles
let size = 30

//tile map 
tile_map = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,];
//loop through columns
for(let x_tile = 0; x_tile < columns; x_tile++){
    //loop through riows
    for(let y_tile = 0; y_tile < rows; y_tile++){
        //get the value of each position in the tile map array for each loop
        let value = tile_map[y_tile * columns + x_tile]
        //set the x tile position
        let tile_x_size = x_tile * size;
        //set the y tile position
        let tile_y_size = y_tile * size;
        //if the value is 0 put a x tile
        if(value == 0){
            tile_map_x.push(new X_tile(tile_x_size, tile_y_size, 30, 30, "lightgreen"))
        //if the value is 1 put a y tile
        }else if(value == 1)[
            tile_map_y.push(new Y_tile(tile_x_size, tile_y_size, 30, 30, "darkgreen"))
        ]
    }
}

console.log(tile_map_x);
//Movement Eventlistener for keydown
document.addEventListener('keydown', function(event) {
    if (event.code == "ArrowLeft") {
      leftkey = true;
      
    }
    if (event.code == "ArrowRight"){
      rightkey = true;
      
    }
    if (event.code == "ArrowUp"){
      upkey = true;
      
    }
  })
  
  //Movement Eventlistener for keyup
  document.addEventListener('keyup', function(event) {
    if (event.code == "ArrowLeft") {
      leftkey = false;
      
    }
    if (event.code == "ArrowRight"){
      rightkey = false;
      
      
    }
    if (event.code == "ArrowUp"){
      upkey = false;
      
    }
  })

//eventlistener for mouse  
window.addEventListener("mousemove", function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});  
  //animate function everything thats beeing active or actively checked gets in here
function animate() {
    requestAnimationFrame(animate);
    player.update();
    cannon.update();
    tile_map_x.forEach(function(draw_map){
        draw_map.update();
    })
    tile_map_y.forEach(function(draw_map){
        draw_map.update()
    })
}

animate();