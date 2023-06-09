import * as _ from 'lodash';
import { Point } from "./point";

export class Shape {

    constructor(
        public points: Point[],
    ) {
        // TODO make sure that the shape always consists of more than 2 points
    }

    clone(): Shape {
        return _.cloneDeep(this);
    }

    rotate(degrees: number): Shape {
        this.points.forEach(p => p.rotate(degrees));
        return this;
    }

    flipX(): Shape {
        this.points.forEach(p => p.flipX());
        return this;
    }

    flipY(): Shape {
        this.points.forEach(p => p.flipY());
        return this;
    }

    translateX(dx: number): Shape {
        this.points.forEach(p => p.x += dx);
        return this;
    }

    translateY(dy: number): Shape {
        this.points.forEach(p => p.y += dy);
        return this;
    }

    scale(scale: number): Shape {
        this.points.forEach(p => p.multiply(scale));
        return this;
    }

    toSvgPath(): string {
        return 'M' + this.points.map(p => `${p.x} ${p.y}`).join(' L') + ' Z';
    }
}