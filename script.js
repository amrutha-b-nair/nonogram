const colorcell = document.querySelectorAll('.cell');
const gameGrid = document.getElementById('gameGrid');

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameGrid.appendChild(cell);
    }
}


colorcell.addEventListener('click', function() {
    const currColor = colorcell.style.backgroundColor;
    if (currColor === 'white' || currColor === '') {
        colorcell.style.backgroundColor = "black";
    } else {
        colorcell.style.backgroundColor = "white";
    }
});