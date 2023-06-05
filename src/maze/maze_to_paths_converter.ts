import * as _ from 'lodash';
import { Cell, Maze, Point } from "./maze";

type Node = {
    children: Node[],
} & Point;

type Line = {
    src: Point,
    dst: Point,
}

export type Command = {
    type: 'M' | 'L',
} & Point;

export function convertMazeToPaths(maze: Maze): Command[] {

    // remove outer walls from the copy of the maze so they don't interfere with
    // tree creation (trees should only contain inner walls).
    const edgelessMaze = copyWithoutEdges(maze);

    // roots are any walls growing directly from maze's edges
    const roots = getRoots(edgelessMaze);

    // build trees growing from the edge-roots
    const trees = roots.map(node => buildNode(edgelessMaze, node));

    // convert nodes to lines, node.children[0] always exists
    const lines = trees.flatMap(node => toLines(node.children[0], node));

    // remove midpoints e.g. path (0,1) -> (0,2) -> (0,3) becomes (0,1) -> (0,3));
    const simplified = removeMidpoints(lines);

    // turn lines into commands instructing to either move (M) or draw line (L)
    const commands = toCommands(simplified);

    return commands;
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

function toLines(node: Node, parent: Node): Line[] {
    const line = {
        src: { x: parent.x, y: parent.y },
        dst: { x: node.x, y: node.y },
    };

    if (!node.children) {
        return [line];
    }

    return [line].concat(node.children.flatMap(c => toLines(c, node)));
}

function removeMidpoints(lines: Line[]): Line[] {
    if (!lines.length) {
        return [];
    }

    const simplified = [lines.shift()!];
    let prev, next: Line;

    while (lines.length) {
        prev = simplified.pop()!;
        next = lines.shift()!;
        simplified.push(...maybeRemoveMidpoint(prev, next));
    }

    return simplified;
}

function maybeRemoveMidpoint(prev: Line, next: Line): Line[] {
    if ((prev.dst.x === next.src.x && prev.dst.y === next.src.y) && // previous line ends where next one starts
        (prev.src.x === next.dst.x || prev.src.y === next.dst.y)) { // source of previous line is in the same row or column as the next lines destination
        return [{ src: prev.src, dst: next.dst }];
    }
    return [prev, next];
}

function toCommands(lines: Line[]): Command[] {
    if (!lines.length) {
        return [];
    }

    const commands: Command[] = [];
    let prev = undefined, next: Line;
    for (let i = 0; i < lines.length; i++) {
        next = lines[i];
        commands.push(...getCommands(prev, next));
        prev = next;
    }

    return commands;
}

function getCommands(prev: Line | undefined, next: Line): Command[] {
    const lineTo: Command = { type: 'L', x: next.dst.x, y: next.dst.y };
    if (prev && prev.dst.x === next.src.x && prev.dst.y === next.src.y) { // is a continuation 
        return [lineTo];
    }
    const moveTo: Command = { type: 'M', x: next.src.x, y: next.src.y };
    return [moveTo, lineTo];
}

function isSame(a: Point, b?: Point): boolean {
    return a.x === b?.x && a.y === b.y;
}