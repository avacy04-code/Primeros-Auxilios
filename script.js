let equipos = [];
let rondaActual = 1;
let tiempoTotalRestante = TIEMPO_TOTAL_SEGUNDOS;
let temporizadorTotal = null;
let temporizadorPregunta = null;
let tiempoPreguntaRestante = TIEMPO_POR_PREGUNTA;

let retoActual = "";
let preguntaActual = null;
let indiceRespuestaSeleccionada = null;
let preguntasUsadas = [];
let partidaIniciada = false;

function generarCamposEquipos() {
  const contenedor = document.getElementById("camposEquipos");
  const numero = parseInt(document.getElementById("numeroEquipos").value, 10) || 4;

  contenedor.innerHTML = "";

  for (let i = 1; i <= numero; i++) {
    const label = document.createElement("label");
    label.textContent = `Equipo ${i}`;

    const input = document.createElement("input");
    input.type = "text";
    input.id = `nombreEquipo${i}`;
    input.value = `Equipo ${i}`;

    contenedor.appendChild(label);
    contenedor.appendChild(input);
  }
}

function iniciarPartida() {
  const numero = parseInt(document.getElementById("numeroEquipos").value, 10) || 4;
  equipos = [];

  for (let i = 1; i <= numero; i++) {
    const nombre = document.getElementById(`nombreEquipo${i}`)?.value.trim() || `Equipo ${i}`;
    equipos.push({ nombre, puntos: 0 });
  }

  rondaActual = 1;
  tiempoTotalRestante = TIEMPO_TOTAL_SEGUNDOS;
  preguntasUsadas = [];
  retoActual = "";
  preguntaActual = null;
  indiceRespuestaSeleccionada = null;
  partidaIniciada = true;

  document.getElementById("panelInicio").classList.add("oculto");
  document.getElementById("panelJuego").classList.remove("oculto");
  document.getElementById("panelFinal").classList.add("oculto");
  document.getElementById("totalRondas").innerText = TOTAL_RONDAS;

  actualizarTiempoTotalUI();
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

  document.getElementById("rondaActual").innerText = rondaActual;
  document.getElementById("faseActual").innerText = "Reto";

  document.getElementById("retoBox").classList.remove("oculto");
  document.getElementById("preguntaBox").classList.add("oculto");

  mostrarMensaje(`Ronda ${rondaActual}. Todos los equipos realizan el reto.`);
  mostrarReto();
}

function mostrarReto() {
  retoActual = obtenerRetoAleatorio();
  document.getElementById("retoTexto").innerText = retoActual;
  renderChecksReto();

  if (typeof sonidoReto === "function") {
    sonidoReto();
  }
}

function renderChecksReto() {
  const contenedor = document.getElementById("listaEquiposReto");
  contenedor.innerHTML = "";

  equipos.forEach((equipo, index) => {
    const item = document.createElement("label");
    item.className = "item-check";

    item.innerHTML = `
      <input type="checkbox" id="retoEquipo${index}">
      <span>${equipo.nombre} (+${PUNTOS_RETO} pts)</span>
    `;

    contenedor.appendChild(item);
  });
}

function corregirReto() {
  equipos.forEach((equipo, index) => {
    const check = document.getElementById(`retoEquipo${index}`);
    if (check && check.checked) {
      equipo.puntos += PUNTOS_RETO;
    }
  });

  actualizarRanking();
  actualizarDetallePuntos();
  comenzarPregunta();
}

function comenzarPregunta() {
  document.getElementById("faseActual").innerText = "Pregunta";
  document.getElementById("retoBox").classList.add("oculto");
  document.getElementById("preguntaBox").classList.remove("oculto");
  document.getElementById("respuestaCorrectaBox").classList.add("oculto");

  mostrarMensaje(`Todos los equipos responden la misma pregunta.`);
  mostrarPregunta();
}

function obtenerPreguntaNoUsada() {
  if (preguntasUsadas.length >= preguntas.length) {
    preguntasUsadas = [];
  }

  const disponibles = preguntas.filter((_, i) => !preguntasUsadas.includes(i));
  const preguntaElegida = disponibles[Math.floor(Math.random() * disponibles.length)];

  const indiceReal = preguntas.findIndex(
    p =>
      p.pregunta === preguntaElegida.pregunta &&
      JSON.stringify(p.respuestas) === JSON.stringify(preguntaElegida.respuestas)
  );

  preguntasUsadas.push(indiceReal);
  return preguntaElegida;
}

