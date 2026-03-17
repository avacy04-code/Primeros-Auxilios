const TOTAL_RONDAS = 10;
const PREGUNTAS_POR_RONDA = 3;
const TIEMPO_TOTAL_SEGUNDOS = 600; // 10 minutos
const TIEMPO_POR_PREGUNTA = 15;

const retos = [
  "Colocad correctamente a una persona inconsciente en posición lateral de seguridad.",
  "Representad cómo comprobar si una persona responde y respira con normalidad.",
  "Explicad y simulad los pasos básicos para avisar al 112 de forma correcta.",
  "Representad qué hacer ante una hemorragia externa aplicando presión directa.",
  "Simulad cómo actuar ante una quemadura leve sin usar remedios caseros incorrectos.",
  "Representad qué hacer si una persona se marea durante una actividad física.",
  "Explicad cómo mantener la calma y asegurar la zona antes de ayudar.",
  "Simulad la actuación básica ante un esguince usando reposo y protección.",
  "Representad qué hacer ante una posible lipotimia en clase o en el patio.",
  "Explicad qué información dar a los servicios de emergencia al llamar."
];

const preguntas = [
  {
    pregunta: "¿Qué número debemos llamar en una emergencia en España?",
    respuestas: ["061", "091", "112", "010"],
    correcta: 2
  },
  {
    pregunta: "Antes de ayudar, lo primero es...",
    respuestas: ["Grabar con el móvil", "Asegurar la zona", "Mover a la persona", "Dar agua"],
    correcta: 1
  },
  {
    pregunta: "Si una persona está inconsciente pero respira, debemos ponerla en...",
    respuestas: ["Posición de pie", "Posición lateral de seguridad", "Sentada", "Boca abajo"],
    correcta: 1
  },
  {
    pregunta: "Ante una hemorragia externa, lo más adecuado es...",
    respuestas: ["Presionar la herida", "Echar tierra", "Esperar sin hacer nada", "Dar un masaje"],
    correcta: 0
  },
  {
    pregunta: "Si una persona no responde y no respira con normalidad, hay que...",
    respuestas: ["Dejarla sola", "Llamar al 112 y comenzar RCP si se sabe", "Dar comida", "Sentarla"],
    correcta: 1
  },
  {
    pregunta: "En una quemadura leve, lo correcto es...",
    respuestas: ["Poner mantequilla", "Aplicar hielo directo", "Enfriar con agua", "Taparla con algodón sucio"],
    correcta: 2
  },
  {
    pregunta: "Si alguien sufre un atragantamiento grave y no puede hablar, hay que...",
    respuestas: ["Dar agua", "Observar solamente", "Pedir ayuda y actuar de inmediato", "Tumbarlo y dormirlo"],
    correcta: 2
  },
  {
    pregunta: "¿Qué debe hacerse con una herida pequeña?",
    respuestas: ["Lavarse las manos y limpiarla", "Tocarla mucho", "Taparla sin limpiar", "Echar colonia"],
    correcta: 0
  },
  {
    pregunta: "Si una persona se marea, una actuación adecuada es...",
    respuestas: ["Hacerla correr", "Sentarla o tumbarla y vigilarla", "Darle refresco a la fuerza", "Dejarla sola"],
    correcta: 1
  },
  {
    pregunta: "En primeros auxilios, mantener la calma es importante porque...",
    respuestas: ["Ayuda a actuar mejor", "No sirve para nada", "Hace más lenta la ayuda", "Evita llamar al 112"],
    correcta: 0
  },
  {
    pregunta: "¿Cuál de estas acciones NO es correcta ante una quemadura?",
    respuestas: ["Enfriar con agua", "Retirar anillos si se puede", "Aplicar pasta de dientes", "Proteger la zona"],
    correcta: 2
  },
  {
    pregunta: "Si sospechas de una fractura, lo mejor es...",
    respuestas: ["Mover mucho la zona", "Inmovilizar y pedir ayuda", "Obligar a caminar", "Dar golpes suaves"],
    correcta: 1
  },
  {
    pregunta: "Una norma básica en primeros auxilios es...",
    respuestas: ["Proteger, avisar y socorrer", "Correr, gritar y mover", "Mirar y marcharse", "Esperar siempre a otra persona"],
    correcta: 0
  },
  {
    pregunta: "Si una persona tiene una hemorragia nasal, conviene...",
    respuestas: ["Echar la cabeza hacia atrás", "Presionar la nariz suavemente hacia delante", "Tumbarla boca arriba", "Meter papel muy al fondo"],
    correcta: 1
  },
  {
    pregunta: "¿Qué información es útil al llamar al 112?",
    respuestas: ["Lugar, qué ha ocurrido y estado de la persona", "Solo tu nombre", "Solo la edad", "Nada, ya lo saben"],
    correcta: 0
  },
  {
    pregunta: "Ante un golpe fuerte en una articulación, puede ayudar...",
    respuestas: ["Aplicar frío protegido", "Aplicar fuego", "Masajear muy fuerte", "Seguir haciendo deporte"],
    correcta: 0
  },
  {
    pregunta: "Si una persona convulsiona, debemos...",
    respuestas: ["Sujetarla con fuerza", "Meter algo en su boca", "Retirar objetos peligrosos y vigilar", "Darle agua"],
    correcta: 2
  },
  {
    pregunta: "Ante una posible lesión de cuello o espalda, es mejor...",
    respuestas: ["Mover rápidamente a la persona", "Evitar moverla salvo peligro", "Sentarla", "Levantarla entre dos"],
    correcta: 1
  },
  {
    pregunta: "¿Qué material ayuda a proteger una herida?",
    respuestas: ["Gasa limpia", "Tierra", "Perfume", "Papel sucio"],
    correcta: 0
  },
  {
    pregunta: "La RCP debe iniciarse cuando la persona...",
    respuestas: ["Respira normal", "No responde y no respira normal", "Está dormida", "Tiene frío"],
    correcta: 1
  },
  {
    pregunta: "Si alguien tiene una lipotimia, conviene...",
    respuestas: ["Dejarlo al sol", "Tumbarlo y elevar ligeramente las piernas si procede", "Hacerle correr", "Agitarlo"],
    correcta: 1
  },
  {
    pregunta: "En caso de emergencia, un error frecuente es...",
    respuestas: ["Mantener la calma", "Asegurar la zona", "Actuar sin pensar ni proteger", "Llamar al 112"],
    correcta: 2
  },
  {
    pregunta: "Si una persona está consciente tras una caída, debemos...",
    respuestas: ["Hablar con ella y valorar la situación", "Levantarla a la fuerza", "Ignorarla", "Darle comida"],
    correcta: 0
  },
  {
    pregunta: "¿Qué significa 'socorrer' en primeros auxilios?",
    respuestas: ["Ayudar de forma adecuada", "Hacer bromas", "Mover siempre a la víctima", "Gritar mucho"],
    correcta: 0
  },
  {
    pregunta: "Ante un objeto clavado en una herida, normalmente se debe...",
    respuestas: ["Retirar rápidamente", "Dejarlo y pedir ayuda", "Empujarlo más", "Lavar con refresco"],
    correcta: 1
  },
  {
    pregunta: "Cuando ayudamos, debemos evitar...",
    respuestas: ["Usar material limpio", "Ponernos en peligro", "Avisar a emergencias", "Hablar con calma"],
    correcta: 1
  },
  {
    pregunta: "Una quemadura solar importante requiere...",
    respuestas: ["No hacer nada", "Valorar gravedad y cuidar la piel", "Rascar la zona", "Aplicar aceite caliente"],
    correcta: 1
  },
  {
    pregunta: "Si una persona tiene dificultad para respirar, hay que...",
    respuestas: ["Observar y pedir ayuda", "Taparle la boca", "Tumbarla boca abajo siempre", "Darle comida"],
    correcta: 0
  },
  {
    pregunta: "¿Cuál es una buena actuación ante una herida?",
    respuestas: ["Lavar con agua y cubrir si hace falta", "Echar arena", "Frotar con fuerza", "Ignorarla"],
    correcta: 0
  },
  {
    pregunta: "En primeros auxilios escolares, lo más importante es...",
    respuestas: ["Actuar con seguridad y sentido común", "Hacer todo muy deprisa", "Mover siempre al herido", "No avisar a nadie"],
    correcta: 0
  }
];
