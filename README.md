# Misión Primeros Auxilios ESO · Versión 3.6 ULTRA mejorada

Juego educativo de primeros auxilios para ESO, pensado para jugar por equipos en una sola pantalla y por turnos.

## Funcionamiento

- El docente elige cuántos equipos quiere.
- Cada equipo juega **por turnos**, no simultáneamente.
- En cada turno, el equipo debe:
  1. realizar **1 reto**
  2. responder **5 preguntas**
- Cuando termina un equipo, pasa al siguiente.
- Cuando juegan todos los equipos, se completa una ronda.
- La partida tiene un máximo de **10 rondas**.
- Al final se muestra la clasificación general y un informe de resultados.

## Mecánica actual

- **Tiempo total de partida:** 40 minutos
- **Tiempo por reto:** 2 minutos
- **Tiempo por pregunta:** 20 segundos
- **Rondas máximas:** 10
- **Preguntas por turno:** 5

## Puntuación

- **Reto superado:** +20 puntos
- **Pregunta correcta:** +10 puntos
- **Reto no superado por tiempo:** no suma puntos y se registra como reto no superado

## Comodines

Cada equipo dispone de estos comodines y **solo puede usar cada uno una vez en toda la partida**:

- **x2 Doble puntuación**  
  Duplica la puntuación de la siguiente pregunta correcta.

- **⏸ Congelar tiempo**  
  Detiene el temporizador de la pregunta durante 5 segundos.

- **⏭ Pasar pregunta**  
  Salta una pregunta sin penalización.

- **🎯 50%**  
  Elimina dos respuestas incorrectas de la pregunta actual.

Los comodines, una vez usados, desaparecen y no vuelven a aparecer en rondas posteriores.

## Preguntas y retos

Las preguntas y retos están elaborados a partir de los apuntes subidos sobre primeros auxilios. :contentReference[oaicite:1]{index=1}

## Repetición de preguntas

Las preguntas no se repiten de forma global durante la partida hasta agotar la batería disponible.

## Informe final

Al final de la partida se muestra para cada equipo:

- número de preguntas acertadas
- número de preguntas falladas
- número de retos superados
- número de retos no superados
- nota final de **0 a 10**

La nota se calcula así:

- `nota = (aciertos / total de preguntas respondidas) × 10`

## Archivos

- `index.html`
- `style.css`
- `datos.js`
- `sonidos.js`
- `script.js`
- `README.md`

## Requisitos

Debe existir además la carpeta `img/` con las imágenes usadas en el juego.
