import { Cell, Maze } from "./maze";


type BuildingCell = Cell & { visisted: boolean }

export class MazeGenerator {

    constructor(
        private readonly randomIntGenerator: (seed: number) =>
            (min: number, max: number) => number,
    ) {
    }

    /**
     * Generate a predictibly random maze, e.g. same seed and size will always
     * produce the same maze.
     * 
     * @param seed  number used for maze randomization
     * @param size  length of the side of the square grid
     * @returns     a [size x size] maze with starting point at top-left corner
     *              and end point in the middle
     */
    generate({ seed, size }: { seed: number, size: number }): Maze {
        const nextInt = this.randomIntGenerator(seed);

        const cells = this.getStartingGrid(size);

        // Add cells to this stack whenever we are at a junction.
        const stack = new Array<BuildingCell>();
        const cellsCount = size * size;
        let visitedCells = 0;
        let current = cells[0][0];

        while (visitedCells < cellsCount) {
            if (!current.visisted) {
                current.visisted = true;
                visitedCells++;
            }

            const neighbours = this.getUnvisistedNeighbours(current, cells);

            // If there are no unvisited neighbours it means we reached a dead
            // end. Time to revisit some of the previously saved junctions.
            if (!neighbours.length) {
                if (stack.length) {
                    current = stack.pop()!;
                    continue;
                } else {
                    throw new Error(`Invalid state: no neighbours found and no cells are scheduled to be revisisted but there are still ${cellsCount - visitedCells} unvisited cells remaining.`);
                }
            }

            const next = neighbours[nextInt(0, neighbours.length)];

            // If there are some neighbours we haven't visited yet we save this
            // junction to revisit later.
            if (neighbours.length > 1) {
                stack.push(current);
            }

            this.removeWallsBetween(current, next);
            current = next;
        }

        return new Maze(seed, size, cells);
    }

    // Generates a grid [size x size] with each cell surrounded by walls.
    private getStartingGrid(size: number): BuildingCell[][] {
        const cells = new Array(size);
        for (let y = 0; y < size; y++) {
            cells[y] = new Array<Cell>(size);
            for (let x = 0; x < size; x++) {
                cells[y][x] = {
                    x,
                    y,
                    visisted: false,
                    walls: [true, true, true, true],
                }
            }
        }
        return cells;
    }

    private getUnvisistedNeighbours(
        cell: Cell,
        cells: BuildingCell[][],
    ): BuildingCell[] {
        const { x, y } = cell;
        const neighbours = [
            cells[y]?.[x - 1],
            cells[y - 1]?.[x],
            cells[y]?.[x + 1],
            cells[y + 1]?.[x],
        ]
        return neighbours.filter(n => n && !n.visisted);
    }

    private removeWallsBetween(current: BuildingCell, next: BuildingCell) {
        if (current.x !== next.x) {
            const dx = current.x - next.x;
            current.walls[1 - dx] = false;
            next.walls[1 + dx] = false;
            return;
        }
        const dy = current.y - next.y;
        current.walls[2 - dy] = false;
        next.walls[2 + dy] = false;
    }
}
