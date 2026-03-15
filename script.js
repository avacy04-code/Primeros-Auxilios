let actual = 0
let puntos = 0
let contador = null
let equipoSeleccionado = null
let insigniasGanadas = []

function mostrarPregunta(){

if(actual >= preguntas.length){
mostrarPodio()
return
}

let p = preguntas[actual]

document.getElementById("pregunta").innerText = p.pregunta

p.respuestas.forEach((r,i)=>{
document.getElementById("r"+i).innerText = r
})

iniciarTiempo()
}

function responder(opcion){

clearInterval(contador)

let p = preguntas[actual]

if(opcion === p.correcta){

puntos += 10

sonidoAcierto()

comprobarInsignias()

}else{

sonidoError()

}

document.getElementById("puntos").innerText = puntos

actual++

setTimeout(mostrarPregunta,1500)

}

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

function comprobarInsignias(){

const logros = [
{p:30,t:"🥗 Experto saludable"},
{p:60,t:"🏃 Maestro del movimiento"},
{p:100,t:"🏆 Super atleta"}
]

logros.forEach(l=>{
if(puntos >= l.p && !insigniasGanadas.includes(l.t)){
insigniasGanadas.push(l.t)
document.getElementById("insignias").innerHTML += l.t+"<br>"
}
})

}

function mostrarPodio(){

document.getElementById("pregunta").innerHTML =
"🏆 Juego terminado<br>Puntos: "+puntos

sonidoVictoria()

}

mostrarPregunta()

// RULETA

let categorias = [
"Salud",
"Deporte",
"Alimentación",
"Cuerpo humano"
]

function girarRuleta(){

let i = Math.floor(Math.random()*categorias.length)

let categoria = categorias[i]

document.getElementById("categoria").innerText =
"🎡 Categoría: "+categoria

ruletaSound.play()

}

// MISIONES

let misiones = [
"Salta 3 veces",
"Di una fruta",
"Imita un animal",
"Corre en el sitio"
]

function mostrarMision(){

let m = misiones[Math.floor(Math.random()*misiones.length)]

document.getElementById("mision").innerText =
"🎯 Misión: "+m

}
