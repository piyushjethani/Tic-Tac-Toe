class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0, draws: 0 };
        
        this.cells = document.querySelectorAll('.cell');
        this.statusElement = document.getElementById('game-status');
        this.resetButton = document.getElementById('reset-btn');
        this.restartButton = document.getElementById('restart-btn');
        this.xScoreElement = document.getElementById('x-score');
        this.oScoreElement = document.getElementById('o-score');
        this.drawScoreElement = document.getElementById('draw-score');
        
        this.winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', this.handleCellClick.bind(this));
        });
        
        this.resetButton.addEventListener('click', this.resetGame.bind(this));
        this.restartButton.addEventListener('click', this.restartAll.bind(this));
        this.updateStatus();
    }
    
    handleCellClick(event) {
        const cell = event.target;
        const index = parseInt(cell.dataset.index);
        
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.makeMove(index, cell);
    }
    
    makeMove(index, cell) {
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWinner()) {
            this.gameActive = false;
            this.scores[this.currentPlayer]++;
            this.updateScores();
            this.updateStatus(`Player ${this.currentPlayer} Wins! 🎉`);
            this.highlightWinningCells();
        } else if (this.checkDraw()) {
            this.gameActive = false;
            this.scores.draws++;
            this.updateScores();
            this.updateStatus("It's a Draw! 🤝");
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus();
        }
    }
    
    checkWinner() {
        return this.winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winningPattern = pattern;
                return true;
            }
            return false;
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    highlightWinningCells() {
        if (this.winningPattern) {
            this.winningPattern.forEach(index => {
                this.cells[index].classList.add('winning');
            });
        }
    }
    
    updateStatus(message = null) {
        if (message) {
            this.statusElement.textContent = message;
        } else {
            this.statusElement.textContent = `Player ${this.currentPlayer}'s Turn`;
        }
    }
    
    updateScores() {
        this.xScoreElement.textContent = this.scores.X;
        this.oScoreElement.textContent = this.scores.O;
        this.drawScoreElement.textContent = this.scores.draws;
    }
    
    restartAll() {
        this.scores = { X: 0, O: 0, draws: 0 };
        this.updateScores();
        this.resetGame();
        this.updateStatus("Scores Reset! Player X's Turn");
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.winningPattern = null;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
        
        this.updateStatus();
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});