document.addEventListener('DOMContentLoaded', function() {

  const gameGrid = document.getElementById('gameGrid');
  let gridContainer = document.querySelector('.game-grid');

  let nrows = 10;
  let celltot = nrows * nrows;

  gridContainer.style.display = 'grid';
  gridContainer.style.gridTemplateRows = `repeat(${nrows}, 1fr)`;
  gridContainer.style.gridTemplateColumns = `repeat(${nrows}, 1fr)`;


  let row = 1;
  let column = 1;
  for (let i = 1; i <= celltot; i++) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.gridRow = row;
    cell.style.gridColumn = column;
    column += 1;
    if (column === nrows + 1) {
      row += 1;
      column = 1;
    }
    gridContainer.appendChild(cell);
  }

  console.log(gridContainer)

  const colorCells = document.querySelectorAll('.cell');
  console.log(colorCells);

  colorCells.forEach(cell => {
    cell.addEventListener('click', function() {
      const currColor = cell.style.backgroundColor;
      if (currColor === 'white' || currColor === '') {
        cell.style.backgroundColor = "black";
      } else {
        cell.style.backgroundColor = "white";
      }
    });
  });

});