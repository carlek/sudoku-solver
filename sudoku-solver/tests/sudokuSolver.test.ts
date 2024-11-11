/// <reference types="jest" />
import { sudokuSolver } from '../src/sudokuSolver'; // Adjust the path to your Sudoku solver

describe('Sudoku Solver', () => {
  it('should solve puzzle1 correctly', () => {
    const puzzle1: number[][] = [
      [0, 7, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 0, 0, 0],
      [8, 0, 0, 0, 0, 0, 0, 0, 3],
      [0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 0],
      [0, 3, 0, 0, 0, 0, 0, 4, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 7],
      [0, 0, 0, 0, 2, 0, 4, 0, 0],
      [5, 0, 1, 0, 0, 0, 0, 0, 0],
    ];

    const solved1 = sudokuSolver(puzzle1);

    expect(solved1).toBeDefined();
    solved1.forEach(row => {
      expect(new Set(row).size).toBe(row.length); // Each row should have unique numbers
    });
  });

  it('should solve puzzle2 correctly', () => {
    const puzzle2: number[][] = [
      [0, 4, 3, 0, 8, 0, 2, 5, 0],
      [6, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 9, 4],
      [9, 0, 0, 0, 0, 4, 0, 7, 0],
      [0, 0, 0, 6, 0, 8, 0, 0, 0],
      [0, 1, 0, 2, 0, 0, 0, 0, 3],
      [8, 2, 0, 5, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 5],
      [0, 3, 4, 0, 9, 0, 7, 1, 0],
    ];

    const solved2 = sudokuSolver(puzzle2);

    expect(solved2).toBeDefined();
    solved2.forEach(row => {
      expect(new Set(row).size).toBe(row.length); // Each row should have unique numbers
    });
  });
});

