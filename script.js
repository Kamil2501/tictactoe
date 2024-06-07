class TicTacToe {
    #turn = "x";
    #board = ["", "", "", "", "", "", "", "", ""];
    #cells = null;
    #statusInfo = null;

    constructor(cells, statusInfo) {
        this.#cells = cells;
        this.#statusInfo = statusInfo;
    }

    startGame() {
        this.#cells.forEach(cell => {
            cell.addEventListener("click", () => this.#addShape(cell));
        })
        this.#statusInfo.textContent = `${this.#turn.toUpperCase()} TURN`;
    }

    #addShape(cell) {
        if (cell.dataset.canplace === "false") return;

        const shape = this.#createShape(this.#turn);
        cell.append(shape);
        cell.dataset.canplace = "false";
        this.#board[this.#cells.indexOf(cell)] = this.#turn;
        this.#turn = this.#turn === "x" ? "circle" : "x";
        this.#statusInfo.textContent = `${this.#turn.toUpperCase()} TURN`;

        this.#checkWin();
    }

    #createShape(shapeName) {
        if (shapeName !== "x" && shapeName !== "circle") return;

        const shape = document.createElement("img");
        shape.src = `./${shapeName}.svg`;
        shape.alt = "";

        return shape;
    }

    #checkWin() {
        const winningStates = [
            [this.#board[0], this.#board[1], this.#board[2]],
            [this.#board[3], this.#board[4], this.#board[5]],
            [this.#board[6], this.#board[7], this.#board[8]],
            [this.#board[0], this.#board[3], this.#board[6]],
            [this.#board[1], this.#board[4], this.#board[7]],
            [this.#board[2], this.#board[5], this.#board[8]],
            [this.#board[0], this.#board[4], this.#board[8]],
            [this.#board[2], this.#board[4], this.#board[6]],
        ]

        for (let state of winningStates) {
            if (state.some(cell => cell === "")) continue;

            if (state[0] === state[1] && state[1] === state[2]) {
                this.#endGame(`${state[0].toUpperCase()} WON`);
                break;
            }
        }

        if (this.#board.every(cell => cell !== "")) this.#endGame("DRAFT");
    }


    #endGame(msg) {
        this.#statusInfo.textContent = msg;
        this.#cells.forEach(cell => {
            cell.dataset.canplace = "false";
        })
    }

    restartGame() {
        this.#cells.forEach(cell => {
            this.#board = this.#board.map(_ => "");
            cell.innerHTML = "";
            cell.dataset.canplace = "true";
        })
        this.#statusInfo.textContent = `${this.#turn.toUpperCase()} TURN`;
    }
}

const cells = [...document.querySelectorAll(".cell")]
const statusInfo = document.querySelector(".status")
const restartButton = document.querySelector(".restart")

const game = new TicTacToe(cells, statusInfo);
game.startGame();
restartButton.addEventListener('click', () => game.restartGame());