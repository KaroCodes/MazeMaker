import { MazeGenerator } from "./util/maze_generator";
import { Maze } from "./util/models";

const DEFAULT_SEED = 1;
const DEFAULT_SIZE = 9;

export class MazeAppPresenter {

    readonly defaultMaze: Maze;

    constructor(
        private readonly mazeGenerator: MazeGenerator,
    ) {
        this.defaultMaze = mazeGenerator.generate({
            seed: DEFAULT_SEED,
            size: DEFAULT_SIZE,
        });
    }

    getRandomMaze({ size }: { size?: number } = {}): Maze {
        return this.mazeGenerator.generate({
            seed: Math.random(),
            size: size || DEFAULT_SIZE,
        });
    }
}