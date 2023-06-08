import { MazeConverter } from "../util/maze_converter";
import { Cell, Command, Maze } from "../util/models";

export class EditableMazePresenterFactory {

    constructor(private readonly mazeConverter: MazeConverter) {
    }

    create(maze: Maze): EditableMazePresenter {
        return new EditableMazePresenter(maze, this.mazeConverter)
    }
}

export class EditableMazePresenter {

    readonly innerWalls: Command[];

    constructor(
        readonly maze: Maze,
        mazeConverter: MazeConverter
    ) {
        this.innerWalls = mazeConverter.toInnerWalls(maze);
    }

    getBorderCells(): Cell[][] {
        const cells = this.maze.cells;
        return [
            cells.flatMap(row => row.filter(cell => cell.x === 0)), // left
            cells[0], // top
            cells.flatMap(row => row.filter(cell => cell.x === cells.length - 1)), // right
            cells[cells.length - 1], // bottom
        ]
    }

}