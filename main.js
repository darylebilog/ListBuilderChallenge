let playerNames = [];
let category = '';
let itemsList = {};
let currentPlayerIndex = 0;
let gameOver = false;

function startGame() {
    const namesInput = document.getElementById('player-names').value;
    playerNames = namesInput.split(',').map(name => name.trim());
    
    category = document.getElementById('category').value.toLowerCase();
    document.getElementById('category-display').textContent = `Category: ${category}`;

    document.getElementById('game-setup').classList.add('hidden');
    document.getElementById('game-area').classList.remove('hidden');

    updateTurnInfo();
}

function updateTurnInfo() {
    const currentPlayer = playerNames[currentPlayerIndex % playerNames.length];
    document.getElementById('turn-info').textContent = `${currentPlayer}'s turn!`;
}

function submitItem() {
    const currentPlayer = playerNames[currentPlayerIndex % playerNames.length];
    const newItem = document.getElementById('item-input').value.toLowerCase();
    document.getElementById('item-input').value = ''; // Clear input after submission
    
    if (itemsList[newItem]) {
        const originalPlayer = itemsList[newItem];
        document.getElementById('game-status').textContent = `'${newItem}' was already added by ${originalPlayer}! ${currentPlayer} is out.`;
        playerNames.splice(currentPlayerIndex % playerNames.length, 1);
    } else {
        itemsList[newItem] = currentPlayer;
        document.getElementById('game-status').textContent = `${newItem} added by ${currentPlayer}.`;
    }

    if (playerNames.length === 1) {
        document.getElementById('game-status').textContent = `${playerNames[0]} wins the List Builder Challenge!`;
        gameOver = true;
        return;
    }

    currentPlayerIndex++;
    updateTurnInfo();
}