function mostrarPregunta() {
  preguntaActual = obtenerPreguntaNoUsada();
  indiceRespuestaSeleccionada = null;

  document.getElementById("pregunta").innerText = preguntaActual.pregunta;

  for (let i = 0; i < 4; i++) {
    const boton = document.getElementById(`r${i}`);
    boton.innerText = preguntaActual.respuestas[i];
    boton.disabled = false;
    boton.classList.remove("correcta", "incorrecta");
  }

  document.getElementById("listaEquiposPregunta").innerHTML = "";
  iniciarTemporizadorPregunta();
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
      finalizarTiempoPregunta();
    }
  }, 1000);
}

function seleccionarRespuesta(indice) {
  indiceRespuestaSeleccionada = indice;

  for (let i = 0; i < 4; i++) {
    const boton = document.getElementById(`r${i}`);
    boton.classList.remove("correcta", "incorrecta");
  }

  document.getElementById(`r${indice}`).classList.add("correcta");
}

function finalizarTiempoPregunta() {
  bloquearRespuestas();

  const correcta = preguntaActual.correcta;
  document.getElementById(`r${correcta}`).classList.add("correcta");

  if (
    indiceRespuestaSeleccionada !== null &&
    indiceRespuestaSeleccionada !== correcta
  ) {
    document.getElementById(`r${indiceRespuestaSeleccionada}`).classList.add("incorrecta");
  }

  document.getElementById("respuestaCorrectaBox").classList.remove("oculto");
  document.getElementById("respuestaCorrectaBox").innerText =
    `Respuesta correcta: ${preguntaActual.respuestas[correcta]}`;

  renderChecksPregunta();

  mostrarMensaje("Marca ahora qué equipos han acertado.");
}

function bloquearRespuestas() {
  for (let i = 0; i < 4; i++) {
    document.getElementById(`r${i}`).disabled = true;
  }
}

function renderChecksPregunta() {
  const contenedor = document.getElementById("listaEquiposPregunta");
  contenedor.innerHTML = "";

  equipos.forEach((equipo, index) => {
    const item = document.createElement("label");
    item.className = "item-check";

    item.innerHTML = `
      <input type="checkbox" id="preguntaEquipo${index}">
      <span>${equipo.nombre} (+${PUNTOS_PREGUNTA} pts)</span>
    `;

    contenedor.appendChild(item);
  });
}

function corregirPregunta() {
  if (!preguntaActual) return;

  equipos.forEach((equipo, index) => {
    const check = document.getElementById(`preguntaEquipo${index}`);
    if (check && check.checked) {
      equipo.puntos += PUNTOS_PREGUNTA;
    }
  });

  actualizarRanking();
  actualizarDetallePuntos();

  if (typeof sonidoAcierto === "function") {
    sonidoAcierto();
  }

  rondaActual++;

  if (rondaActual > TOTAL_RONDAS) {
    finalizarPartida();
  } else {
    comenzarRonda();
  }
}

function iniciarTemporizadorTotal() {
  clearInterval(temporizadorTotal);

  temporizadorTotal = setInterval(() => {
    tiempoTotalRestante--;
    actualizarTiempoTotalUI();

    if (tiempoTotalRestante <= 0) {
      clearInterval(temporizadorTotal);
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

function actualizarRanking() {
  const clasificacion = [...equipos].sort((a, b) => b.puntos - a.puntos);
  let html = "";

  clasificacion.forEach((equipo, index) => {
    html += `<div>${index + 1}. ${equipo.nombre} — <strong>${equipo.puntos} pts</strong></div>`;
  });

  document.getElementById("ranking").innerHTML = html;
}

function actualizarDetallePuntos() {
  let html = "";
  equipos.forEach(equipo => {
    html += `<div>${equipo.nombre}: <strong>${equipo.puntos}</strong></div>`;
  });
  document.getElementById("detallePuntos").innerHTML = html;
}

function mostrarMensaje(texto) {
  document.getElementById("mensajeBox").innerText = texto;
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

generarCamposEquipos();
