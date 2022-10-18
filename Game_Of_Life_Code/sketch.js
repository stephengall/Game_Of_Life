var scale; //dictates size of pixels in the grid
var grid = []; //tracks current state of the grid
var counter = 0; //used to track how many frames have elapsed since last update

function setup() {
  scale = 50;
  createCanvas(800, 800);
  for(var i = 0; i < scale; i++){
    var temp = [];
    for(var j = 0; j < scale; j++){
      temp.push(false);
    }
    grid.push(temp);
  }
}
//called every frame
function draw() {
  background(255, 255, 230, 75);
  checkForClicks();
  if(counter == 15){
    evaluate();
    counter = 0;
  }
  printGrid();
  counter++;
}
//used for clearing canvas using the 'c' key
function keyPressed(){
  if(keyCode == 67){
    for(var i = 0; i < scale; i++){
      for(var j = 0; j < scale; j++){
        grid[i][j] = false;
      }
    }
  }
}

function checkForClicks(){
  //ensures indexes outside of the canvas are not accessed
  if(mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= height) return;

  if(mouseIsPressed){
    var posX = floor(mouseX / width * scale);
    var posY = floor(mouseY / height * scale);
    grid[posX][posY] = true;
  }
}
function evaluate(){
  //initialising new grid to copy over new state
  var nextGrid = [];
  for(var i = 0; i < scale; i++){
    var temp = [];
    for(var j = 0; j < scale; j++){
      temp.push(false);
    }
    nextGrid.push(temp);
  }
  //evaluating every space for nextGrid
  for(var i = 0; i < scale; i++){
    for(var j = 0; j < scale; j++){
      var neighbours = 0;

      //counting neighbours
      for(var x = -1; x <= 1; x++){
        for(var y = -1; y <= 1; y++){
          if((i + y >= 0 && i + y < scale) && (j + x >= 0 && j + x < scale)){
            if(x == 0 && y == 0) continue;
            if(grid[i + y][j + x]) neighbours++;
          }
        }
      }
      //applying changes to nextGrid based on number of neighbours

      //any live cell with two or three live neighbours survives
      if(grid[i][j] && (neighbours == 2 || neighbours == 3)) nextGrid[i][j] = true;
      //any dead cell with three live neighbours becomes alive
      else if(!grid[i][j] && neighbours == 3) nextGrid[i][j] = true;
      //all other live cells die in the next gen
      else nextGrid[i][j] = false;
    }
  }
  //copying over old grid to newGrid
  grid = nextGrid;
}
function printGrid(){
  //draws grid at given scale, draws square where grid is true
  colorMode(RGB, 200, 250);
  for(var i = 0; i < scale; i++){
    for(var j = 0; j < scale; j++){
      if(grid[i][j]){
        var xPos = i * (width / scale);
        var yPos = j * (height / scale);
        //drawing rectangle
        noStroke();
        fill(i * 10 % 255, j * 10 % 255, 150, 100);
        rect(xPos, yPos, width / scale, height / scale);
      }
    }
  }
}
