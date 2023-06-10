import { Point } from "../../geometry/point";
import { Rect } from "../../geometry/rect";
import { Shape } from "../../geometry/shape";
import { Cell } from "../../maze/maze";

/**
 * This shape exists in Cartesian coordinate system not in SVG/Canvas space,
 * meaning: (0, 0) is the "center" of our plane while for SVG (0, 0) is the
 * left-top corner.
 * The shape appears like this in svg space:
 * ◣
 * ■
 * and flipped upside down in cartesian coords (described below).
 */
const CORNER_SHAPE = new Shape([
    new Point(0.0, 0.0),
    new Point(0.5, 0.5),
    new Point(0.5, 1.0),
    new Point(0.0, 1.0),
]);

type Background = {
    type: 'PATH',
    d: string,
} | {
    type: 'RECT',
    rect: Rect,
};

type Border = {
    wallPath?: string,
    background: Background,
}

export class EditableBorderPresenter {

    constructor(
        readonly key: string,
        private readonly cell: Cell,
        private readonly side: number, // 0 (left) | 1 (top) | 2 (right) | 3 (bottom)
        private readonly mazeSize: number,
    ) {
    }

    isOpen(): boolean {
        return !this.cell.walls[this.side];
    }

    onClick() {
        this.cell.walls[this.side] = !this.cell.walls[this.side];
    }

    getBorder(scale: number): Border {
        const src = new Point(this.cell.x, this.cell.y);
        const dst = src.clone();

        switch (this.side) {
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

        const background = this.getBorderBackground(src.x, src.y, scale);

        src.multiply(scale);
        dst.multiply(scale);

        const wallPath = `M${src.x} ${src.y} L${dst.x} ${dst.y}`;

        return { wallPath, background }
    }

    getBorderBackground(x: number, y: number, scale: number): Background {
        const d = this.getCornerPath(x, y, scale);
        if (d) {
            return { type: 'PATH', d };
        }

        const rect = this.getRect(x, y).scale(scale);
        return { type: 'RECT', rect };
    }

    getCornerPath(x: number, y: number, scale: number): string | undefined {
        const last = this.mazeSize;
        const isCorner = (x === 0 || x >= last - 1) && (y === 0 || y >= last - 1);
        if (!isCorner) {
            return;
        }

        const shape = CORNER_SHAPE.clone();
        if (this.side % 2 != 0) shape.rotate(90).flipY();
        if (x >= last - 1) shape.flipX().translateX(last);
        if (y >= last - 1) shape.flipY().translateY(last);

        if (!shape) {
            return;
        }
        return shape.scale(scale).toSvgPath();
    }

    getRect(x: number, y: number): Rect {
        switch (this.side) {
            case 0: return new Rect(x, y, 0.5, 1.0);
            case 1: return new Rect(x, y, 1.0, 0.5);
            case 2: return new Rect(x - 0.5, y, 0.5, 1.0);
            case 3: return new Rect(x, y - 0.5, 1.0, 0.5);
            default: {
                throw new Error(`Side index should be between 0 and 3, found ${this.side}`)
            }
        }
    }
}