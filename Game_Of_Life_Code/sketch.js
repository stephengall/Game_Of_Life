var scale; //dictates size of pixels in the grid
var grid = []; //tracks current state of the grid
var counter = 0; //used to track how many frames have elapsed since last update

function setup() {
  scale = 40;
  createCanvas(800, 800);
  for(var i = 0; i < scale; i++){
    var temp = [];
    for(var j = 0; j < scale; j++){
      temp.push(false);
    }
    grid.push(temp);
  }
}
function draw() {
  background(51);
  checkForClicks();
  if(counter == 10){
    evaluate();
    counter = 0;
  }
  printGrid();
  counter++;
}
function checkForClicks(){
  //ensures indexes outside of the canvas are not accessed
  if(mouseX < 0 || mouseX >= width || mouseY < 0 || mouseY >= width) return;

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

  for(var i = 0; i < scale; i++){
    for(var j = 0; j < scale; j++){
      var neighbours = 0;

      for(var x = -1; x <= 1; x++){
        for(var y = -1; y <= 1; y++){
          if((i + y >= 0 && i + y < scale) && (j + x >= 0 && j + x < scale)){
            if(x == 0 && y == 0) continue;
            if(grid[i + y][j + x]) neighbours++;
          }
        }
      }
      //applying changes to nextGrid based on number of neighbours
      if(grid[i][j] && (neighbours == 2 || neighbours == 3)) nextGrid[i][j] = true;
      else if(!grid[i][j] && neighbours == 3) nextGrid[i][j] = true;
      else nextGrid[i][j] = false;
    }
  }
  //copying over old grid to newGrid
  grid = nextGrid;
}
function printGrid(){
  for(var i = 0; i < scale; i++){
    for(var j = 0; j < scale; j++){
      if(grid[i][j]){
        var xPos = i * (width / scale);
        var yPos = j * (height / scale);
        //drawing rectangle
        noStroke();
        fill(255);
        rect(xPos, yPos, width / scale, height / scale);
      }
    }
  }
}
