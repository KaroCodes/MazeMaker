export type Point = {
    x: number,
    y: number,
}

export type Cell = Point & {
    walls: boolean[], // [ left, top, right, bottom ]
}

export type Maze = {
    size: number,
    cells: Cell[][],
}
