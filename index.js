const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

const res = 15;
const cols = Math.floor(canvas.width/res);
const rows = Math.floor(canvas.height/res);
const pointSize = Math.round(res/10);
const displayFieldCheck = document.getElementById("displayField");

let displayField = false;
let rad = res/4;
let field = [];

let dragging = false;

displayFieldCheck.onchange = () => {
  displayField = displayFieldCheck.checked;
  if (displayField) {
    drawField();
  }
  else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    marchingSquares();
  }
};
canvas.addEventListener('mousedown', () => dragging = true);
canvas.addEventListener('mouseup', () => dragging = false);

canvas.addEventListener('mousemove', e => {
  if (dragging) {
    let x = Math.floor(e.offsetX*cols/canvas.width);
    let y = Math.floor(e.offsetY*rows/canvas.height);
    field[x][y] = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawField();
    marchingSquares();
  }
});

function setup() {
  field = [];
  for (let i = 0; i < cols+1; i++) {
    field[i] = [];
    for (let j = 0; j < rows+1; j++) {
      field[i][j] = 0;
    }
  }
}

function drawField() {
  if (displayField) {
    for (let i = 0; i < cols + 1; i++) {
      for (let j = 0; j < rows + 1; j++) {
        circle(i*res, j*res, rad, field[i][j] ? "black" : "lightgray");
      }
    }
  }
}

function marchingSquares() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let a = {x: i*res, y: j*res};
      let b = {x: (i+1)*res, y: j*res};
      let c = {x: (i+1)*res, y: (j+1)*res};
      let d = {x: i*res, y: (j+1)*res};
      let numb = getVal(a, b, c, d);
      switch(numb) {
        case 1:
          line(a.x, a.y + res/2, a.x + res/2, a.y);
          break;
        case 2:
          line(a.x + res/2, a.y, b.x, b.y + res/2);
          break;
        case 3:
          line(a.x, a.y + res/2, b.x, b.y + res/2);
          break;
        case 4:
          line(d.x + res/2, d.y, b.x, b.y + res/2);
          break;
        case 5:
          line(a.x, a.y + res/2, d.x + res/2, d.y);
          line(a.x + res/2, a.y, b.x, b.y + res/2);
          break;
        case 6:
          line(a.x + res/2, a.y, d.x + res/2, d.y);
          break;
        case 7:
          line(a.x, a.y + res/2, d.x + res/2, d.y);
          break;
        case 8:
          line(a.x, a.y + res/2, d.x + res/2, d.y);
          break;
        case 9:
          line(a.x + res/2, a.y, d.x + res/2, d.y);
          break;
        case 10:
          line(a.x, a.y + res/2, a.x + res/2, a.y);
          line(d.x + res/2, d.y, b.x, b.y + res/2);
          break;
        case 11:
          line(d.x + res/2, d.y, b.x, b.y + res/2);
          break;
        case 12:
          line(a.x, a.y + res/2, b.x, b.y + res/2);
          break;
        case 13:
          line(a.x + res/2, a.y, b.x, b.y + res/2);
          break;
        case 14:
          line(a.x + res/2, a.y, a.x, a.y + res/2);
          break;
      }
    }
  }
}

setup();
drawField();
marchingSquares();

function getVal(a, b, c, d) {
  return field[a.x/res][a.y/res]*1 + field[b.x/res][b.y/res]*2 + field[c.x/res][c.y/res]*4 + field[d.x/res][d.y/res]*8;
}

function line(x1, y1, x2, y2){
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function circle(x, y, radius, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radius, 0, Math.PI*2, false);
  ctx.fill();
}