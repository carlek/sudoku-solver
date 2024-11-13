import { Graph, Node, Edge } from 'ts-graphviz';
import { cloneDeep } from 'lodash';
import { isValidSudoku } from './isValidSudoku';

interface PuzzleNode {
    row: number;
    col: number;
}

export function sudokuSolver(puzzle: number[][]): number[][] | null {
    const n = 3; // For standard Sudoku
    const N = n * n;
    const size = N * N;

    if (!isValidSudoku(puzzle)) {
        return null;
    }

    // create mapping: (row, col) to node number 
    function rcToNode(r: number, c: number): number {
        return r * N + c;
    }

    // create mapping: node number to (row, col) 
    function nodeToRc(node: number): PuzzleNode {
        const row = Math.floor(node / N);
        const col = node % N;
        return { row, col };
    }

    // initialize graph
    const G = new Graph();

    // create nodes map to easily reference nodes by their IDs
    const nodes: { [key: string]: Node } = {};
    // create adjacency list to track neighbors of each node
    const adjList: { [key: string]: string[] } = {};

    // add nodes
    for (let i = 0; i < size; i++) {
        const node = new Node(i.toString());
        G.addNode(node);
        nodes[i.toString()] = node; // store the node in the map
        adjList[i.toString()] = []; // initialize the adjacency list entry
    }

    // Add edges for rows, columns, and blocks
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            const node = nodes[rcToNode(r, c).toString()]; // Get the Node object from the map
            const nodeId = rcToNode(r, c).toString();

            // Row and column neighbors
            for (let k = 0; k < N; k++) {
                if (k !== c) {
                    const neighborId = rcToNode(r, k).toString();
                    G.addEdge(new Edge([node, nodes[neighborId]])); // Pass as EdgeTargetTuple
                    adjList[nodeId].push(neighborId);
                }
                if (k !== r) {
                    const neighborId = rcToNode(k, c).toString();
                    G.addEdge(new Edge([node, nodes[neighborId]])); // Pass as EdgeTargetTuple
                    adjList[nodeId].push(neighborId);
                }
            }
            // Block neighbors
            const br = Math.floor(r / n);
            const bc = Math.floor(c / n);
            for (let dr = 0; dr < n; dr++) {
                for (let dc = 0; dc < n; dc++) {
                    const nr = br * n + dr;
                    const nc = bc * n + dc;
                    const neighborId = rcToNode(nr, nc).toString();
                    if (neighborId !== nodeId) {
                        G.addEdge(new Edge([node, nodes[neighborId]])); // Pass as EdgeTargetTuple
                        adjList[nodeId].push(neighborId);
                    }
                }
            }
        }
    }

    // Pre-assign numbers based on the puzzle
    const assignedNumbers: { [key: string]: number } = {};
    const emptyNodes: number[] = [];

    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            const value = puzzle[r][c];
            const node = rcToNode(r, c);
            if (value !== 0) {
                assignedNumbers[node.toString()] = value; // Pre-assign given numbers
            } else {
                emptyNodes.push(node); // Track empty nodes that can be modified
            }
        }
    }

    // solver to complete the assignment
    function backtrack(assign: { [key: string]: number }, nodes: number[]): { [key: string]: number } | null {
        if (nodes.length === 0) {
            return assign;
        }

        // minimum remaining value heuristic: select a node with the fewest possible numbers
        const node = nodes.reduce((minNode, currentNode) => {
            const minPossibleNumbers = possibleNumbers(minNode, assign).length;
            const currentPossibleNumbers = possibleNumbers(currentNode, assign).length;
            return currentPossibleNumbers < minPossibleNumbers ? currentNode : minNode;
        }, nodes[0]);

        for (const number of possibleNumbers(node, assign)) {
            // check if number is valid and recurse
            const neighbors = getNeighbors(node.toString());
            const isValid = neighbors.every((neighbor: string) => assign[neighbor] !== number);
            if (isValid) {
                assign[node.toString()] = number;
                const result = backtrack(assign, nodes.filter(n => n !== node));
                if (result) {
                    return result;
                }
                delete assign[node.toString()];
            }
        }
        return null;
    }

    function getNeighbors(node: string): string[] {
        return adjList[node];
    }

    function possibleNumbers(node: number, assign: { [key: string]: number }): number[] {
        const usedNumbers = new Set<number>();
        const neighbors = getNeighbors(node.toString());
        for (const neighbor of neighbors) {
            const number = assign[neighbor];
            if (number !== undefined) {
                usedNumbers.add(number);
            }
        }
        const availableNumbers = [];
        for (let c = 1; c <= N; c++) {
            if (!usedNumbers.has(c)) {
                availableNumbers.push(c);
            }
        }
        return availableNumbers;
    }

    // solve using a backtrack algorithm, starting only with empty nodes
    const solution = backtrack(cloneDeep(assignedNumbers), emptyNodes);

    // no solution exists so return null
    if (solution === null) {
        return null;
    }

    // create an empty solved puzzle and populate solution items in matrix
    const solvedPuzzle = cloneDeep(puzzle);
    for (const [nodeStr, number] of Object.entries(solution)) {
        const node = parseInt(nodeStr, 10);
        const { row, col } = nodeToRc(node);
        if (solvedPuzzle[row][col] === 0) {
            solvedPuzzle[row][col] = number; // Only modify cells that were originally empty
        }
    }

    return solvedPuzzle;
}
