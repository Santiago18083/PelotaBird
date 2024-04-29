let imagenFondo
let imagenInicio
let personaje
let obstaculo
let estado = 0  // 0: menú 1: jugando 2: gameOver
let nube
let x = 0
let posY = 200
let dY = 3
let wallX = []
let wallY = []  
let puntaje = 0
let puntajeMax = 0
let recordAnterior = 0
let musicaRecord
let musicaJuego

function preload() {
  imagenFondo = loadImage('./images/FondoJuego.jpg');
  personaje = loadImage('./images/Pelota.gif');
  imagenInicio = loadImage('./images/Fondoinicio.jpg');
  obstaculo = loadImage('./images/Paredbat.png');
  musicaRecord = loadSound('./sounds/Aplausos.mp3')
  musicaJuego = loadSound('./sounds/musicafondo.mp3')
}

function setup() {
  createCanvas(1200, 600);
  textSize(34 )
}

function draw() {
  // put drawing code here
  if (estado === 1) {  // Jugando
    imageMode(CORNER)
    background(255,255,255)
    image(imagenFondo, x, 0)
    image(imagenFondo, imagenFondo.width + x, 0)
    x = x - 5
    dY = dY + 1
    posY = posY + dY
    if (x < -imagenFondo.width){
      x = 0
    }

    //Obstaculos
    for (let i=0; i < wallX.length; i++) {
      imageMode(CENTER)
      image(obstaculo, wallX[i], wallY[i] - 380)
      image(obstaculo, wallX[i], wallY[i] + 380)
      
      if (wallX[i] < 0) {
        wallX[i] = width
        wallY[i] = random(300, 400)
      }
      if (wallX[i] === 100) {
        puntaje = puntaje + 1
        puntajeMax = max(puntaje, puntajeMax)
      }

      wallX[i] = wallX[i] - 5
      //Revisando si el personaje se sale de la pantalla
      if (posY > height+60 || posY < -60 || (abs(wallX[i]-100) < 60 
          && abs(posY - wallY[i])>100 )) {
            musicaJuego.stop()
            estado = 0
      }
    }

    //Personaje
    image(personaje, 100, posY, 60,60)
    fill(255)
    text("Puntaje: " + puntaje, width/2-60, 30)
    //Nube
    //image(nube, 100, 400, 60,60)
  } else {
    background(0)
    imageMode(CORNER)
    cursor()
    image(imagenInicio, 0, 0, width, height)
    textAlign(CENTER,CENTER)
    fill(0)
    text("Pelota Bird", width/2 , height/2 + 240)
    text("Puntaje máximo: " + puntajeMax, width/2 , height/2 + 280)
    if (puntajeMax > recordAnterior) {
      if (!musicaRecord.isPlaying())
      musicaRecord.play()
    }
  }
}

function mousePressed() {
  if (estado === 0) {
    estado = 1
    x = 0
    posY = 200
    dY = 3
    // Posiciones iniciales de los obstáculos
    wallX = [400, 700, 1000, 1300];
    wallY[0] = random(350, 450);
    wallY[1] = random(350, 450);
    wallY[2] = random(350, 450);
    wallY[3] = random(350, 450); 
    puntaje = 0
    recordAnterior = puntajeMax
    noCursor()
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
    musicaJuego.loop()
  }
  dY = -15
}