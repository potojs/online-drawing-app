const socket = io();
const lines = {};
const col = Math.random() * 360;
document.title = "room: " + location.pathname.split("/")[2]

function setup(){
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
}
function draw(){
  noFill();
  strokeWeight(4);
  for(let id in lines){
    const paths = lines[id];
    for(const path of paths){
      beginShape();
      const strokeCol = path[0]?path[0].col:0;
      stroke(strokeCol, 255, 255);
      for(const vrtx of path){
        vertex(vrtx.x*width, vrtx.y*height);
      }
      endShape();
    }
  }
}
function mouseDragged(){
  socket.emit("drawing", {
    x: mouseX/width,
    y: mouseY/height,
    col
  });
  if(!lines[socket.id]){
    lines[socket.id] = [[]];
  }
  lines[socket.id][lines[socket.id].length-1].push({
    x: mouseX/width,
    y: mouseY/height,
    col
  });
}
function mouseReleased(){
  console.log("up")
  socket.emit("mouseup");
}
function mousePressed(){
  console.log("down")
  socket.emit("mousedown");
  if(!lines[socket.id]){
    lines[socket.id] = [];
  }
  lines[socket.id].push([]);
}
socket.on("drawing", msg=>{
  console.log(msg.id)
  if(!lines[msg.id]){
    lines[msg.id] = [[]];
  }
  lines[msg.id][lines[msg.id].length-1].push({
    x: msg.x,
    y: msg.y,
    col: msg.col
  });
})
socket.on("mouseup", msg=>{
  console.log(lines)
})
socket.on("mousedown", msg=>{
  console.log(lines);
  if(!lines[msg]){
    lines[msg] = [];
  }
  lines[msg].push([])
})