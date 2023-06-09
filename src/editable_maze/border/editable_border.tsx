import * as _ from 'lodash';
import { useCallback, useState } from "react";
import { Cell } from "../../util/models";
import { Point } from '../../geometry/point';
import { Shape } from '../../geometry/shape';
import { Rect } from '../../geometry/rect';

const BACKGROUND_COLOR = 'red';//'#111';

/**
 * ◣
 * ■
 * This shape exists in Cartesian coordinate system not in SVG/Canvas space,
 * meaning: (0, 0) is the "center" of our plane while for SVG (0, 0) is the
 * left-top corner.
 */
const CORNER_SHAPE = new Shape([
    new Point(0.0, 0.0),
    new Point(0.5, -0.5),
    new Point(0.5, -1.0),
    new Point(0.0, -1.0),
]);

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

    const Background = () => {
        const fill = open ? 'transparent' : BACKGROUND_COLOR;

        if (border.background.type === 'RECT') {
            const { x, y, width, height } = border.background.rect;
            return (
                <rect x={x} y={y} width={width} height={height}
                    opacity={.5} fill={fill} />
            )
        }

        return (
            <path d={border.background.d} opacity={.5} fill={fill} />
        )
    }

    const Border = () => {
        if (open || !border) {
            return null;
        }
        return (
            <path d={border.d} stroke='white' strokeLinejoin='miter' strokeWidth={8} />
        )
    };

    return (
        <g onClick={onClick}>
            <Background />
            <Border />
        </g>
    )
}

function getBorder(
    cell: Cell, scale: number,
    side: number, last: number,
): Border {
    const src = new Point(cell.x, cell.y);
    const dst = src.clone();

    switch (side) {
        case 0: {
            dst.y++;
            break;
        }
        case 1: {
            dst.x++;
            break;
        }
        case 2: {
            src.x++;
            dst.x++;
            dst.y++;
            break;
        }
        case 3: {
            src.y++;
            dst.x++;
            dst.y++;
            break;
        }
    }

    const background = getBorderBackground(src.x, src.y, scale, side, last);

    src.multiply(scale);
    dst.multiply(scale);

    const d = `M${src.x} ${src.y} L${dst.x} ${dst.y}`;

    return { d, background }
}

function getBorderBackground(
    x: number, y: number,
    scale: number,
    side: number,
    last: number,
): Background {
    console.log(`x: ${x}, y: ${y}`)

    const d = getCornerPath(x, y, scale, side, last);
    if (d) {
        return { type: 'PATH', d };
    }

    const rect = getRect(x, y, side).scale(scale);
    return { type: 'RECT', rect };
}

function getCornerPath(
    x: number,
    y: number,
    scale: number,
    side: number,
    last: number,
): string | undefined {
    // console.log(`x: ${x}, y: ${y}`)
    let shape: Shape | undefined;

    if (x === 0 && y === 0) {
        shape = CORNER_SHAPE.clone();
        side ? shape.rotate(-90) : shape.flipY();
    }
    if (x === 0 && y === last - 1) {
        shape = CORNER_SHAPE.clone();
        shape.translateY(last)
    }
    if (x === 0 && y === last) {
        shape = CORNER_SHAPE.clone();
        shape.rotate(90).flipX().translateY(last);
    }
    if (x === last - 1 && y === 0) {
        shape = CORNER_SHAPE.clone();
        shape.flipX().rotate(90).translateX(last)
    }
    if (x === last && y === 0) {
        shape = CORNER_SHAPE.clone();
        shape.flipX().flipY().translateX(last)
    }
    if (x === last - 1 && y === last) {
        shape = CORNER_SHAPE.clone();
        shape.flipX().flipY().rotate(-90).translateX(last).translateY(last)
    }
    if (x === last && y === last - 1) {
        shape = CORNER_SHAPE.clone();
        shape.flipY().rotate(180).translateX(last).translateY(last)
    }

    if (!shape) {
        return;
    }
    return shape.scale(scale).toSvgPath();
}

function getRect(x: number, y: number, side: number): Rect {
    switch (side) {
        case 0: return new Rect(x, y, 0.5, 1.0);
        case 1: return new Rect(x, y, 1.0, 0.5);
        case 2: return new Rect(x - 0.5, y, 0.5, 1.0);
        case 3: return new Rect(x, y - 0.5, 1.0, 0.5);
        default: {
            throw new Error(`Side index should be between 0 and 3, found ${side}`)
        }
    }
}
