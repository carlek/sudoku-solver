export function isValidSudoku(puzzle: number[][]): boolean {
    
    // helper function to filter zeros and use a Set
    const isValid = (num: number[]) => {
      const nums = num.filter(n => n !== 0);
      return nums.length === new Set(nums).size;
    };
  
    // check rows for duplicates
    for (let row = 0; row < puzzle.length; row++) {
      if (!isValid(puzzle[row])) {
        return false;
      }
    }

    // check columns for duplicates
    for (let col = 0; col < puzzle[0].length; col++) {
      if (!isValid(puzzle.map(row => row[col]))) {
        return false;
      }
    }

    // check each 3x3 square for duplicates
    for (let row = 0; row < puzzle.length; row += 3) {
      for (let col = 0; col < puzzle[row].length; col += 3) {
        if (!isValid(puzzle.slice(row, row + 3).flatMap(row => row.slice(col, col + 3)))) {
          return false;
        }
      }
    }

    // ths puzzle passes all rules and is valid
    return true;
  }

