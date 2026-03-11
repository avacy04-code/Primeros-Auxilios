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

let ruleta = document.getElementById("ruleta")

let grados = Math.floor(Math.random()*360)+720

ruleta.style.transform="rotate("+grados+"deg)"

setTimeout(()=>{

let reto = retos[Math.floor(Math.random()*retos.length)]

document.getElementById("reto").innerText="🎯 RETO: "+reto

},3000)

}
