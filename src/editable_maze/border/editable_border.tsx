import * as _ from 'lodash';
import { useCallback, useState } from "react";
import { Cell } from "../../util/models"
import { Point, flipShape, multiply, rotateShape } from "../../util/maths";

const BACKGROUND_COLOR = "#111";

/**
 * ◣
 * ■
 */
const CORNER_SHAPE = [
    { x: 0.0, y: 0.0 },
    { x: 0.5, y: -0.5 },
    { x: 0.5, y: -1.0 },
    { x: 0.0, y: -1.0 },
];

type Rect = {
    width: number,
    height: number
} & Point;

type Background = {
    type: 'PATH',
    d: string,
} | {
    type: 'RECT',
    rect: Rect,
};

type Border = {
    d?: string,
    background: Background,
}

type EditableBorderProps = {
    cell: Cell,
    cellSize: number,
    side: number, // 0 (left) | 1 (top) | 2 (right) | 3 (bottom)
    mazeSize: number,
}

export function EditableBorder({
    cell,
    cellSize,
    side,
    mazeSize,
}: EditableBorderProps) {

    const [open, setOpen] = useState(false);

    const onClick = useCallback(() => {
        cell.walls[0] = !cell.walls[0];
        setOpen(!open);
    }, [open, setOpen]);

    const border = getBorder(cell, cellSize, side, mazeSize);

    return (
        <g onClick={onClick}>
            {border.background.type === 'RECT'
                ? <rect x={border.background.rect.x} y={border.background.rect.y}
                    width={border.background.rect.width} height={border.background.rect.height}
                    opacity={.5}
                    fill={open ? 'transparent' : BACKGROUND_COLOR} />
                : <path d={border.background.d} opacity={.5}
                    fill={open ? 'transparent' : BACKGROUND_COLOR} />
            }

            {!open && border
                ? <path d={border.d} stroke='white' strokeLinejoin='miter' strokeWidth={8} />
                : undefined
            }
        </g>
    )
}

function getBorder(
    cell: Cell, size: number,
    side: number, cellsCount: number,
): Border {
    let sx, sy, dx, dy: number;
    sx = sy = dx = dy = 0;

    switch (side) {
        case 0: {
            sx = dx = cell.x;
            sy = cell.y;
            dy = cell.y + 1;
            break;
        }
        case 1: {
            sx = cell.x;
            sy = dy = cell.y;
            dx = cell.x + 1;
            break;
        }
        case 2: {
            sx = dx = cell.x + 1;
            sy = cell.y;
            dy = cell.y + 1;
            break;
        }
        case 3: {
            sx = cell.x;
            sy = dy = cell.y + 1;
            dx = cell.x + 1;
            break;
        }
    }
    sx *= size;
    sy *= size;
    dx *= size;
    dy *= size;

    const d = `M${sx} ${sy} L${dx} ${dy}`;

    const background = getBorderBackground(sx, sy, size, side, cellsCount);

    return { d, background }
}

function getBorderBackground(
    x: number, y: number,
    size: number,
    side: number,
    cellsCount: number,
): Background {
    const rect = getRect(x, y, size, side);

    let ps: Point[] = [];
    // left border
    if (x === 0) {
        // top corner
        if (y === 0) {
            // left border
            if (side === 0) {
                ps = flipShape(CORNER_SHAPE, { flipY: true })
            } else {
                ps = flipShape(rotateShape(flipShape(CORNER_SHAPE, { flipX: true }), 270), { flipY: true });
                console.log(ps)
            }
        }
    }
    if (ps.length !== 4) {
        return { type: 'RECT', rect };
    }
    ps = ps.map(p => multiply(p, size));
    const d = 'M' + ps.map(p => `${p.x} ${p.y}`).join(' L') + ' Z';
    // console.log(d)

    return { type: 'PATH', d }
}

function getRect(x: number, y: number, size: number, side: number): Rect {
    const halfSize = size / 2;
    switch (side) {
        case 0: {
            return { x, y, width: halfSize, height: size };
        }
        case 1: {
            return { x, y, width: size, height: halfSize };
        }
        case 2: {
            return { x: x - halfSize, y, width: halfSize, height: size };
        }
        case 3: {
            return { x, y: y - halfSize, width: size, height: halfSize };
        }
        default: {
            throw new Error(`Side index should be between 0 and 3, found ${side}`)
        }
    }
}
