// PREGUNTAS DEL JUEGO
let preguntas = [
  {
    pregunta: "¿Cuántos minutos de actividad física se recomiendan al día?",
    respuestas: ["20", "30", "60", "120"],
    correcta: 2
  },
  {
    pregunta: "¿Qué debemos hacer antes de hacer ejercicio?",
    respuestas: ["Dormir", "Calentar", "Comer dulces", "Nada"],
    correcta: 1
  },
  {
    pregunta: "¿Qué actividad mejora la resistencia?",
    respuestas: ["Correr", "Dormir", "Videojuegos", "Ver televisión"],
    correcta: 0
  },
  {
    pregunta: "¿Qué alimento es más saludable?",
    respuestas: ["Fruta", "Chucherías", "Refrescos", "Bollería"],
    correcta: 0
  }
];

// VARIABLES DEL JUEGO
let actual = 0;
let puntos = 0;
let contador;
let bloqueado = false;

// FUNCIONES DEL JUEGO

// Mostrar pregunta
function mostrarPregunta() {
  if(actual >= preguntas.length) return;

  let p = preguntas[actual];

  document.getElementById("pregunta").innerText = p.pregunta;
  document.getElementById("timer").style.width = "100%"; // reinicia barra

  for(let i=0; i<4; i++){
    document.getElementById("r"+i).innerText = p.respuestas[i];
  }

  iniciarTiempo();
}

// Responder pregunta
function responder(opcion){
  if(bloqueado) return; // bloquea múltiples clics
  bloqueado = true;

  let p = preguntas[actual];

  if(opcion === p.correcta){
    puntos += 10;
    if(typeof sonidoAcierto === "function") sonidoAcierto();
    comprobarInsignias();
  } else {
    if(typeof sonidoError === "function") sonidoError();
  }

  document.getElementById("puntos").innerText = puntos;
  actual++;

  setTimeout(function(){
    bloqueado = false;
    if(actual < preguntas.length){
      mostrarPregunta();
    } else {
      document.getElementById("pregunta").innerHTML = 
        "🏆 Juego terminado<br>Puntuación final: " + puntos;
    }
  }, 3000);
}

// Temporizador visual
function iniciarTiempo(){
  clearInterval(contador);
  let tiempo = 10;
  let barra = document.getElementById("timer");

  contador = setInterval(function(){
    tiempo--;
    barra.style.width = (tiempo*10) + "%";

    if(tiempo <= 0){
      clearInterval(contador);
      actual++;
      if(actual < preguntas.length){
        mostrarPregunta();
      } else {
        document.getElementById("pregunta").innerHTML = 
          "🏆 Juego terminado<br>Puntuación final: " + puntos;
      }
    }
  }, 1000);
}

// Insignias desbloqueables
function comprobarInsignias(){
  if(puntos >= 30){
    document.getElementById("insignias").innerHTML += "🥗 Experto en hábitos saludables<br>";
  }
  if(puntos >= 60){
    document.getElementById("insignias").innerHTML += "🏃 Maestro del movimiento<br>";
  }
  if(puntos >= 100){
    document.getElementById("insignias").innerHTML += "🏆 Super atleta saludable<br>";
  }
}

// INICIAR JUEGO
mostrarPregunta();
