(function () {
  const BOARD_SIZE = 16;
  const INITIAL_DIRECTION = "right";
  const TICK_MS = 180;
  const DIRECTIONS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };
  const OPPOSITES = {
    up: "down",
    down: "up",
    left: "right",
    right: "left"
  };
  const KEY_TO_DIRECTION = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    w: "up",
    W: "up",
    a: "left",
    A: "left",
    s: "down",
    S: "down",
    d: "right",
    D: "right"
  };

  function createInitialSnakeState(size = BOARD_SIZE, rng = Math.random) {
    const center = Math.floor(size / 2);
    const snake = [
      { x: center, y: center },
      { x: center - 1, y: center },
      { x: center - 2, y: center }
    ];

    return {
      size,
      snake,
      direction: INITIAL_DIRECTION,
      queuedDirection: INITIAL_DIRECTION,
      food: createFoodPosition(size, snake, rng),
      score: 0,
      status: "ready",
      gameOver: false
    };
  }

  function createFoodPosition(size, snake, rng = Math.random) {
    const occupied = new Set(snake.map((segment) => `${segment.x},${segment.y}`));
    const freeCells = [];

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const key = `${x},${y}`;
        if (!occupied.has(key)) {
          freeCells.push({ x, y });
        }
      }
    }

    if (!freeCells.length) {
      return null;
    }

    const index = Math.floor(rng() * freeCells.length);
    return freeCells[index];
  }

  function queueDirection(state, nextDirection) {
    if (!DIRECTIONS[nextDirection]) {
      return state;
    }

    const activeDirection = state.status === "ready" ? state.direction : state.queuedDirection;
    if (OPPOSITES[activeDirection] === nextDirection) {
      return state;
    }

    return {
      ...state,
      queuedDirection: nextDirection,
      status: state.status === "ready" ? "running" : state.status
    };
  }

  function tickSnake(state, rng = Math.random) {
    if (state.gameOver || state.status !== "running") {
      return state;
    }

    const direction = state.queuedDirection;
    const movement = DIRECTIONS[direction];
    const head = state.snake[0];
    const nextHead = {
      x: head.x + movement.x,
      y: head.y + movement.y
    };
    const ateFood = state.food && nextHead.x === state.food.x && nextHead.y === state.food.y;

    if (
      isOutOfBounds(nextHead, state.size) ||
      collidesWithSnake(nextHead, state.snake, ateFood ? 0 : 1)
    ) {
      return {
        ...state,
        direction,
        status: "game-over",
        gameOver: true
      };
    }

    const nextSnake = [nextHead].concat(
      ateFood ? state.snake : state.snake.slice(0, state.snake.length - 1)
    );
    const nextFood = ateFood ? createFoodPosition(state.size, nextSnake, rng) : state.food;

    return {
      ...state,
      snake: nextSnake,
      direction,
      queuedDirection: direction,
      food: nextFood,
      score: ateFood ? state.score + 1 : state.score
    };
  }

  function isOutOfBounds(position, size) {
    return position.x < 0 || position.y < 0 || position.x >= size || position.y >= size;
  }

  function collidesWithSnake(position, snake, ignoredTailSegments = 0) {
    const relevantSnake = ignoredTailSegments > 0
      ? snake.slice(0, snake.length - ignoredTailSegments)
      : snake;

    return relevantSnake.some((segment) => segment.x === position.x && segment.y === position.y);
  }

  function createGameController() {
    const boardElement = document.getElementById("snakeBoard");
    const scoreElement = document.getElementById("snakeScore");
    const statusElement = document.getElementById("snakeStatus");
    const messageElement = document.getElementById("snakeMessage");
    const restartButton = document.getElementById("snakeRestart");
    const pauseButton = document.getElementById("snakePause");
    const directionButtons = Array.from(document.querySelectorAll("[data-direction]"));

    if (!boardElement || !scoreElement || !statusElement || !messageElement || !restartButton || !pauseButton) {
      return null;
    }

    const cells = [];
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
      const cell = document.createElement("div");
      cell.className = "snake-cell";
      boardElement.appendChild(cell);
      cells.push(cell);
    }

    let state = createInitialSnakeState();
    let timerId = null;

    function syncTimer() {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }

      if (state.status === "running" && !state.gameOver) {
        timerId = setInterval(() => {
          state = tickSnake(state);
          render();
          if (state.gameOver && typeof sonidoError === "function") {
            sonidoError();
          }
          syncTimer();
        }, TICK_MS);
      }
    }

    function render() {
      for (let i = 0; i < cells.length; i++) {
        cells[i].className = "snake-cell";
      }

      if (state.food) {
        const foodIndex = state.food.y * state.size + state.food.x;
        if (cells[foodIndex]) {
          cells[foodIndex].classList.add("snake-food");
        }
      }

      state.snake.forEach((segment, index) => {
        const cellIndex = segment.y * state.size + segment.x;
        if (!cells[cellIndex]) return;
        cells[cellIndex].classList.add(index === 0 ? "snake-head" : "snake-body");
      });

      scoreElement.textContent = String(state.score);
      statusElement.textContent = getStatusLabel(state);
      messageElement.textContent = getMessage(state);
      pauseButton.textContent = state.status === "paused" ? "▶️ Reanudar" : "⏸ Pausar";
      pauseButton.disabled = state.gameOver;
    }

    function getStatusLabel(currentState) {
      if (currentState.gameOver) return "Fin";
      if (currentState.status === "paused") return "Pausa";
      if (currentState.status === "running") return "Jugando";
      return "Listo";
    }

    function getMessage(currentState) {
      if (currentState.gameOver) {
        return "Fin de la partida. Reinicia para jugar otra vez.";
      }
      if (currentState.status === "paused") {
        return "Partida en pausa.";
      }
      if (currentState.status === "running") {
        return "Sigue creciendo sin chocar.";
      }
      return "Pulsa una dirección para empezar la partida.";
    }

    function handleDirectionInput(direction) {
      const previousStatus = state.status;
      state = queueDirection(state, direction);
      if (previousStatus === "ready" && state.status === "running" && typeof sonidoReto === "function") {
        sonidoReto();
      }
      render();
      syncTimer();
    }

    function restartGame() {
      state = createInitialSnakeState();
      render();
      syncTimer();
    }

    function togglePause() {
      if (state.gameOver || state.status === "ready") {
        return;
      }

      state = {
        ...state,
        status: state.status === "paused" ? "running" : "paused"
      };
      render();
      syncTimer();
    }

    window.addEventListener("keydown", (event) => {
      const direction = KEY_TO_DIRECTION[event.key];
      if (!direction) return;

      event.preventDefault();
      handleDirectionInput(direction);
    });

    restartButton.addEventListener("click", restartGame);
    pauseButton.addEventListener("click", togglePause);
    directionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        handleDirectionInput(button.dataset.direction);
      });
    });

    render();

    return {
      restart: restartGame,
      getState: () => state
    };
  }

  const snakeLogic = {
    BOARD_SIZE,
    createInitialSnakeState,
    createFoodPosition,
    queueDirection,
    tickSnake,
    isOutOfBounds,
    collidesWithSnake
  };

  if (typeof window !== "undefined") {
    window.SnakeLogic = snakeLogic;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = snakeLogic;
  }

  if (typeof document !== "undefined") {
    createGameController();
  }
})();
