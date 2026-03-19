function beep(frecuencia, duracion, tipo = "sine") {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const contexto = new AudioContextClass();
    const oscilador = contexto.createOscillator();
    const ganancia = contexto.createGain();

    oscilador.type = tipo;
    oscilador.frequency.value = frecuencia;
    oscilador.connect(ganancia);
    ganancia.connect(contexto.destination);

    ganancia.gain.setValueAtTime(0.08, contexto.currentTime);
    oscilador.start();

    setTimeout(() => {
      oscilador.stop();
      contexto.close();
    }, duracion);
  } catch (e) {}
}

function sonidoAcierto() {
  beep(700, 120);
  setTimeout(() => beep(950, 140), 100);
}

function sonidoError() {
  beep(220, 260, "square");
}

function sonidoReto() {
  beep(480, 140);
  setTimeout(() => beep(620, 150), 120);
}

function sonidoVictoria() {
  beep(700, 120);
  setTimeout(() => beep(900, 120), 100);
  setTimeout(() => beep(1100, 180), 220);
}

function sonidoTiempo() {
  beep(280, 90, "triangle");
}

function sonidoComodin() {
  beep(500, 100);
  setTimeout(() => beep(760, 110), 90);
}
