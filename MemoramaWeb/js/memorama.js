//Memorama version Web 

let iconos;
let selectors = [];

var marcador1 = 0;
var marcador2 = 0;
var marcador1texto = document.getElementById('marcador1');
var marcador2texto = document.getElementById('marcador2');

let turno = true;
var jugador1 = document.getElementById('jugador1');
let valorjugador1 = "";
var jugador2 = document.getElementById('jugador2');
let valorjugador2 = "";

var nomjuga1 = document.getElementById('nombrejuga1');
var nomjuga2 = document.getElementById('nombrejuga2'); 

jugador1.addEventListener('blur',() =>{
    valorjugador1 = jugador1.value;
    jugador1.remove();
})

jugador2.addEventListener('blur',() =>{
    valorjugador2 = jugador2.value;
    jugador2.remove();
})

//generarTablero();
function cargarIconos() {
  iconos = [
    `<img src="img/carta1.jpg">`,
    `<img src="img/carta2.jpg">`,
    `<img src="img/carta3.jpg">`,
    `<img src="img/carta4.jpg">`,
    `<img src="img/carta5.jpg">`,
    `<img src="img/carta6.jpg">`,
    `<img src="img/carta7.jpg">`,
    `<img src="img/carta8.jpg">`,
    `<img src="img/carta9.jpg">`,
    `<img src="img/carta10.jpg">`,
    `<img src="img/carta11.jpg">`,
    `<img src="img/carta12.jpg">`,
    `<img src="img/carta13.jpg">`,
    `<img src="img/carta14.jpg">`,
    `<img src="img/carta15.jpg">`,
  ];
}

function generarTablero() {
    const Biniciaar = document.getElementById('botoniniciar');
    actualizarTurno();
    jugador1.remove();
    jugador2.remove();
    Biniciaar.remove();
  cargarIconos();

  let tablero = document.getElementById("tablero");

  let tarjetas = [];
  let len = iconos.length * 2;
  for (let i = 0; i < len; i++) {
    tarjetas.push(`
        <div class="mesaCartas" onclick="CartaSeleccionada(${i})">
            <div class="carta" id="card${i}">
                <div class="face front" id="back${i}">
                ${iconos[0]}
                </div>
                <div class="face back"><img src="img/reverso.jpg"></div>
            </div>
        </div>
      `);
    if (i % 2 == 1) {
      iconos.splice(0, 1);
    }
  }
  tarjetas.sort(() => Math.random() - 0.5);
  tablero.innerHTML = tarjetas.join("");
}

function CartaSeleccionada(i) {
  let card = document.getElementById("card" + i);
  if (card.style.transform != "rotateY(180deg)") {
    card.style.transform = "rotateY(180deg)";
    selectors.push(i);
  }
  if (selectors.length == 2) {
    DosSeleccionadas(selectors);
    selectors = [];
  }
}

function DosSeleccionadas(selectors) {
  setTimeout(() => {
    let back1 = document.getElementById("back" + selectors[0]);
    let back2 = document.getElementById("back" + selectors[1]);

    if (back1.innerHTML != back2.innerHTML) {
      let c1 = document.getElementById("card" + selectors[0]);
      let c2 = document.getElementById("card" + selectors[1]);
      c1.style.transform = "rotateY(0deg)";
      c2.style.transform = "rotateY(0deg)";

      turno = !turno;
      actualizarTurno();
    } else {
      back1.style.opacity = 0.1;
      back2.style.opacity = 0.1;
      if (turno) {
        marcador1++;
        marcador1texto.textContent = "Puntaje del Jugador 1 " + valorjugador1 + ": " + marcador1;
      } else {
        marcador2++;
        marcador2texto.textContent = "Puntaje del jugador 2  " + valorjugador2 + ": " + marcador2;
      }
    }
    Ganador();
  }, 1000);
}

function actualizarTurno(){
    if (turno) {
      nomjuga1.textContent = "Turno: Jugador 1 " + valorjugador1;
    } else {
      nomjuga1.textContent = "Turno: Jugador 2 " + valorjugador2;
    }
}

function Ganador(){
    if(marcador1 + marcador2 == 15){
        if(marcador1 > marcador2){
            alert("Gano el Jugador 1 " + valorjugador1)
        }else if(marcador1 == marcador2){
            alert("Los jugadores 1 " + valorjugador1 + "y 2 " + valorjugador2 + " Han quedado empate");
        } else{
            alert("Gano el jugador 2 " + valorjugador2)
        }
    }
}

function ReiniciarJuego(){
    location.reload();
}