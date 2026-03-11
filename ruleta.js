function girarRuleta(){

let ruleta=document.getElementById("ruleta")

let grados=Math.floor(Math.random()*360)+1440

ruleta.style.transform="rotate("+grados+"deg)"

setTimeout(()=>{

let sector=Math.floor((grados%360)/45)

let reto=retos[sector]

document.getElementById("reto").innerText="🎯 RETO: "+reto

},4000)

}
