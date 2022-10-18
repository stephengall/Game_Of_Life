var scale;
var grid = [];

function setup() {
  scale = 35;

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
  printGrid();

}
function checkForClicks(){
  if(mouseIsPressed){
    var posX = floor(mouseX / width * scale);
    var posY = floor(mouseY / height * scale);
    grid[posX][posY] = true;
  }
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
