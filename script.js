const startNewGameBtn = document.getElementById('new-card-button');
const bingoCard = document.getElementById('bingo-card');
const textAreaContent = document.getElementById('clicked-numbers-textarea');

document.addEventListener('DOMContentLoaded', generateNumberCells);
startNewGameBtn.addEventListener('click', changeNumbers);
bingoCard.addEventListener('click', markCell);
textAreaContent.value = '';
bingoCard.addEventListener('click', updateClickedNumbers);

// Function to generate unique random numbers for each Bingo column
function generateNumberCells() {
    const bingoCard = document.getElementById('bingo-card');
    const numberRanges = {
        B: [1, 15],
        I: [16, 30],
        N: [31, 45],
        G: [46, 60],
        O: [61, 75]
    }

    const columns = {};
    for (let col in numberRanges) {
        const [min, max] = numberRanges[col];
        const numbers = new Set();

        while (numbers.size < 5) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min; // Generating a random number in range
            numbers.add(num);
        }

        columns[col] = Array.from(numbers);
    }

    const colNames = ['B', 'I', 'N', 'G', 'O'];
    for (let row = 0; row < 5; row++) {
        for (let colIndex = 0; colIndex < colNames.length; colIndex++) {
            const col = colNames[colIndex];
            // Skip the center cell for 'N' column
            if (col === 'N' && row === 2) {
                const freeCell = document.createElement('div');
                freeCell.classList.add('bingo-cell', 'free-cell');
                freeCell.id = `cell-free`;
                freeCell.textContent = '🩷';

                bingoCard.appendChild(freeCell);
                continue;
            }

            const cell = document.createElement('div');
            cell.classList.add('bingo-cell');
            const number = columns[col][row];
            cell.id = `cell-${number}`;
            cell.textContent = number;

            bingoCard.appendChild(cell);
        }
    }
}

function changeNumbers() {
    const bingoCells = document.querySelectorAll('.bingo-cell:not(.header-cell)');
    
    // Clear existing numbers
    bingoCells.forEach(cell => {
        cell.remove();
    });

    // Clear clicked numbers textarea
    textAreaContent.value = '';

    generateNumberCells();
}

// Click event function for marking cells with a heart emoji on top
function markCell(e) {
    const cell = e.target;
    
    // only mark bingo number cells, not header cells
    if (cell.classList.contains('bingo-cell') && !cell.classList.contains('header-cell')) {
        if (cell.textContent === '🩷') {
            return;
        }

        cell.textContent = '🩷';
    }
}

// Function to log clicked numbers in the textarea
function updateClickedNumbers(e) {
    const cell = e.target;
    if (cell.classList.contains('bingo-cell') && !cell.classList.contains('header-cell')) {
        const number = cell.id.replace('cell-', ''); // Extract number from cell id
        if (cell.textContent === '🩷') {
            if (!textAreaContent.value.includes(number)) {
                if (textAreaContent.value === '') {
                    textAreaContent.value = number;
                } else {
                    textAreaContent.value += ', ' + number;
                }
            }
        }
    }
}