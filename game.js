// Game state
let gameState = {
    currentScreen: 'menu',
    gameCode: null,
    isHost: false,
    players: 0
};

// Canvas setup
let canvas;
let ctx;

// Initialize canvas when the window loads
window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();
    
    // Add event listener for window resize
    window.addEventListener('resize', resizeCanvas);
};

function resizeCanvas() {
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

// Screen management
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    // Show the requested screen
    document.getElementById(screenId).classList.remove('hidden');
    gameState.currentScreen = screenId;
}

function showMenuScreen() {
    showScreen('menu-screen');
}

function showJoinScreen() {
    showScreen('join-screen');
}

function showWaitingScreen() {
    showScreen('waiting-screen');
}

function showGameScreen() {
    showScreen('game-screen');
    resizeCanvas();
}

// Game functions
function createGame() {
    gameState.isHost = true;
    gameState.gameCode = generateGameCode();
    gameState.players = 1;
    
    // Display the game code
    document.getElementById('current-game-code').textContent = gameState.gameCode;
    showWaitingScreen();
}

function joinGame() {
    const gameCodeInput = document.getElementById('game-code').value.toUpperCase();
    if (gameCodeInput.length === 4) {
        gameState.gameCode = gameCodeInput;
        gameState.isHost = false;
        gameState.players = 2;
        // In a real implementation, you would verify the game code here
        showGameScreen(); // Take player directly to game screen
    } else {
        alert('Please enter a valid game code');
    }
}

function cancelGame() {
    gameState = {
        currentScreen: 'menu',
        gameCode: null,
        isHost: false,
        players: 0
    };
    showMenuScreen();
}

// Simulate second player joining (for testing)
function simulatePlayerJoined() {
    if (gameState.currentScreen === 'waiting-screen') {
        gameState.players = 2;
        showGameScreen();
    }
}

// For testing purposes, automatically join game after 3 seconds when in waiting screen
setInterval(() => {
    simulatePlayerJoined();
}, 3000);

// Utility functions
function generateGameCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}
