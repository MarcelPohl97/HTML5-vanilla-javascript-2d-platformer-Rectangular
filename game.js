//acces the canvas in html == game_root
let game_root = document.querySelector('canvas')

//set width and height of the game window
game_root.width = 1080;
game_root.height = 736;


//acces the game_root
let g_r = game_root.getContext('2d');

//set keys to false at the beginning of the game
let leftkey = false;
let rightkey = false;
let upkey = false;

let onground = false


//player function
function Player(x, y, width, height, color){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dx = 0;
    this.dy = 0;
    this.gravity = 2;
    this.friction = 0.9

    //draw player on the screen
    this.draw = function(){
        g_r.clearRect(0, 0, 1080, 736);
        g_r.beginPath();
        g_r.rect(this.x, this.y, this.width, this.height);
        g_r.fillStyle = this.color;
        g_r.fill();
        this.y += this.gravity
        this.x += this.dx;
        this.y += this.dy;
        this.dx *= this.friction;
        this.dy *= this.friction;
    }

    this.collision_detection = function() {
        if(this.y >= 704){
            this.gravity = 0;
            this.y = 704;
            onground = true;
        }
    }

    this.update = function() {
        this.draw();
        this.movement();
        this.collision_detection();
    }

    this.movement = function() {
        if(upkey){
            if(onground){
                onground = false;
                this.gravity = 2;
                this.dy -= 16;
            }
        }
        if(leftkey){
            this.dx -= 0.5
        }
        if(rightkey){
            this.dx += 0.5
        }
    }
}

function X_tile(x, y, width, height, color){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color

    this.draw = function(){
        g_r.beginPath();
        g_r.rect(this.x, this.y, this.width, this.height);
        g_r.fillStyle = this.color;
        g_r.fill();
    }
}

function Y_tile(x, y, width, height, color){
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.color = color

    this.draw = function(){
        g_r.beginPath();
        g_r.rect(this.x, this.y, this.width, this.height);
        g_r.fillStyle = this.color;
        g_r.fill();
    }

    this.collision = function() {
        if(player.x < this.x + this.width &&
            player.x + player.width > this.x &&
            player.y < this.y + this.height &&
            player.y + player.width > this.y){
                if(player.y <= this.y){
                    this.gravity = 0;
                    player.y = this.y - 32;
                    onground = true;
                }
                if(player.y >= this.y){
                    player.y = this.y + 32; 
                    onground = false;
                }
            }
    }
    
    this.update = function(){
        this.draw();
        this.collision()
    }
}
tile_map_x = []
tile_map_y = []
player = new Player(400, 500, 32, 32, "green");


let columns = 7;
let rows = 21;
let size = 32

tile_map = [0,0,0,0,0,0,0,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            2,2,2,2,2,2,2,
            1,1,1,1,1,1,1];

for(let x_tile = 0; x_tile < columns; x_tile++){

    for(let y_tile = 0; y_tile < rows; y_tile++){

        let value = tile_map[y_tile * columns + x_tile]
        let tile_x_size = x_tile * size;
        let tile_y_size = y_tile * size;
        if(value == 0){
            tile_map_x.push(new X_tile(tile_x_size, tile_y_size, 32, 32, "lightgreen"))
        }else if(value == 1)[
            tile_map_y.push(new Y_tile(tile_x_size, tile_y_size, 32, 32, "darkgreen"))
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

  //animate function everything thats beeing active or actively checked gets in here
function animate() {
    requestAnimationFrame(animate);
    player.update();
    tile_map_x.forEach(function(draw_map){
        draw_map.draw();
    })
    tile_map_y.forEach(function(draw_map){
        draw_map.update()
        
    })
}

animate();