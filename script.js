let preguntas = []
let actual = 0
let puntuacion = 0

fetch("preguntas.json")
.then(res => res.json())
.then(data => {
preguntas = data
mostrarPregunta()
})

function mostrarPregunta(){

let p = preguntas[actual]

document.getElementById("pregunta").innerText = p.pregunta

for(let i=0;i<4;i++){
document.getElementById("r"+i).innerText = p.respuestas[i]
}

}

function responder(opcion){

if(opcion === preguntas[actual].correcta){
puntuacion++
document.getElementById("resultado").innerText="✅ Correcto"
}else{
document.getElementById("resultado").innerText="❌ Incorrecto"
}

actual++

if(actual < preguntas.length){
setTimeout(mostrarPregunta,1000)
}else{
document.getElementById("quiz").innerHTML =
"<h2>Tu puntuación: "+puntuacion+" / "+preguntas.length+"</h2>"
}

}
