export type Cell = {
    x: number,
    y: number,
    visisted: boolean,
    walls: boolean[], // [ left, top, right, bottom ]
}

export class MazePresenter {

    readonly cells: Cell[];

    /**
     * 
     * @param canvasSize width and height of the canvas in pixels
     * @param size number of cells in each column and row
     */
    constructor(
        readonly canvasSize: number,
        readonly size: number,
    ) {
        this.cells = new Array(size);
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                this.cells[y * size + x] = {
                    x,
                    y,
                    visisted: false,
                    walls: [true, true, true, true],
                }
            }
        }

        const stack = new Array<Cell>();
        let unvisitedCells = size * size;
        let current = this.cells[0];

        while (unvisitedCells > 0) {
            console.log(current)
            if (!current.visisted) {
                current.visisted = true;
                unvisitedCells--;
            }
            const neighbours = this.getUnvisistedNeighbours(current);

            if (!neighbours.length) {
                if (stack.length) {
                    current = stack.pop()!;
                    continue;
                } else {
                    throw new Error(`Invalid state: no neighbours found and no cells are scheduled to be revisisted but there are still ${unvisitedCells} unvisited cells remaining.`);
                }
            }

            const nextIdx = randomInt(0, neighbours.length);
            const next = neighbours[nextIdx];

            if (neighbours.length > 1) {
                stack.push(current);
                console.log(`push: <${current.x}, ${current.y}>`)
            }

            if (next.y === current.y) {
                if (next.x < current.x) {
                    next.walls[2] = false;
                    current.walls[0] = false;
                } else {
                    next.walls[0] = false;
                    current.walls[2] = false;
                }
            } else {
                if (next.y < current.y) {
                    next.walls[3] = false;
                    current.walls[1] = false;
                } else {
                    next.walls[1] = false;
                    current.walls[3] = false;
                }
            }
            current = next;

        }
    }

    private getUnvisistedNeighbours(cell: Cell): Cell[] {
        const neighbours = new Array<Cell>();
        const { x, y } = cell;
        if (x > 0) {
            neighbours.push(this.cells[y * this.size + x - 1]);
        }
        if (y > 0) {
            neighbours.push(this.cells[(y - 1) * this.size + x]);

        }
        if (x < this.size - 1) {
            neighbours.push(this.cells[y * this.size + x + 1]);

        }
        if (y < this.size - 1) {
            neighbours.push(this.cells[(y + 1) * this.size + x]);

        }
        return neighbours.filter(n => !n.visisted);
    }
}

/**
 * 
 * @param min minimum integer (inclusive)
 * @param max maximum integer (exclusive)
 */
function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}
