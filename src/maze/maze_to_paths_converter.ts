import * as _ from 'lodash';
import { Cell, Maze, Point } from "./maze";

type Node = Point & {
    children: Node[],
}

export function convertMazeToPaths(maze: Maze): string[] {

    // remove outer walls from the copy of the maze so they don't interfere with
    // tree creation (trees should only contain inner walls).
    const edgelessMaze = copyWithoutEdges(maze);

    // roots are any walls growing directly from maze's edges
    const roots = getRoots(edgelessMaze);

    const trees = roots
        .map(point => buildNode(edgelessMaze, point))
        .filter(node => node.children.length > 0);

    console.log(trees);



    // const paths = trees.map


    return [];
}

function copyWithoutEdges(maze: Maze): Maze {
    const edgelessMaze: Maze = _.cloneDeep(maze);

    edgelessMaze.cells.forEach(row => {
        row.forEach(cell => {
            if (cell.x === 0) {
                cell.walls[0] = false;
            } else if (cell.x === edgelessMaze.size - 1) {
                cell.walls[2] = false;
            }
            if (cell.y === 0) {
                cell.walls[1] = false;
            } else if (cell.y === edgelessMaze.size - 1) {
                cell.walls[3] = false;
            }
        })
    });

    return edgelessMaze;
}

function getRoots(maze: Maze): Point[] {
    const { cells, size } = maze;
    const startPoints: Point[] = [];

    const hasWall = (idx: number) =>
        (cell: Cell) => cell.walls[idx];
    const shift = (dx: number, dy: number) =>
        (cell: Cell) => ({ x: cell.x + dx, y: cell.y + dy });

    startPoints.push(...cells[0] // top row
        .filter(hasWall(2))
        .map(shift(1, 0))
    );
    startPoints.push(...cells[size - 1] // bottom row
        .filter(hasWall(2))
        .map(shift(1, 1))
    );
    startPoints.push(...cells.map(row => row[0]) // left column
        .filter(hasWall(3))
        .map(shift(0, 1))
    );
    startPoints.push(...cells.map(row => row[size - 1]) // right column
        .filter(hasWall(3))
        .map(shift(1, 1))
    );

    return startPoints;
}

function buildNode(maze: Maze, p: Point, parent?: Point): Node {
    const { x, y } = p;

    const children: Node[] = [];
    const tlCell = maze.cells[y - 1]?.[x - 1];
    const brCell = maze.cells[y]?.[x];

    // if there's a wall to the left _.
    const l = { x: x - 1, y };
    if (tlCell?.walls[3] && !isSame(l, parent)) {
        children.push(buildNode(maze, l, p));
    }

    // if there's a wall on the top !
    const t = { x, y: y - 1 };
    if (tlCell?.walls[2] && !isSame(t, parent)) {
        children.push(buildNode(maze, t, p));
    }

    // if there's a wall to the right ._
    const r = { x: x + 1, y };
    if (brCell?.walls[1] && !isSame(r, parent)) {
        children.push(buildNode(maze, r, p));
    }

    // if there's a wall on the bottom ¡
    const b = { x, y: y + 1 };
    if (brCell?.walls[0] && !isSame(b, parent)) {
        children.push(buildNode(maze, b, p));
    }

    return { x, y, children };
}

function isSame(a: Point, b?: Point): boolean {
    return a.x === b?.x && a.y === b.y;
}