// =========================
// CONFIGURACIÓN GENERAL
// =========================
const TOTAL_RONDAS = 8;
const PREGUNTAS_POR_TURNO = 5;

const TIEMPO_TOTAL_SEGUNDOS = 2400; // 40 minutos
const TIEMPO_POR_PREGUNTA = 20;
const TIEMPO_POR_RETO = 120; // 2 minutos

const PUNTOS_RETO = 20;
const PUNTOS_PREGUNTA = 10;


// =========================
// RETOS
// =========================
const retos = [

  {
    texto: "Representar y explicar la conducta PAS.",
    imagen: "img/botiquin.jpg",
    categoria: "Conducta PAS"
  },

  {
    texto: "Dos personas van en un coche y tienen un accidente. Simulad una llamada al 112, explicando todos los datos que debemos dar.",
    imagen: "img/112.jpg",
    categoria: "Emergencias"
  },

  {
    texto: "Representar cómo colocar a una persona inconsciente en posición lateral de seguridad.",
    imagen: "img/pls.jpg",
    categoria: "Posición lateral de seguridad"
  },

  {
    texto: "Una persona se ha caído de una escalera y tiene los ojos cerrados. Explicar y representar la valoración primaria ABC.",
    imagen: "img/rcp.jpg",
    categoria: "Valoración primaria ABC"
  },

  {
    texto: "Un niño está jugando un partido de fútbol y tras una caída, se choca contra una valla y se hace un corte profundo en el brazo derecho. Simulad cómo actuar ante una hemorragia externa.",
    imagen: "img/hemorragia.jpg",
    categoria: "Hemorragias"
  },

  {
    texto: "Representar qué hacer ante un golpe fuerte o posible esguince en el pie izquierdo.",
    imagen: "img/esguince.jpg",
    categoria: "Esguinces"
  },

  {
    texto: "Explicar y simular qué hacer ante una posible fractura o luxación del hombro izquierdo.",
    imagen: "img/fractura.jpg",
    categoria: "Fracturas y luxaciones"
  },

  {
    texto: "Simular la limpieza básica de una herida pequeña en la palma de la mano derecha y posterior desinfección adecuada.",
    imagen: "img/herida.jpg",
    categoria: "Heridas"
  },

  {
    texto: "Representar cómo actuar ante una hemorragia nasal.",
    imagen: "img/hemorragia.jpg",
    categoria: "Hemorragia nasal"
  },

  {
    texto: "Estamos jugando en la calle al escondite y de repente una niña se siente mal, sufre un desvanecimiento. Simular qué hacer ante una lipotimia o desmayo.",
    imagen: "img/botiquin.jpg",
    categoria: "Lipotimia o desmayo"
  },

  {
    texto: "Representar la actuación correcta ante una convulsión.",
    imagen: "img/convulsion.jpg",
    categoria: "Convulsiones"
  },

  {
    texto: "Durante un partido de baloncesto mi compañero se traga el chicle. Simulad qué hacer ante un atragantamiento aplicando de forma simulada la maniobra a realizar.",
    imagen: "img/112.jpg",
    categoria: "Atragantamiento"
  },

  {
    texto: "Explicar qué debe contener un botiquín básico de primeros auxilios.",
    imagen: "img/botiquin.jpg",
    categoria: "Botiquín"
  },

  {
    texto: "Estamos jugando en la piscina y hace un calor sofocante. Representar y explicar la actuación básica ante una insolación.",
    imagen: "img/quemadura.jpg",
    categoria: "Insolación"
  },

  {
    texto: "Explicad cómo actuar ante una deshidratación después de actividad física intensa.",
    imagen: "img/botiquin.jpg",
    categoria: "Deshidratación"
  }

];


