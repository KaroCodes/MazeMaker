export type Cell = {
    x: number,
    y: number,
    walls: boolean[], // [ left, top, right, bottom ]
};

export type Maze = {
    size: number,
    cells: Cell[][], // size x size
}

export type Command = {
    type: 'M' | 'L',
    x: number,
    y: number,
};