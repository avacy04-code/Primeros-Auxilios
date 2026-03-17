# Misión Primeros Auxilios ESO

Juego educativo por equipos sobre primeros auxilios para alumnado de ESO.

## Funcionamiento

- Se introducen 4 equipos.
- La partida tiene 10 rondas.
- En cada ronda, el equipo en turno debe:
  1. superar un reto de primeros auxilios
  2. responder 3 preguntas
- El reto superado suma 20 puntos.
- Cada pregunta correcta suma 10 puntos.
- Hay tiempo total de partida y tiempo por pregunta.
- Al final se muestra el ranking y el podio.

## Archivos

- `index.html` → estructura principal
- `style.css` → estilos visuales
- `datos.js` → preguntas, retos y configuración
- `ruleta.js` → selección aleatoria de retos
- `sonidos.js` → sonidos simples generados por código
- `script.js` → lógica completa del juego

## Cómo usar

1. Abre `index.html` en el navegador.
2. Escribe los nombres de los equipos.
3. Pulsa en **Empezar partida**.
4. Sigue la dinámica de retos y preguntas hasta el final.

## Personalización rápida

En `datos.js` puedes cambiar:

- `TOTAL_RONDAS`
- `PREGUNTAS_POR_RONDA`
- `TIEMPO_TOTAL_SEGUNDOS`
- `TIEMPO_POR_PREGUNTA`
- preguntas y retos
