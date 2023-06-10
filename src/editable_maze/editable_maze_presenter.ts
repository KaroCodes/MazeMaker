import { Maze } from "../maze/maze";
import { MazeConverter } from "../maze/maze_converter";
import { Command, commandsToPath } from "../util/command";
import { EditableBorderPresenter } from "./border/editable_border_presenter";

export class EditableMazePresenterFactory {

    constructor(private readonly mazeConverter: MazeConverter) {
    }

    create(maze: Maze): EditableMazePresenter {
        return new EditableMazePresenter(maze, this.mazeConverter)
    }
}

export class EditableMazePresenter {

    private readonly innerWalls: Command[];

    constructor(
        readonly maze: Maze,
        private readonly mazeConverter: MazeConverter
    ) {
        this.innerWalls = mazeConverter.toInnerWalls(maze);
    }

    getInnerWallsPath(scale: number): string {
        return commandsToPath(this.innerWalls, scale);
    }

    getOuterWallsPath(scale: number): string {
        const outerWalls = this.mazeConverter.toOuterWalls(this.maze);
        return commandsToPath(outerWalls, scale);
    }

    getEditableBorderPresenters(): EditableBorderPresenter[] {
        const borderCells = this.maze.getBorderCells();
        return borderCells.flatMap((cells, side) => cells.map((cell, idx) =>
            new EditableBorderPresenter(
                `${side}_${idx}`, // key
                cell,
                side,
                this.maze.size,
            )));
    }
}