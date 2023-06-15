import { EditableMazePresenter, EditableMazePresenterFactory } from "./editable_maze/editable_maze_presenter";
import { Maze } from "./maze/maze";
import { MazeConverter } from "./maze/maze_converter";
import { MazeGenerator } from "./maze/maze_generator";
import { commandsToPath } from "./util/command";
import { randomInt } from "./util/random";

export const MIN_ID = 1;
export const MAX_ID = 9999;

export const MIN_SIZE = 4;
export const MAX_SIZE = 40;

export const MIN_THICKNESS = 1;
export const MAX_THICKNESS = 30;


export const DEFAULT_ID = MIN_ID;
export const DEFAULT_SIZE = 9;
export const DEFAULT_THICKNESS = 3;


const CELL_SIZE = 64;


export class MazeAppPresenter {

    private maze: Maze;

    constructor(
        private readonly mazeGenerator: MazeGenerator,
        private readonly mazeConverter: MazeConverter,
        private readonly editableMazePresenterFactory: EditableMazePresenterFactory,
    ) {
        this.maze = this.getMaze({ id: DEFAULT_ID, size: DEFAULT_SIZE });
    }

    getMaze(
        { id, size }: { id?: number, size?: number } = {},
    ): Maze {
        return this.mazeGenerator.generate({
            seed: id || this.maze.id,
            size: size || this.maze.size,
        });
    }

    getRandomMaze(): Maze {
        const id = randomInt(MIN_ID, MAX_ID);
        this.maze = this.getMaze({ id });
        return this.maze;
    }

    canGetPreviousMaze(): boolean {
        return this.maze.id > MIN_ID;
    }

    canGetNextMaze(): boolean {
        return this.maze.id < MAX_ID;
    }

    getPreviousMaze(): Maze {
        const id = this.maze.id - 1;
        this.maze = this.getMaze({ id });
        return this.maze;
    }

    getNextMaze(): Maze {
        const id = this.maze.id + 1;
        this.maze = this.getMaze({ id });
        return this.maze;
    }

    canSizeDown(): boolean {
        return this.maze.size > MIN_SIZE;
    }

    canSizeUp(): boolean {
        return this.maze.size < MAX_SIZE;
    }

    sizeDown(): Maze {
        const { id, size: oldSize } = this.maze;
        const size = Math.max(oldSize - 1, MIN_SIZE);
        this.maze = this.getMaze({ id, size });
        return this.maze;
    }

    sizeUp(): Maze {
        const { id, size: oldSize } = this.maze;
        const size = Math.min(oldSize + 1, MAX_SIZE);
        this.maze = this.getMaze({ id, size });
        return this.maze;
    }

    download(wallThickness: number) {
        const content = this.getSvgContent(wallThickness);
        this.downloadSVG(content, 'maze.svg');
    }

    getEditablePresenter(maze: Maze): EditableMazePresenter {
        return this.editableMazePresenterFactory.create(maze);
    }

    private getSvgContent(wallThickness: number): string {
        const offset = - MAX_THICKNESS / 2;
        const size = this.maze.size * CELL_SIZE + MAX_THICKNESS;
        const d = this.getMazeAsPath(CELL_SIZE);

        return `<svg viewBox="${offset} ${offset} ${size} ${size}" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path stroke="white" stroke-width="${wallThickness}" fill="none" stroke-linecap="square" stroke-linejoin="miter" d="${d}" />
</svg>`;
    }

    private getMazeAsPath(scale: number): string {
        const innerWalls = this.mazeConverter.toInnerWalls(this.maze);
        const innerWallsPath = commandsToPath(innerWalls, scale);
        const outerWalls = this.mazeConverter.toOuterWalls(this.maze);
        const outerWallsPath = commandsToPath(outerWalls, scale);
        return `${innerWallsPath} ${outerWallsPath}`;
    }

    private downloadSVG(content: string, fileName: string) {
        const a: HTMLAnchorElement = document.createElement('a');
        const file = new Blob([content], { type: 'image/svg+xml' });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
}