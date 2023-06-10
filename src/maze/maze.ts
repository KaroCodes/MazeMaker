import * as _ from 'lodash';

export type Cell = {
    x: number,
    y: number,
    walls: boolean[], // [ left, top, right, bottom ]
};

export class Maze {

    constructor(
        readonly id: number,
        readonly size: number,
        readonly cells: Cell[][], // size x size
    ) {
    }

    clone(): Maze {
        return _.cloneDeep(this);
    }

    getBorderCells(): Cell[][] {
        const cells = this.cells;
        return [
            cells.flatMap(row => row.filter(cell => cell.x === 0)), // left
            cells[0], // top
            cells.flatMap(row => row.filter(cell => cell.x === this.size - 1)), // right
            cells[this.size - 1], // bottom
        ]
    }

    removeOuterWalls(): Maze {
        this.cells.forEach(row => {
            row.forEach(cell => {
                if (cell.x === 0) {
                    cell.walls[0] = false;
                } else if (cell.x === this.size - 1) {
                    cell.walls[2] = false;
                }
                if (cell.y === 0) {
                    cell.walls[1] = false;
                } else if (cell.y === this.size - 1) {
                    cell.walls[3] = false;
                }
            })
        });
        return this;
    }
}