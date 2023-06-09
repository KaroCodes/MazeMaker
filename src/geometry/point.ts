import { round } from "lodash";
import { degreesToRadians } from "./util";

export class Point {

    constructor(
        public x: number,
        public y: number,
    ) {
    }

    equals(other?: Point): boolean {
        return this.x === other?.x && this.y === other?.y;
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }

    rotate(degrees: number) {
        const rad = degreesToRadians(degrees);
        const matrix = [
            Math.cos(-rad), -Math.sin(-rad),
            Math.sin(-rad), Math.cos(-rad),
        ];
        const rotated = [
            matrix[0] * this.x + matrix[1] * this.y,
            matrix[2] * this.x + matrix[3] * this.y,
        ].map(n => round(n, 1));
        this.x = rotated[0];
        this.y = rotated[1];
    }

    multiply(factor: number) {
        this.x *= factor;
        this.y *= factor;
    }

    flipX() {
        this.x *= -1;
    }

    flipY() {
        this.y *= -1;
    }
}