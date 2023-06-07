export type Point = {
    x: number,
    y: number,
}

export type Cell = {
    walls: boolean[], // [ left, top, right, bottom ]
} & Point;

export type Maze = {
    size: number,
    cells: Cell[][], // size x size
}

export type Command = {
    type: 'M' | 'L',
} & Point;