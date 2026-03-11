function iniciarTiempo(){

clearInterval(contador)

let tiempo=10

document.getElementById("tiempo").innerText=tiempo

contador=setInterval(()=>{

tiempo--

document.getElementById("tiempo").innerText=tiempo

if(tiempo<=0){

clearInterval(contador)

actual++

mostrarPregunta()

}

},1000)

}
