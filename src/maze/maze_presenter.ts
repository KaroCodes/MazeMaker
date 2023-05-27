import { Cell, Maze } from "./maze";

export class MazePresenter {

    readonly canvasSize: number;
    readonly size: number;
    readonly cells: Cell[][];

    constructor(
        readonly maze: Maze,
    ) {
        this.cells = maze.cells;
        this.size = maze.size;
        this.canvasSize = 128 * maze.size;
    }
}
