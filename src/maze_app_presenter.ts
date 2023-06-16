import { EditableMazePresenter, EditableMazePresenterFactory } from "./editable_maze/editable_maze_presenter";
import { Maze } from "./maze/maze";
import { MazeConverter } from "./maze/maze_converter";
import { MazeGenerator } from "./maze/maze_generator";
import { commandsToPath } from "./util/command";

export const MIN_ID = 1;
export const MAX_ID = 9999;

export const MIN_SIZE = 4;
export const MAX_SIZE = 40;

export const MIN_THICKNESS = 1;
export const MAX_THICKNESS = 30;


export const DEFAULT_ID = MIN_ID;
export const DEFAULT_SIZE = 9;
export const DEFAULT_THICKNESS = 3;

export const CELL_SIZE = 64;


export class MazeAppPresenter {

    constructor(
        private readonly mazeGenerator: MazeGenerator,
        private readonly mazeConverter: MazeConverter,
        private readonly editableMazePresenterFactory: EditableMazePresenterFactory,
    ) {
    }

    getMaze(id: number, size: number): Maze {
        return this.mazeGenerator.generate({ seed: id, size });
    }

    download(maze: Maze, wallThickness: number, roundWalls: boolean) {
        const content = this.getSvgContent(maze, wallThickness, roundWalls);
        this.downloadSVG(content, 'maze.svg');
    }

    getEditablePresenter(maze: Maze): EditableMazePresenter {
        return this.editableMazePresenterFactory.create(maze);
    }

    private getSvgContent(
        maze: Maze,
        wallThickness: number,
        roundWalls: boolean,
    ): string {
        const offset = - MAX_THICKNESS / 2;
        const size = maze.size * CELL_SIZE + MAX_THICKNESS;
        const d = this.getMazeAsPath(maze, CELL_SIZE);

        return `<svg viewBox="${offset} ${offset} ${size} ${size}" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path stroke="white" stroke-width="${wallThickness}" fill="none" stroke-linecap="${roundWalls ? 'round' : 'square'}" stroke-linejoin="${roundWalls ? 'round' : 'miter'}" d="${d}" />
</svg>`;
    }

    private getMazeAsPath(maze: Maze, scale: number): string {
        const innerWalls = this.mazeConverter.toInnerWalls(maze);
        const innerWallsPath = commandsToPath(innerWalls, scale);
        const outerWalls = this.mazeConverter.toOuterWalls(maze);
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