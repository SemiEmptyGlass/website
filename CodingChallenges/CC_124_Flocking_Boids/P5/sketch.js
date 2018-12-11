let lines=[];
function setup() {
createCanvas(1020,730);
for(let i=0;i<40;i++) {
lines[i] = new Line();
}
}

function draw() {
  background(0);

  for(let i=0;i<lines.length;i++) {
  lines[i].print();
  lines[i].update();
  }
    flocking();
}

function flocking() {
  let tempX=0;
  let tempY=0;
  let count=0;
  let avg;
    for(let i=0;i<lines.length;i++) {
      tempX=lines[i].vel.x;
      tempY=lines[i].vel.y;
      count=0;
          for(let j=0;j<lines.length;j++) {
            if(i!=j && lines[i].pos.dist(lines[j].pos)<lines[i].view
        &&  lines[i].pos.dist(lines[j].pos)>lines[i].view/4) {
              tempX+=lines[j].vel.x;
              tempY+=lines[j].vel.y;
              count++;
          }
        }
        if(count>0) {
        avg = createVector(tempX/count,tempY/count);
        lines[i].acc.add(avg.sub(lines[i].vel).mult(0.05))
        lines[i].vel.add(lines[i].acc);
        //lines[i].borders()
      }
    }
  }
