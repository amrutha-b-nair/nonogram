document.addEventListener('DOMContentLoaded', function() {

  const gameGrid = document.getElementById('gameGrid');
  let gridContainer = document.querySelector('.game-grid');

  let nrows = 6;
  let ncols = 6;
  let celltot = nrows * ncols;

  
  function generateGame(rows, cols) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push(new Array(cols).fill(0));
    }

    console.log(grid);
    let rowHeadings = [];
    for (let i = 0; i < rows; i++) {
        let hint = [];
        let count = 0;
        for (let j = 0; j < cols; j++) {
            if (Math.random() < 0.5) {
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

    let columnHeadings = [];
    for (let j = 0; j < cols; j++) {
        let hint = [];
        let count = 0;
        for (let i = 0; i < rows; i++) {
            if (grid[i][j] === 1) {
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
        columnHeadings.push(hint);
    }
    return {grid, rowHeadings, columnHeadings};
  }
  
  function generateGrid(rows, cols) {
    let grid = [];
    for (let i = 0; i < rows; i++) {
        grid.push(new Array(cols).fill(0));
    }
    for (let i = 0; i < Math.max(rows, cols); i++) {
      if (i < rows) {
          grid[i][Math.floor(Math.random() * cols)] = 1;
      }
      if (i < cols) {
          grid[Math.floor(Math.random() * rows)][i] = 1; 
      }
    }
  }
  generateGrid(nrows, ncols);

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

  const {grid, rowHeadings, columnHeadings} = generateGame(nrows, ncols);
  
  console.log(grid);
  console.log(rowHeadings);
  console.log(columnHeadings)

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

  colorCells.forEach(cell => {
    cell.addEventListener('click', function() {
      const currColor = cell.style.backgroundColor;
      if (currColor === 'white' || currColor === '') {
        cell.style.backgroundColor = "var(--tango-pink)";
      } else {
        cell.style.backgroundColor = "white";
      }
    });
  });
  
});