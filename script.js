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
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = 'boom.png';
    this.frame = 0;
    this.timer = 0;
    this.angle = Math.random() * 6.2;
    this.sound = new Audio();
    this.sound.src = 'boom.wav';
  }

  update(){
    // Se siamo al primo frame (frame === 0), allora suona il suono dell'esplosione.
    if (this.frame === 0) {
      this.sound.play();
    }

    // Incrementa il timer interno dell'esplosione.
    this.timer++;

    // Se il timer   multiplo di 10 (ad esempio 10, 20, 30, ...), allora incrementa il frame dell'esplosione. Ci   per mostrare l'animazione dell'esplosione.
    if(this.timer % 10 === 0){
      this.frame++;
    }
  }

  draw(){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle * 0.05);
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 0 - this.width * 0.5, 0 - this.height * 0.5, this.width, this.height);
    ctx.restore();
  }
}

// funzione che si attiva quando l'utente clicca sul canvas. 
window.addEventListener('click', function(e){
  createAnimation(e);
});

function createAnimation(e){
  // calcola la posizione del mouse all'interno del canvas e crea una nuova esplosione in quel punto.
  let posX = e.x - canvasPosition.left;
  let posY = e.y - canvasPosition.top;
  explosion.push(new Explosion(posX, posY));
}
function animate(){
  // cancella il contenuto del canvas per evitare di disegnare sempre sopra lo stesso frame
  ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);

  // loop per aggiornare e disegnare ogni esplosione
  for (let index = 0; index < explosion.length; index++) {
    // aggiorna l'esplosione (frame, timer, ecc..)
    explosion[index].update();

    // disegna l'esplosione nel canvas
    explosion[index].draw();

    // se l'esplosione  finita (frame > 5), rimuovila dall'array
    if(explosion[index].frame > 5){
      explosion.splice(index, 1);
      index--; // decrementa l'indice per non saltare elementi quando si elimina uno
    }
  }

  requestAnimationFrame(animate);
}

animate();