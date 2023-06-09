
export class Rect {

    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
    ) {
    }

    scale(factor: number): Rect {
        this.x *= factor;
        this.y *= factor;
        this.width *= factor;
        this.height *= factor;
        return this;
    }
}