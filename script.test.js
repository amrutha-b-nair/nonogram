const { generateGame } = require('./script.js');

test('generateGame should always have at least one filled grid in each row and column', () => {
    const NUM_TESTS = 100; 
    const MIN_SIZE = 2;
    const MAX_SIZE = 30; 

    for (let i = 0; i < NUM_TESTS; i++) {
        const rows = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE + 1)) + MIN_SIZE;
        const cols = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE + 1)) + MIN_SIZE;

        const { grid, rowHeadings, columnHeadings } = generateGame(rows, cols);

        for (let i = 0; i < rows; i++) {
            expect(grid[i]).toContain(1);
        }

        for (let j = 0; j < cols; j++) {
            let columnContainsOne = false;
            for (let i = 0; i < rows; i++) {
                if (grid[i][j] === 1) {
                    columnContainsOne = true;
                    break;
                }
            }
            expect(columnContainsOne).toBe(true);
        }
    }
});