// =========================
// PREGUNTAS
// =========================
const preguntas = [

  {
    pregunta: "¿Cuál es el objetivo principal de los primeros auxilios?",
    respuestas: [
      "Sustituir al médico",
      "Impedir que el herido empeore y mantener sus constantes",
      "Curar completamente a la víctima",
      "Trasladar siempre al herido"
    ],
    correcta: 1,
    imagen: "img/botiquin.jpg",
    categoria: "Conceptos básicos"
  },

  {
    pregunta: "En la conducta PAS, la P significa...",
    respuestas: [
      "Parar",
      "Proteger",
      "Pensar",
      "Prevenir"
    ],
    correcta: 1,
    imagen: "img/botiquin.jpg",
    categoria: "Conducta PAS"
  },

  {
    pregunta: "En la conducta PAS, la A significa...",
    respuestas: [
      "Ayudar",
      "Avisar",
      "Atender",
      "Actuar"
    ],
    correcta: 1,
    imagen: "img/112.jpg",
    categoria: "Conducta PAS"
  },

  {
    pregunta: "En la conducta PAS, la S significa...",
    respuestas: [
      "Socorrer",
      "Salir",
      "Señalizar",
      "Sujetar"
    ],
    correcta: 0,
    imagen: "img/botiquin.jpg",
    categoria: "Conducta PAS"
  },

  {
    pregunta: "Al atender un accidente, una de las primeras actuaciones es...",
    respuestas: [
      "Mover rápido a todos los heridos",
      "Comprobar si el lugar es seguro",
      "Dar agua a las víctimas",
      "Quitar el casco a un motorista"
    ],
    correcta: 1,
    imagen: "img/botiquin.jpg",
    categoria: "Seguridad"
  },

  {
    pregunta: "Ante un golpe o caída fuerte, si sospechamos daño en la columna vertebral debemos...",
    respuestas: [
      "Mover a la persona cuanto antes",
      "Sentarla",
      "Evitar moverla",
      "Levantarla entre varios"
    ],
    correcta: 2,
    imagen: "img/fractura.jpg",
    categoria: "Traumatismos"
  },

  {
    pregunta: "En un accidente de moto, nunca se debe...",
    respuestas: [
      "Llamar al 112",
      "Señalizar la zona",
      "Quitar el casco",
      "Hablar con la víctima"
    ],
    correcta: 2,
    imagen: "img/fractura.jpg",
    categoria: "Traumatismos"
  },

  {
    pregunta: "Si sospechamos lesiones internas, es mejor...",
    respuestas: [
      "Dar agua y comida",
      "Dar café",
      "No dar agua ni comida",
      "Dar alcohol para animar"
    ],
    correcta: 2,
    imagen: "img/herida.jpg",
    categoria: "Emergencias"
  },

  {
    pregunta: "Ante una luxación o fractura, lo correcto es...",
    respuestas: [
      "Intentar recolocar el hueso",
      "Inmovilizar y llevar al médico",
      "Masajear la zona",
      "Hacer que camine"
    ],
    correcta: 1,
    imagen: "img/fractura.jpg",
    categoria: "Traumatismos"
  },

  {
    pregunta: "Los torniquetes deben aplicarse...",
    respuestas: [
      "Siempre que haya una herida",
      "Solo en casos extremos",
      "En cualquier corte pequeño",
      "Antes de limpiar una herida"
    ],
    correcta: 1,
    imagen: "img/hemorragia.jpg",
    categoria: "Hemorragias"
  },

  {
    pregunta: "Si una persona inconsciente puede vomitar, debemos colocarla en...",
    respuestas: [
      "Boca arriba",
      "Posición lateral de seguridad",
      "Sentada",
      "De pie"
    ],
    correcta: 1,
    imagen: "img/pls.jpg",
    categoria: "Emergencias"
  },

  {
    pregunta: "Uno de los síntomas que indica necesidad de ayuda médica inmediata es...",
    respuestas: [
      "Picor leve",
      "Hemorragia severa",
      "Rozadura pequeña",
      "Ampolla cerrada"
    ],
    correcta: 1,
    imagen: "img/hemorragia.jpg",
    categoria: "Emergencias"
  },

  {
    pregunta: "Un criterio de valoración primaria corresponde a...",
    respuestas: [
      "Tornique",
      "Llamada al 113",
      "Estado de conciencia",
      "Nada, la c no existe"
    ],
    correcta: 2,
    imagen: "img/rcp.jpg",
    categoria: "Valoración primaria"
  },

  {
    pregunta: "Un criterio de valoración primaria corresponde a...",
    respuestas: [
      "Ventilación y vía aérea",
      "Botiquín",
      "Brazo lesionado",
      "Bebida"
    ],
    correcta: 0,
    imagen: "img/rcp.jpg",
    categoria: "Valoración primaria"
  },

  {
    pregunta: "Un criterio de valoración primaria corresponde a...",
    respuestas: [
      "Cabeza",
      "Circulación y hemorragias agudas",
      "Columna",
      "Calambres"
    ],
    correcta: 1,
    imagen: "img/hemorragia.jpg",
    categoria: "Valoración primaria"
  }

];
