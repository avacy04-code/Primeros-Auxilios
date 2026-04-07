const TOTAL_RONDAS = 10;
const PREGUNTAS_POR_TURNO = 5;
const TIEMPO_TOTAL_SEGUNDOS = 2400; // 40 minutos
const TIEMPO_POR_PREGUNTA = 20;
const TIEMPO_POR_RETO = 120; // 2 minutos
const PUNTOS_RETO = 20;
const PUNTOS_PREGUNTA = 10;

const retos = [
  {
    texto: "Representad la conducta PAS explicando qué significa Proteger, Avisar y Socorrer.",
    imagen: "img/botiquin.jpg",
    categoria: "Conducta PAS"
  },
  {
    texto: "Simulad una llamada al 112 indicando lugar del accidente, qué ha ocurrido, número de heridos y estado aparente.",
    imagen: "img/112.jpg",
    categoria: "Emergencias"
  },
  {
    texto: "Representad cómo colocar a una persona inconsciente en posición lateral de seguridad.",
    imagen: "img/pls.jpg",
    categoria: "Emergencias"
  },
  {
    texto: "Explicad y representad la valoración primaria ABC: conciencia, vía aérea, ventilación y circulación/hemorragias.",
    imagen: "img/rcp.jpg",
    categoria: "Valoración primaria"
  },
  {
    texto: "Simulad cómo actuar ante una hemorragia externa elevando el miembro y presionando correctamente.",
    imagen: "img/hemorragia.jpg",
    categoria: "Hemorragias"
  },
  {
    texto: "Representad qué hacer ante un golpe fuerte o posible esguince aplicando frío protegido e inmovilización básica.",
    imagen: "img/esguince.jpg",
    categoria: "Traumatismos"
  },
  {
    texto: "Explicad qué hacer ante una posible fractura o luxación sin intentar recolocar el hueso.",
    imagen: "img/fractura.jpg",
    categoria: "Traumatismos"
  },
  {
    texto: "Simulad la limpieza básica de una herida pequeña con agua y jabón y posterior desinfección adecuada.",
    imagen: "img/herida.jpg",
    categoria: "Heridas"
  },
  {
    texto: "Representad cómo actuar ante una hemorragia nasal sin inclinar la cabeza hacia atrás.",
    imagen: "img/hemorragia.jpg",
    categoria: "Hemorragias"
  },
  {
    texto: "Simulad qué hacer ante una lipotimia o desmayo colocando a la persona tumbada y con las piernas en alto.",
    imagen: "img/botiquin.jpg",
    categoria: "Desmayos"
  },
  {
    texto: "Representad la actuación correcta ante una convulsión retirando objetos peligrosos y evitando sujetar a la persona.",
    imagen: "img/convulsion.jpg",
    categoria: "Emergencias"
  },
  {
    texto: "Simulad qué hacer ante un atragantamiento aplicando de forma teórica la maniobra de Heimlich.",
    imagen: "img/112.jpg",
    categoria: "Obstrucción respiratoria"
  },
  {
    texto: "Explicad qué debe contener un botiquín básico de primeros auxilios.",
    imagen: "img/botiquin.jpg",
    categoria: "Botiquín"
  },
  {
    texto: "Representad la actuación básica ante una insolación: retirar del sol, beber líquido y refrescar cabeza y cuello.",
    imagen: "img/quemadura.jpg",
    categoria: "Calor e insolación"
  },
  {
    texto: "Explicad cómo actuar ante una deshidratación después de actividad física intensa.",
    imagen: "img/botiquin.jpg",
    categoria: "Deshidratación"
  }
];

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
    respuestas: ["Parar", "Proteger", "Pensar", "Prevenir"],
    correcta: 1,
    imagen: "img/botiquin.jpg",
    categoria: "Conducta PAS"
  },
  {
    pregunta: "En la conducta PAS, la A significa...",
    respuestas: ["Ayudar", "Avisar", "Atender", "Actuar"],
    correcta: 1,
    imagen: "img/112.jpg",
    categoria: "Conducta PAS"
  },
  {
    pregunta: "En la conducta PAS, la S significa...",
    respuestas: ["Socorrer", "Salir", "Señalizar", "Sujetar"],
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
    pregunta: "En la valoración primaria, la A corresponde a...",
    respuestas: [
      "Alarma",
      "Asfixia",
      "Estado de conciencia",
      "Nada, la A no existe"
    ],
    correcta: 2,
    imagen: "img/rcp.jpg",
    categoria: "Valoración primaria"
  },
  {
    pregunta: "En la valoración primaria, la B corresponde a...",
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
    pregunta: "En la valoración primaria, la C corresponde a...",
    respuestas: [
      "Cabeza",
      "Circulación y hemorragias agudas",
      "Columna",
      "Calambres"
    ],
    correcta: 1,
    imagen: "img/hemorragia.jpg",
    categoria: "Valoración primaria"
  },
  {
    pregunta: "Un botiquín básico debe estar...",
    respuestas: [
      "Sucio para usarlo rápido",
      "Fuera del alcance de los niños y bien identificado",
      "Abierto siempre",
      "Solo en el coche"
    ],
    correcta: 1,
    imagen: "img/botiquin.jpg",
    categoria: "Botiquín"
  },
  {
    pregunta: "¿Qué NO debe hacerse en una quemadura?",
    respuestas: [
      "Aplicar pasta de dientes",
      "Pedir ayuda",
      "Valorar la gravedad",
      "Actuar con calma"
    ],
    correcta: 0,
    imagen: "img/quemadura.jpg",
    categoria: "Quemaduras"
  },
  {
    pregunta: "¿Qué NO debe hacerse con una hemorragia que empapa el apósito?",
    respuestas: [
      "Dejar el apósito",
      "Cambiar continuamente el apósito lleno de sangre",
      "Presionar la herida",
      "Pedir ayuda"
    ],
    correcta: 1,
    imagen: "img/hemorragia.jpg",
    categoria: "Hemorragias"
  },
  {
    pregunta: "Ante un posible atragantamiento, NO se debe...",
    respuestas: [
      "Aplicar la maniobra de Heimlich si procede",
      "Dar 3 o 4 golpes secos entre los omóplatos como única actuación",
      "Pedir ayuda",
      "Actuar rápido"
    ],
    correcta: 1,
    imagen: "img/112.jpg",
    categoria: "Obstrucción respiratoria"
  },
  {
    pregunta: "Ante un esguince o golpe, una medida correcta es...",
    respuestas: [
      "Aplicar hielo protegido",
      "Aplicar calor directo",
      "Seguir haciendo ejercicio",
      "Masajear fuerte"
    ],
    correcta: 0,
    imagen: "img/esguince.jpg",
    categoria: "Traumatismos"
  },
  {
    pregunta: "En un tirón o rotura de fibras, lo recomendable es...",
    respuestas: [
      "Mover mucho la zona",
      "Aplicar hielo y no mover la zona",
      "Dar calor inmediato",
      "Correr despacio"
    ],
    correcta: 1,
    imagen: "img/esguince.jpg",
    categoria: "Traumatismos"
  },
  {
    pregunta: "Una herida pequeña debe limpiarse con...",
    respuestas: [
      "Alcohol directamente",
      "Agua y jabón",
      "Vinagre",
      "Perfume"
    ],
    correcta: 1,
    imagen: "img/herida.jpg",
    categoria: "Heridas"
  },
  {
    pregunta: "Para desinfectar una herida pequeña, según los apuntes se recomienda...",
    respuestas: [
      "Yodo",
      "Aceite",
      "Pasta de dientes",
      "Arena"
    ],
    correcta: 0,
    imagen: "img/herida.jpg",
    categoria: "Heridas"
  },
  {
    pregunta: "En una hemorragia nasal no se debe...",
    respuestas: [
      "Aplicar frío",
      "Inclinar la cabeza hacia atrás",
      "Presionar la zona",
      "Pedir ayuda si no cede"
    ],
    correcta: 1,
    imagen: "img/hemorragia.jpg",
    categoria: "Hemorragias"
  },
  {
    pregunta: "Ante una ampolla, una norma importante es...",
    respuestas: [
      "Romperla siempre",
      "Nunca romperla si no es necesario",
      "Aplicar alcohol puro",
      "Quitar toda la piel"
    ],
    correcta: 1,
    imagen: "img/herida.jpg",
    categoria: "Lesiones menores"
  },
  {
    pregunta: "Ante una deshidratación, conviene...",
    respuestas: [
      "Seguir al sol",
      "Beber y retirarse del sol",
      "No beber nada",
      "Ponerse más ropa"
    ],
    correcta: 1,
    imagen: "img/botiquin.jpg",
    categoria: "Deshidratación"
  },
  {
    pregunta: "Los calambres se asocian especialmente a la falta de...",
    respuestas: [
      "Sueño",
      "Líquido y sales minerales",
      "Ropa adecuada",
      "Descanso nocturno"
    ],
    correcta: 1,
    imagen: "img/esguince.jpg",
    categoria: "Calambres"
  },
  {
    pregunta: "Ante una lipotimia o desmayo, se debe...",
    respuestas: [
      "Poner a la persona de pie",
      "Tumbarla y elevar las piernas",
      "Hacerla correr",
      "Dar golpes en la espalda"
    ],
    correcta: 1,
    imagen: "img/botiquin.jpg",
    categoria: "Desmayos"
  },
  {
    pregunta: "Ante una insolación, lo más adecuado es...",
    respuestas: [
      "Seguir haciendo ejercicio",
      "Retirarse del sol, beber y refrescar cabeza y cuello",
      "Taparse más",
      "No beber agua"
    ],
    correcta: 1,
    imagen: "img/quemadura.jpg",
    categoria: "Calor e insolación"
  },
  {
    pregunta: "Ante una convulsión, lo correcto es...",
    respuestas: [
      "Sujetar con fuerza a la persona",
      "Poner algo en la boca",
      "Retirar objetos peligrosos de alrededor",
      "Dar agua"
    ],
    correcta: 2,
    imagen: "img/convulsion.jpg",
    categoria: "Convulsiones"
  },
  {
    pregunta: "En una picadura de abeja o avispa, lo importante es...",
    respuestas: [
      "Extraer el aguijón cuanto antes",
      "Chupar la herida",
      "Frotar con tierra",
      "Pinchar más la zona"
    ],
    correcta: 0,
    imagen: "img/herida.jpg",
    categoria: "Picaduras"
  },
  {
    pregunta: "En una mordedura de serpiente, no se debe...",
    respuestas: [
      "Pedir ayuda",
      "Evitar que el herido se mueva mucho",
      "Chupar la herida",
      "Mantener la calma"
    ],
    correcta: 2,
    imagen: "img/herida.jpg",
    categoria: "Picaduras"
  },
  {
    pregunta: "La maniobra de Heimlich se utiliza en casos de...",
    respuestas: [
      "Hemorragia nasal",
      "Atragantamiento",
      "Esguince",
      "Ampolla"
    ],
    correcta: 1,
    imagen: "img/112.jpg",
    categoria: "Obstrucción respiratoria"
  },
  {
    pregunta: "Para prevenir lesiones en actividad física, es importante...",
    respuestas: [
      "No calentar nunca",
      "Usar cualquier calzado",
      "Calentar y estirar adecuadamente",
      "Entrenar con dolor"
    ],
    correcta: 2,
    imagen: "img/esguince.jpg",
    categoria: "Prevención"
  }
];
