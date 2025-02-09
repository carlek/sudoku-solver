# sudoku-solver

A Typescript Sudoku Solver  ***Now with Python Too! (see notebook.ipynb)***

## Usage
```ts
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

const solvedDifficultPuzzle = sudokuSolver(difficultPuzzle);

if (!solvedDifficultPuzzle) {
     console.log("No solution to difficultPuzzle");
}
else {
     console.log("difficult puzzle solution:");
     solvedDifficultPuzzle.forEach(row => console.log(row.join(' ')));
}

const unsolvable = sudokuSolver(unsolvablePuzzle);

if (!unsolvable) {
     console.log("No solution to unsolvablePuzzle");
}
else {
     console.log("unsolvable puzzle solution:");
     unsolvable.forEach(row => console.log(row.join(' ')));
}
```
Output:
```
difficult puzzle solution:
5 8 9 2 7 4 3 1 6
2 1 7 6 5 3 8 4 9
4 6 3 1 9 8 5 2 7
7 2 5 8 1 9 6 3 4
8 9 6 4 3 7 1 5 2
1 3 4 5 6 2 7 9 8
6 5 8 9 4 1 2 7 3
3 4 2 7 8 5 9 6 1
9 7 1 3 2 6 4 8 5
No solution to unsolvablePuzzle
```
## Tests
```bash
npm test
```
Output
```
> sudoku-solver@1.0.0 test
> jest

 PASS  tests/sudoku.test.ts
  Sudoku Solver
    ✓ should return a valid solution for a difficult puzzle (9 ms)
    ✓ should return null for an unsolvable puzzle (1 ms)
    ✓ should return null for a bad puzzle with duplicates (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        0.679 s, estimated 2 s 
```
## References

https://networkx.org/nx-guides/content/generators/sudoku.html

https://en.wikipedia.org/wiki/Precoloring_extension

https://www.sudokudragon.com/unsolvable.htm

https://community.wolfram.com/groups/-/m/t/2983903
