// VARIABLES DEL JUEGO

let actual = 0
let puntos = 0
let contador
let equipoSeleccionado = null



// SELECCIONAR EQUIPO

function seleccionarEquipo(i){

equipoSeleccionado = i

alert("Equipo seleccionado: " + equipos[i].nombre)

actualizarRanking()

}



// MOSTRAR PREGUNTA

function mostrarPregunta(){

if(actual >= preguntas.length){

mostrarPodio()

return

}

let p = preguntas[actual]

document.getElementById("pregunta").innerText = p.pregunta

for(let i=0;i<4;i++){

document.getElementById("r"+i).innerText = p.respuestas[i]

}

iniciarTiempo()

}



// RESPONDER

function responder(opcion){

clearInterval(contador)

let p = preguntas[actual]

if(opcion === p.correcta){

puntos += 10

if(equipoSeleccionado !== null){

equipos[equipoSeleccionado].puntos += 10

}

if(typeof sonidoAcierto === "function") sonidoAcierto()

comprobarInsignias()

}else{

if(typeof sonidoError === "function") sonidoError()

}

document.getElementById("puntos").innerText = puntos

actualizarRanking()

actual++

setTimeout(()=>{

mostrarPregunta()

},2000)

}



// TEMPORIZADOR CIRCULAR

function iniciarTiempo(){

clearInterval(contador)

let tiempo = 10

document.getElementById("tiempo").innerText = tiempo

contador = setInterval(()=>{

tiempo--

document.getElementById("tiempo").innerText = tiempo

if(tiempo <= 0){

clearInterval(contador)

actual++

mostrarPregunta()

}

},1000)

}



// INSIGNIAS SALUDABLES

function comprobarInsignias(){

if(puntos >= 30){

document.getElementById("insignias").innerHTML += "🥗 Experto saludable<br>"

}

if(puntos >= 60){

document.getElementById("insignias").innerHTML += "🏃 Maestro del movimiento<br>"

}

if(puntos >= 100){

document.getElementById("insignias").innerHTML += "🏆 Super atleta saludable<br>"

}

}



// RANKING EN VIVO

function actualizarRanking(){

equipos.sort((a,b)=>b.puntos-a.puntos)

let html = "🏆 Ranking<br>"

equipos.forEach((e,i)=>{

html += (i+1) + ". " + e.nombre + " - " + e.puntos + " pts<br>"

})

document.getElementById("ranking").innerHTML = html

}



// PODIO FINAL

function mostrarPodio(){

equipos.sort((a,b)=>b.puntos-a.puntos)

let html = "<h2>🏆 PODIO FINAL</h2>"

html += "🥇 " + equipos[0].nombre + " - " + equipos[0].puntos + " pts<br>"
html += "🥈 " + equipos[1].nombre + " - " + equipos[1].puntos + " pts<br>"
html += "🥉 " + equipos[2].nombre + " - " + equipos[2].puntos + " pts<br>"

document.getElementById("pregunta").innerHTML = html

if(typeof sonidoVictoria === "function") sonidoVictoria()

}



// INICIAR JUEGO

mostrarPregunta()
