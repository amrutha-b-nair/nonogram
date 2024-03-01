document.addEventListener('DOMContentLoaded', function() {

  const gameGrid = document.getElementById('gameGrid');
  let gridContainer = document.querySelector('.game-grid');

  let nrows = 6;
  let ncols = 6;
  let celltot = nrows * ncols;
  let rowHeadings = [];
  let columnHeadings = [];

  // const rowHeadings = [
  //   [1, 2],
  //   [3],
  //   [4, 5],
  //   // Add more rows of numbers as needed
  // ];

  // const columnHeadings = [
  //   [1, 2, 3],
  //   [4],
  //   [5, 6],
  //   // Add more columns of numbers as needed
  // ];

  

  function createGame() {
    const solution = [];
    let forRowNums = {};
    for (let i = 0; i < ncols; i++) {
      columnHeadings.push([]);
      let cellsLeft = nrows;
      let currRow = 0;
      while (currRow < nrows) {
        let selectRandom = Boolean(Math.random() < 0.5);
        console.log(selectRandom);
        if (selectRandom && cellsLeft > 0) {
          let cellNum = Math.floor(Math.random()*Math.abs(cellsLeft - 2) + 1);
          console.log(i,currRow, cellNum, cellsLeft)
          cellsLeft -= (cellNum + 1);
          for (let j = currRow; j < currRow + cellNum; j++){
            // console.log(j);
            if (j < nrows){
              solution.push([j, i]);
              if (!forRowNums.hasOwnProperty(j) ) {
                forRowNums[j] = [];
              }
              forRowNums[j].push(i);
            }            
          }
          columnHeadings[i].push(cellNum);
          currRow += cellNum;
        }
        currRow++;
      }
    }
    console.log(forRowNums, solution);
    return {solution, forRowNums};
  }

  // console.log(columnHeadings)


  const {solution, forRowNums} = createGame();
  // console.log(solution, forRowNums);

  for (let i = 0; i < nrows; i++){
    rowHeadings[i] = [];
    if (forRowNums[i] != undefined) {
      let rowLenth = 1;
      let rowCols = forRowNums[i].sort((a, b) => a - b);
      for (let j = 1; j < rowCols.length; j++){
        if (rowCols[j] === rowCols[j - 1] + 1) {
          rowLenth++;    
        } else {
          rowHeadings[i].push(rowLenth);
          rowLenth = 1;
        }
      } 
      rowHeadings[i].push(rowLenth);
    } else {
      console.log("$$$$$$$$$$$$$$$$$$$");
      let randPos = Math.floor(Math.random()*Math.abs(nrows - 2) + 1);
      let randNum = Math.floor(Math.random()*Math.abs(nrows - randPos - 2) + 1);
      rowHeadings[i].push();
    }
  }
  console.log(forRowNums);
  // console.log("#####",rowHeadings)

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
  gridContainer.style.gridTemplateColumns = `repeat(${nrows} + 1, 1fr)`;

  
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