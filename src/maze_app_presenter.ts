import { EditableMazePresenter, EditableMazePresenterFactory } from "./editable_maze/editable_maze_presenter";
import { Maze } from "./maze/maze";
import { MazeGenerator } from "./maze/maze_generator";

const DEFAULT_ID = 1;
const DEFAULT_SIZE = 9;

export class MazeAppPresenter {

    private maze: Maze;

    constructor(
        private readonly mazeGenerator: MazeGenerator,
        private readonly editableMazePresenterFactory: EditableMazePresenterFactory,
    ) {
        this.maze = this.generateMaze({ id: DEFAULT_ID });
    }

    getMaze(): Maze {
        return this.maze;
    }

    getRandomMaze({ size }: { size?: number } = {}): Maze {
        this.maze = this.generateMaze({ id: Math.random(), size });
        return this.maze;
    }

    getPreviousMaze(): Maze {
        const id = this.maze.id - 1;
        this.maze = this.generateMaze({ id });
        return this.maze;
    }

    getNextMaze(): Maze {
        const id = this.maze.id + 1;
        this.maze = this.generateMaze({ id });
        return this.maze;
    }

    private generateMaze({ id, size }: { id: number, size?: number }): Maze {
        return this.mazeGenerator.generate({
            seed: id,
            size: size || DEFAULT_SIZE,
        });
    }

    getEditablePresenter(maze: Maze): EditableMazePresenter {
        return this.editableMazePresenterFactory.create(maze);
    }
}