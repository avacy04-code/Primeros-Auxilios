let retos=[
"20 jumping jacks",
"15 sentadillas",
"10 burpees",
"30 segundos plancha",
"carrera alrededor del gimnasio",
"equilibrio 20 segundos",
"reto cooperativo con balón"
]

function girarRuleta(){

let n=Math.floor(Math.random()*retos.length)

document.getElementById("reto").innerText="🎯 RETO: "+retos[n]

if(typeof sonidoRetoActivo==="function") sonidoRetoActivo()

}
