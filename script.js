const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 700;
const explosion =[];
// getBoundingClientRect() restituisce la posizione di un elemento e le sue dimensioni in relazione alla viewport dell'utente. In questo caso, lo utilizziamo per ottenere la posizione del canvas sullo schermo.
// Ci  serve per poter calcolare in modo corretto la posizione del mouse all'interno del canvas quando si verifica l'evento di click.
let canvasPosition = canvas.getBoundingClientRect();

class Explosion{
  constructor(x,y){
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.width = this.spriteWidth * 7;
    this.height = this.spriteHeight * 7;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.image = new Image();
    this.image.src = 'boom.png';
    this.frame = 0;
    this.timer = 0;
    
  }

  update(){
    this.timer++;

    if(this.timer % 10 === 0){
      this.frame++;
    }
  }

  draw(){
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

window.addEventListener('click', function(e){
  let posX = e.x - canvasPosition.left;
  let posY = e.y - canvasPosition.top;
  explosion.push(new Explosion(posX, posY));
  
});

function animate(){
  ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let index = 0; index < explosion.length; index++) {
    explosion[index].update();
    explosion[index].draw();
    if(explosion[index].frame > 5){
      explosion.splice(index, 1);
      index--;
    }
    
  }

  requestAnimationFrame(animate);
}

animate();