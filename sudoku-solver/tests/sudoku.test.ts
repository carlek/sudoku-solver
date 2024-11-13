    import { sudokuSolver } from '../src/sudokuSolver';
    import { isValidSudoku } from '../src/isValidSudoku';

    const difficultPuzzle = [
    [0, 0, 0, 0, 7, 4, 3, 1, 6],
    [0, 0, 0, 6, 0, 3, 8, 4, 0],
    [0, 0, 0, 0, 0, 8, 5, 0, 0],
    [7, 2, 5, 8, 0, 0, 0, 3, 4],
    [0, 0, 0, 0, 3, 0, 0, 5, 0],
    [0, 0, 0, 0, 0, 2, 7, 9, 8],
    [0, 0, 8, 9, 4, 0, 0, 0, 0],
    [0, 4, 0, 0, 8, 5, 9, 0, 0],
    [9, 7, 1, 3, 2, 6, 4, 8, 5]
    ];

    const unsolvablePuzzle = [
    [5, 1, 6, 8, 4, 9, 7, 3, 2],
    [3, 0, 7, 6, 0, 5, 0, 0, 0],
    [8, 0, 9, 7, 0, 0, 0, 6, 5],
    [1, 3, 5, 0, 6, 0, 9, 0, 7],
    [4, 7, 2, 5, 9, 1, 0, 0, 6],
    [9, 6, 8, 3, 7, 0, 0, 5, 0],
    [2, 5, 3, 1, 8, 6, 0, 7, 4],
    [6, 8, 4, 2, 0, 7, 5, 0, 0],
    [7, 9, 1, 0, 5, 0, 6, 0, 8]
    ];

    const badPuzzle = [
    [7, 8, 1, 5, 4, 3, 9, 2, 6],
    [2, 0, 3, 6, 1, 7, 9, 5, 0],
    [9, 5, 4, 6, 2, 8, 7, 3, 1],
    [6, 9, 5, 8, 3, 7, 2, 1, 4],
    [1, 4, 8, 2, 6, 5, 3, 7, 9],
    [3, 2, 7, 9, 1, 4, 6, 8, 0],
    [4, 1, 3, 7, 5, 2, 6, 9, 8],
    [8, 0, 6, 3, 9, 1, 0, 4, 3],
    [5, 7, 9, 4, 8, 6, 1, 3, 0]
    ];

    describe('Sudoku Solver', () => {
    test('should return a valid solution for a difficult puzzle', () => {
        const solution = sudokuSolver(difficultPuzzle);
        expect(solution).not.toBeNull();
    
        if (solution !== null) {
        expect(isValidSudoku(solution)).toBe(true);
        }
    });
    
    test('should return null for an unsolvable puzzle', () => {
        const solution = sudokuSolver(unsolvablePuzzle);
        expect(solution).toBeNull();
    });
    
    test('should return null for a bad puzzle with duplicates', () => {
        const solution = sudokuSolver(badPuzzle);
        expect(solution).toBeNull();
    });
    });
  