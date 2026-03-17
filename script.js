let equipos = [];
let rondaActual = 1;
let equipoTurno = 0;
let preguntaEnRonda = 0;
let preguntasUsadas = [];
let retoActual = "";
let tiempoTotalRestante = TIEMPO_TOTAL_SEGUNDOS;
let temporizadorTotal = null;
let temporizadorPregunta = null;
let tiempoPreguntaRestante = TIEMPO_POR_PREGUNTA;
let preguntaActual = null;
let partidaIniciada = false;

function iniciarPartida() {
  const nombre1 = document.getElementById("equipo1").value.trim() || "Dragón";
  const nombre2 = document.getElementById("equipo2").value.trim() || "Tigre";
  const nombre3 = document.getElementById("equipo3").value.trim() || "Águila";
  const nombre4 = document.getElementById("equipo4").value.trim() || "Tiburón";

  equipos = [
    { nombre: nombre1, puntos: 0 },
    { nombre: nombre2, puntos: 0 },
    { nombre: nombre3, puntos: 0 },
    { nombre: nombre4, puntos: 0 }
  ];

  rondaActual = 1;
  equipoTurno = 0;
  preguntaEnRonda = 0;
  preguntasUsadas = [];
  retoActual = "";
  tiempoTotalRestante = TIEMPO_TOTAL_SEGUNDOS;
  partidaIniciada = true;

  document.getElementById("panelInicio").classList.add("oculto");
  document.getElementById("panelJuego").classList.remove("oculto");
  document.getElementById("panelFinal").classList.add("oculto");

  document.getElementById("totalRondas").innerText = TOTAL_RONDAS;

  actualizarCabecera();
  actualizarRanking();
  actualizarDetallePuntos();
  iniciarTemporizadorTotal();
  comenzarRonda();
}

function comenzarRonda() {
  if (!partidaIniciada) return;

  if (rondaActual > TOTAL_RONDAS) {
    finalizarPartida();
    return;
  }

  preguntaEnRonda = 0;
  actualizarCabecera();
  mostrarMensaje(`Turno del equipo ${equipos[equipoTurno].nombre}. Primero debe completar el reto.`);
  mostrarReto();
}

function actualizarCabecera() {
  document.getElementById("rondaActual").innerText = rondaActual;
  document.getElementById("equipoTurno").innerText = equipos[equipoTurno]?.nombre || "-";
  document.getElementById("contadorPregunta").innerText = `${preguntaEnRonda}/${PREGUNTAS_POR_RONDA}`;
}

function iniciarTemporizadorTotal() {
  clearInterval(temporizadorTotal);
  actualizarTiempoTotalUI();

  temporizadorTotal = setInterval(() => {
    tiempoTotalRestante--;
    actualizarTiempoTotalUI();

    if (tiempoTotalRestante <= 0) {
      clearInterval(temporizadorTotal);
      mostrarMensaje("⏰ Tiempo total agotado.");
      finalizarPartida();
    }
  }, 1000);
}

function actualizarTiempoTotalUI() {
  const minutos = Math.floor(tiempoTotalRestante / 60);
  const segundos = tiempoTotalRestante % 60;
  document.getElementById("tiempoTotal").innerText =
    String(minutos).padStart(2, "0") + ":" + String(segundos).padStart(2, "0");
}

function mostrarReto() {
  if (!partidaIniciada) return;

  clearInterval(temporizadorPregunta);
  ocultarPreguntas();

  retoActual = obtenerRetoAleatorio();
  document.getElementById("faseTexto").innerText = "FASE 1 · RETO";
  document.getElementById("retoTexto").innerText = retoActual;
  document.getElementById("retoBox").classList.remove("oculto");

  if (typeof sonidoReto === "function") {
    sonidoReto();
  }
}

function superarReto() {
  if (!partidaIniciada) return;

  equipos[equipoTurno].puntos += 20;
  actualizarRanking();
  actualizarDetallePuntos();

  document.getElementById("retoBox").classList.add("oculto");
  mostrarMensaje(`✅ Reto superado por ${equipos[equipoTurno].nombre}. +20 puntos`);
  comenzarBateriaPreguntas();
}

function comenzarBateriaPreguntas() {
  preguntaEnRonda = 1;
  actualizarCabecera();
  mostrarPregunta();
}

function obtenerPreguntaNoUsada() {
  if (preguntasUsadas.length >= preguntas.length) {
    preguntasUsadas = [];
  }

  let disponibles = preguntas.filter((_, indice) => !preguntasUsadas.includes(indice));
  const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
  const preguntaSeleccionada = disponibles[indiceAleatorio];

  const indiceReal = preguntas.findIndex(
    p =>
      p.pregunta === preguntaSeleccionada.pregunta &&
      JSON.stringify(p.respuestas) === JSON.stringify(preguntaSeleccionada.respuestas)
  );

  preguntasUsadas.push(indiceReal);
  return preguntaSeleccionada;
}

function mostrarPregunta() {
  if (!partidaIniciada) return;

  document.getElementById("faseTexto").innerText = "FASE 2 · BATERÍA DE PREGUNTAS";
  document.getElementById("preguntaBox").classList.remove("oculto");

  limpiarEstadosBotones();

  preguntaActual = obtenerPreguntaNoUsada();
  document.getElementById("pregunta").innerText = preguntaActual.pregunta;

  for (let i = 0; i < 4; i++) {
    const boton = document.getElementById("r" + i);
    boton.innerText = preguntaActual.respuestas[i];
    boton.disabled = false;
  }

  iniciarTemporizadorPregunta();
  actualizarCabecera();
}

