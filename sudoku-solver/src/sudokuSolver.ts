import { Graph, Node, Edge } from 'ts-graphviz';
import { cloneDeep } from 'lodash';

interface PuzzleNode {
    row: number;
    col: number;
}

export function sudokuSolver(puzzle: number[][]): number[][] {
    const n = 3; // For standard Sudoku
    const N = n * n;
    const size = N * N;

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

    // Pre-assign colors based on the puzzle
    const colors: { [key: string]: number } = {};
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
            const value = puzzle[r][c];
            if (value !== 0) {
                const node = rcToNode(r, c);
                colors[node.toString()] = value;
            }
        }
    }

    // solver to complete the coloring
    function backtrack(assign: { [key: string]: number }, nodes: number[]): { [key: string]: number } | null {
        if (nodes.length === 0) {
            return assign;
        }

        // minimum remaining value heuristic: select a node with the fewest possible colors 
        const node = nodes.reduce((minNode, currentNode) => {
            const minPossibleColors = possibleColors(minNode, assign).length;
            const currentPossibleColors = possibleColors(currentNode, assign).length;
            return currentPossibleColors < minPossibleColors ? currentNode : minNode;
        }, nodes[0]);

        for (const color of possibleColors(node, assign)) {
            // check if color is valid and recurse 
            const neighbors = getNeighbors(node.toString());
            const isValid = neighbors.every((neighbor: string) => assign[neighbor] !== color);
            if (isValid) {
                assign[node.toString()] = color;
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

    function possibleColors(node: number, assign: { [key: string]: number }): number[] {
        const usedColors = new Set<number>();
        const neighbors = getNeighbors(node.toString());
        for (const neighbor of neighbors) {
            const color = assign[neighbor];
            if (color !== undefined) {
                usedColors.add(color);
            }
        }
        const availableColors = [];
        for (let c = 1; c <= N; c++) {
            if (!usedColors.has(c)) {
                availableColors.push(c);
            }
        }
        return availableColors;
    }

    // solve using a backtrack algorithm 
    const solution = backtrack(cloneDeep(colors), Array.from(Array(size).keys()));

    if (solution === null) {
        throw new Error("No solution exists for the given Sudoku puzzle.");
    }

    // create an empty solved puzzle and populate solution items in matrix
    const solvedPuzzle = Array.from({ length: N }, () => Array(N).fill(0));
    for (const [nodeStr, color] of Object.entries(solution)) {
        const node = parseInt(nodeStr, 10);
        const { row, col } = nodeToRc(node);
        solvedPuzzle[row][col] = color;
    }

    return solvedPuzzle;
}

// Test the Sudoku solver
const puzzle1: number[][] = [
    [0, 7, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 6, 0, 0, 0],
    [8, 0, 0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 6, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 7],
    [0, 0, 0, 0, 2, 0, 4, 0, 0],
    [5, 0, 1, 0, 0, 0, 0, 0, 0]
];
const puzzle2: number[][] = [
    [0,4,3,0,8,0,2,5,0],
    [6,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,9,4],
    [9,0,0,0,0,4,0,7,0],
    [0,0,0,6,0,8,0,0,0],
    [0,1,0,2,0,0,0,0,3],
    [8,2,0,5,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,5],
    [0,3,4,0,9,0,7,1,0]
]

console.log("\nPuzzle1:");
puzzle1.forEach(row => console.log(row.join(' ')));

console.log("\nSolution:");
const solved1 = sudokuSolver(puzzle1);
solved1.forEach(row => console.log(row.join(' ')));


console.log("\nPuzzle2:");
puzzle2.forEach(row => console.log(row.join(' ')));

console.log("\nSolution:");
const solved2 = sudokuSolver(puzzle2);
solved2.forEach(row => console.log(row.join(' ')));

