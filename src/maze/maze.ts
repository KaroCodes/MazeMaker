export type Point = {
    x: number,
    y: number,
}

export type Cell = Point & {
    walls: boolean[], // [ left, top, right, bottom ]
}

export type Exit = Point & {
    side: 'l' | 't' | 'r' | 'b',
}

export type Maze = {
    size: number,
    cells: Cell[][],
    exits: Exit[],
}
