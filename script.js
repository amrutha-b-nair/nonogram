function emptyGrid(rows, cols) {
  let grid = [];
  for (let i = 0; i < rows; i++) {
      grid.push(new Array(cols).fill(0));
  }
  return grid;
}

function getHeadings(grid, column) {
  let rows = grid.length;
  let cols = grid[0].length;
  let hints = [];
  for (let j = 0; j < cols; j++) {
      let hint = [];
      let count = 0;
      for (let i = 0; i < rows; i++) {
        let pos;
        if (column === 1) {
          pos = [i,j]
        } else {
          pos = [j,i]
        }
        if (grid[pos[0]][pos[1]] === 1) {
            count++;
        } else {
            if (count > 0) {
                hint.push(count);
                count = 0;
            }
        }
      }
      if (count > 0) {
          hint.push(count);
      }
      hints.push(hint);
  }
    return hints
}

function generateGame(rows, cols) {
  let grid = emptyGrid(rows,cols);

  for (let i = 0; i < Math.max(rows, cols); i++) {
    if (i < rows) {
        grid[i][Math.floor(Math.random() * cols)] = 1;
    }
    if (i < cols) {
        grid[Math.floor(Math.random() * rows)][i] = 1; 
    }
  }
  let rowHeadings = [];
  for (let i = 0; i < rows; i++) {
      let hint = [];
      let count = 0;
      for (let j = 0; j < cols; j++) {
          if (Math.random() < 0.5 || grid[i][j] === 1) {
              count++;
              grid[i][j] = 1; 
          } else {
              if (count > 0) {
                  hint.push(count);
                  count = 0;
              }
          }
      }
      if (count > 0) {
          hint.push(count);
      }
      rowHeadings.push(hint);
  }
  return {grid, rowHeadings};
}

if (typeof module === 'object') {
  module.exports = { generateGame };  
}

function compareHints(list1, list2) {
  if (list1.length !== list2.length) {
      return false;
  }
  
  return list1.every((sublist1, index) => {
      const sublist2 = list2[index];
      
      if (sublist1.length !== sublist2.length) {
          return false;
      }
      
      return sublist1.every((value, i) => value === sublist2[i]);
  });
}



function checkSolution(solutionGrid, columnHeadings, rowHeadings) {
  const colSolution = getHeadings(solutionGrid, 1);
  const rowSolution = getHeadings(solutionGrid, 0);
  console.log(colSolution, columnHeadings);
  if (compareHints(colSolution, columnHeadings) && compareHints(rowSolution, rowHeadings)) {
    return true;
  }
  return false;
}

function showModal() {
  modal.style.display = 'block';
  document.querySelector('.game-grid').style.filter = 'blur(5px)';
}

function hideModal() {
  modal.style.display = 'none';
  document.querySelector('.game-grid').style.filter = 'none';
}

document.addEventListener('DOMContentLoaded', function() {

  const gameGrid = document.getElementById('gameGrid');
  let gridContainer = document.querySelector('.game-grid');
  const submitBtn = document.getElementById('submitBtn');
  const modal = document.getElementById('modal');
  const playAgainBtn = document.getElementById('playAgainBtn');

  let nrows = 6;
  let ncols = 6;
  let celltot = nrows * ncols;

  

  function createRowHeading(rowNumbers, rowIndex) {
    const rowHeading = document.createElement('div');
    rowHeading.classList.add('row-heading');
    rowNumbers.forEach(number => {
      const numberElement = document.createElement('div');
      numberElement.textContent = number;
      rowHeading.appendChild(numberElement);
    });
    rowHeading.style.gridRow = rowIndex ;
    rowHeading.style.gridColumn = 1;
    gridContainer.appendChild(rowHeading);
  }

  function createColumnHeadings() {
    columnHeadings.forEach((columnNumbers, columnIndex) => {
      const columnHeading = document.createElement('div');
      columnHeading.classList.add('column-heading');
      columnNumbers.forEach(number => {
        const numberElement = document.createElement('div');
        numberElement.textContent = number;
        columnHeading.appendChild(numberElement);
      });
      columnHeading.style.gridRow = 1;
      columnHeading.style.gridColumn = columnIndex + 2;
      gridContainer.appendChild(columnHeading);
    });
  }

  gridContainer.style.display = 'grid';
  gridContainer.style.gridTemplateRows = `repeat(${nrows} + 1, 1fr)`;
  gridContainer.style.gridTemplateColumns = `repeat(${ncols} + 1, 1fr)`;

  const {grid, rowHeadings} = generateGame(nrows, ncols);
  const columnHeadings = getHeadings(grid, 1);

  console.log(grid);

  createColumnHeadings();
  let row = 2;
  let column = 1;
  for (let i = 1; i <= celltot + nrows; i++) {
    if (column === 1) {
      createRowHeading(rowHeadings[row-2], row);
    } else {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.gridRow = row;
    cell.style.gridColumn = column;
    gridContainer.appendChild(cell);
    }
    column += 1;
    if (column === nrows + 2) {
      row += 1;
      column = 1;
    }
  }

  const colorCells = document.querySelectorAll('.cell');

  const solutionGrid = emptyGrid(nrows, ncols);

  colorCells.forEach((cell, index) => {
    cell.addEventListener('click', function() {
      const currColor = cell.style.backgroundColor;
      const row = Math.floor(index / ncols);
      const column = index % ncols;
      if (currColor === 'white' || currColor === '') {
        cell.style.backgroundColor = "var(--tango-pink)";
        solutionGrid[row][column] = 1;

      } else {
        cell.style.backgroundColor = "white";
        solutionGrid[row][column] = 0;
      }
    });
  });

  submitBtn.addEventListener('click', function() {
    const gameWon = checkSolution(solutionGrid, columnHeadings, rowHeadings);
    if (gameWon) {
      showModal();
    }
  });
  playAgainBtn.addEventListener('click', function() {
    hideModal();
  });
});












