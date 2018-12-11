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
  
  
  class Point {
  constructor(x,y,time) {
    this.pos=createVector(x,y);
    this.r=5;
    this.time=time;
  }
}

class Line {
  constructor() {
    this.line=[];
    this.pos=createVector(random(width),random(height));
    this.line.push(new Point(this.pos.x,this.pos.y,this.time));
    this.vel=createVector(random(-3,3),random(-3,3));
    this.acc=createVector();
    this.view=80;
    this.r=5;
    this.time=30;
  }
  update(){
    //this.acc=p5.Vector.random2D()
    this.vel.rotate(random(-0.2,0.2))
    this.vel.mult(1-random(-0.01,0.01))
    if(this.vel.mag()<3)
    this.vel.mult(1.1)
    this.borders();;
    this.vel.add(this.acc);
    this.vel.limit(4)
    this.pos.add(this.vel);
    this.line.push(new Point(this.pos.x,this.pos.y,this.time));
    this.acc.mult(0);
  }

  print() {
    noStroke();
    for(let i=this.line.length-1;i>=0;i--) {
    if(this.line[i].time>0)  {
    this.line[i].r = map(this.line[i].time,0,this.time,0,this.r);
    let transparency = map(this.line[i].time,0,this.time,0,255)
    fill(250,200,5,transparency);
    ellipse(this.line[i].pos.x,this.line[i].pos.y,this.line[i].r,this.line[i].r);
    this.line[i].time--;
  }
  else this.line.splice(i,1);
  }
  }
  borders() {

    if(this.pos.x>width)
    this.pos.x=0;
    if(this.pos.x<0)
    this.pos.x=width;
    if(this.pos.y>height)
    this.pos.y=0;
    if(this.pos.y<0)
    this.pos.y=height;

    let mousePos = createVector(mouseX,mouseY);
    if(mousePos.dist(this.pos)<60) {
      let force = (1-mousePos.dist(this.pos))/30;
      this.acc.add(mousePos.sub(this.pos).mult(force/200));
    }
  }
  }
