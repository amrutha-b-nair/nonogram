function emptyGrid(rows, cols) {
  let grid = [];
  for (let i = 0; i < rows; i++) {
      grid.push(new Array(cols).fill(0));
  }
  return grid;
}

// let solutionGrid = emptyGrid();

function getHeadings(grid, column) {
  let rows, cols;
  if (column === 1) { 
    rows = grid.length;
    cols = grid[0].length;
  } else {
    cols = grid.length;
    rows = grid[0].length;
  }
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

function generateGrid(rows, cols) {
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
  module.exports = { generateGrid };  
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
  if (compareHints(colSolution, columnHeadings) && compareHints(rowSolution, rowHeadings)) {
    return true;
  }
  return false;
}

function showModal(modal) {
  modal.style.display = 'block';
  document.querySelector('.game-grid').style.filter = 'blur(5px)';
}

function hideModal(modal) {
  modal.style.display = 'none';
  document.querySelector('.game-grid').style.filter = 'none';
}

function getDimension() {
  const rowsInput = document.getElementById('rows');
  const colsInput = document.getElementById('cols');
  let nrows = parseInt(rowsInput.value);
  let ncols = parseInt(colsInput.value);
  return {nrows, ncols};
}


function createRowHeading(rowNumbers, rowIndex) {
  const rowHeading = document.createElement('div');
  rowHeading.classList.add('row-heading');
  rowNumbers.forEach(number => {
    rowHeading.innerHTML += (" " + String(number));
  });
  rowHeading.style.gridRow = rowIndex ;
  rowHeading.style.gridColumn = 1;
  return rowHeading;
}

function createColumnHeadings(gameGrid, columnHeadings) {
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
    gameGrid.appendChild(columnHeading);
  });
  return gameGrid
}

function generateGame(gameGrid, nrows, ncols) {
  let celltot = nrows * ncols;
  let width = (ncols+1)*45;
  let height = (nrows+1)*45;
  gameGrid.style.display = 'grid';
  gameGrid.style.gridTemplateRows = `repeat(${nrows} + 1, 1fr)`;
  gameGrid.style.gridTemplateColumns = `repeat(${ncols} + 1, 1fr)`;
  gameGrid.style.width = `${width}px`;
  gameGrid.style.height = `${height}px`;

  const {grid, rowHeadings} = generateGrid(nrows, ncols);
  const columnHeadings = getHeadings(grid, 1);

  console.log(grid);

  createColumnHeadings(gameGrid, columnHeadings);
  let row = 2;
  let column = 1;
  for (let i = 1; i <= celltot + nrows; i++) {
    if (column === 1) {
      gameGrid.appendChild(createRowHeading(rowHeadings[row-2], row));
    } else {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.gridRow = row;
    cell.style.gridColumn = column;
    gameGrid.appendChild(cell);
    }
    column += 1;
    if (column === ncols + 2) {
      row += 1;
      column = 1;
    }
  }
  return {columnHeadings, rowHeadings};
}


function startGame() {
  const gameGrid = document.querySelector('.game-grid');
  let {nrows, ncols} = getDimension();
  let solutionGrid = emptyGrid(nrows, ncols);
  gameGrid.innerHTML = '';  
  const {columnHeadings, rowHeadings} = generateGame(gameGrid, nrows, ncols);
  const colorCells = document.querySelectorAll('.cell');
  colorCells.forEach((cell, index) => {
    cell.addEventListener('click', function() {
      const currColor = cell.style.backgroundColor;
      const row = Math.floor(index / ncols);
      const column = index % ncols;
      if (currColor != 'var(--tango-pink)') {
        cell.style.backgroundColor = 'var(--tango-pink)';
        solutionGrid[row][column] = 1;

      } else {
        cell.style.backgroundColor = "white";
        solutionGrid[row][column] = 0;
      }
      const gameWon = checkSolution(solutionGrid, columnHeadings, rowHeadings);
      if (gameWon) {
        showModal(modal);
      }
    });
    
    cell.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      const currColor = cell.style.backgroundColor;
      const row = Math.floor(index / ncols);
      const column = index % ncols;
      solutionGrid[row][column] = 0;
      if (currColor != 'var(--yellow)') {
        cell.style.backgroundColor = 'var(--yellow)';
      } else {
        cell.style.backgroundColor = 'white';
      }
      const gameWon = checkSolution(solutionGrid, columnHeadings, rowHeadings);
      if (gameWon) {
        showModal(modal);
      }
    });
  });
  return {solutionGrid, rowHeadings, columnHeadings};
}


document.addEventListener('DOMContentLoaded', function() {

  const submitBtn = document.getElementById('submitBtn');
  const modal = document.getElementById('modal');
  const playAgainBtn = document.getElementById('playAgainBtn');
  const rePlayBtn = document.getElementById('rePlay');
  const newGameBtn = document.getElementById('newGame');
  const startGameBtn = document.getElementById('startGame');


  let {solutionGrid, rowHeadings, columnHeadings} = startGame();

  submitBtn.addEventListener('click', function() {
    const gameWon = checkSolution(solutionGrid, columnHeadings, rowHeadings);
    if (gameWon) {
      showModal(modal);
    }
  });
  playAgainBtn.addEventListener('click', function() {
    hideModal(modal); 
    window.location.reload();
  });

  rePlayBtn.addEventListener('click', function() {
    hideModal(modal); 
  });

  newGameBtn.addEventListener('click', startGame);

  startGameBtn.addEventListener('click', startGame);
});