function iniciarTemporizadorPregunta() {
  clearInterval(temporizadorPregunta);
  tiempoPreguntaRestante = TIEMPO_POR_PREGUNTA;
  document.getElementById("tiempoPregunta").innerText = tiempoPreguntaRestante;

  temporizadorPregunta = setInterval(() => {
    tiempoPreguntaRestante--;
    document.getElementById("tiempoPregunta").innerText = tiempoPreguntaRestante;

    if (tiempoPreguntaRestante <= 0) {
      clearInterval(temporizadorPregunta);
      bloquearRespuestas();
      mostrarRespuestaCorrecta();
      mostrarMensaje("⏰ Tiempo agotado. Sin puntos en esta pregunta.");
      setTimeout(siguientePasoTrasPregunta, 1500);
    }
  }, 1000);
}

function responder(opcion) {
  if (!partidaIniciada || !preguntaActual) return;

  clearInterval(temporizadorPregunta);
  bloquearRespuestas();

  const correcta = preguntaActual.correcta;
  const botonElegido = document.getElementById("r" + opcion);
  const botonCorrecto = document.getElementById("r" + correcta);

  botonCorrecto.classList.add("correcta");

  if (opcion === correcta) {
    equipos[equipoTurno].puntos += 10;
    mostrarMensaje(`✅ Correcto. ${equipos[equipoTurno].nombre} gana 10 puntos.`);
    if (typeof sonidoAcierto === "function") sonidoAcierto();
  } else {
    botonElegido.classList.add("incorrecta");
    mostrarMensaje(`❌ Incorrecto. La respuesta correcta era: ${preguntaActual.respuestas[correcta]}`);
    if (typeof sonidoError === "function") sonidoError();
  }

  actualizarRanking();
  actualizarDetallePuntos();

  setTimeout(siguientePasoTrasPregunta, 1500);
}

function siguientePasoTrasPregunta() {
  if (preguntaEnRonda < PREGUNTAS_POR_RONDA) {
    preguntaEnRonda++;
    actualizarCabecera();
    mostrarPregunta();
  } else {
    finalizarRonda();
  }
}

function finalizarRonda() {
  ocultarPreguntas();
  mostrarMensaje(`🏁 Fin de la ronda ${rondaActual} para ${equipos[equipoTurno].nombre}.`);

  equipoTurno++;

  if (equipoTurno >= equipos.length) {
    equipoTurno = 0;
    rondaActual++;
  }

  actualizarCabecera();

  setTimeout(() => {
    if (rondaActual > TOTAL_RONDAS) {
      finalizarPartida();
    } else {
      comenzarRonda();
    }
  }, 1800);
}

function actualizarRanking() {
  const copia = [...equipos].sort((a, b) => b.puntos - a.puntos);

  let html = "";
  copia.forEach((equipo, index) => {
    html += `<div>${index + 1}. ${equipo.nombre} — <strong>${equipo.puntos} pts</strong></div>`;
  });

  document.getElementById("ranking").innerHTML = html;
}

function actualizarDetallePuntos() {
  let html = "";
  equipos.forEach(equipo => {
    html += `<div>${equipo.nombre}: <strong>${equipo.puntos}</strong> puntos</div>`;
  });
  document.getElementById("detallePuntos").innerHTML = html;
}

function mostrarMensaje(texto) {
  document.getElementById("mensajeBox").innerText = texto;
}

function bloquearRespuestas() {
  for (let i = 0; i < 4; i++) {
    document.getElementById("r" + i).disabled = true;
  }
}

function limpiarEstadosBotones() {
  for (let i = 0; i < 4; i++) {
    const boton = document.getElementById("r" + i);
    boton.classList.remove("correcta", "incorrecta");
  }
}

function mostrarRespuestaCorrecta() {
  if (!preguntaActual) return;
  document.getElementById("r" + preguntaActual.correcta).classList.add("correcta");
}

function ocultarPreguntas() {
  document.getElementById("preguntaBox").classList.add("oculto");
}

function finalizarPartida() {
  partidaIniciada = false;
  clearInterval(temporizadorTotal);
  clearInterval(temporizadorPregunta);

  document.getElementById("panelJuego").classList.add("oculto");
  document.getElementById("panelFinal").classList.remove("oculto");

  const clasificacion = [...equipos].sort((a, b) => b.puntos - a.puntos);

  let html = "";
  if (clasificacion[0]) html += `<div>🥇 ${clasificacion[0].nombre} — ${clasificacion[0].puntos} pts</div>`;
  if (clasificacion[1]) html += `<div>🥈 ${clasificacion[1].nombre} — ${clasificacion[1].puntos} pts</div>`;
  if (clasificacion[2]) html += `<div>🥉 ${clasificacion[2].nombre} — ${clasificacion[2].puntos} pts</div>`;

  html += `<hr>`;
  html += `<div><strong>Clasificación completa:</strong></div>`;
  clasificacion.forEach((equipo, index) => {
    html += `<div>${index + 1}. ${equipo.nombre} — ${equipo.puntos} puntos</div>`;
  });

  document.getElementById("podioFinal").innerHTML = html;

  if (typeof sonidoVictoria === "function") {
    sonidoVictoria();
  }
}

function reiniciarJuego() {
  clearInterval(temporizadorTotal);
  clearInterval(temporizadorPregunta);

  document.getElementById("panelFinal").classList.add("oculto");
  document.getElementById("panelJuego").classList.add("oculto");
  document.getElementById("panelInicio").classList.remove("oculto");
}
