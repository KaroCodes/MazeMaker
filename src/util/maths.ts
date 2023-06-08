import * as _ from 'lodash';

export type Point = {
    x: number,
    y: number,
}

export function multiply(p: Point, factor: number): Point {
    return { x: p.x * factor, y: p.y * factor };
}

/**
 * @param points points forming a shape
 * @param degrees rotation angle
 * @returns a rotated copy of the shape
 */
export function rotateShape(
    points: Point[],
    degrees: number,
): Point[] {
    return _.cloneDeep(points).map(p => rotatePoint(p, degrees));
}

function rotatePoint(p: Point, degrees: number): Point {
    const radians = degrees * Math.PI / 180.0;
    const negativeRadians = -radians; // rotation matrix is counter clockwise.
    const matrix = [
        Math.cos(negativeRadians),
        -Math.sin(negativeRadians),
        Math.sin(negativeRadians),
        Math.cos(negativeRadians),
    ];
    const rotated = [
        matrix[0] * p.x + matrix[1] * p.y,
        matrix[2] * p.x + matrix[3] * p.y,
    ].map(n => round(n, 1));

    return { x: rotated[0], y: rotated[1] };
}

export function flipShape(
    points: Point[],
    { flipX, flipY }: { flipX?: boolean, flipY?: boolean }
): Point[] {
    return _.cloneDeep(points).map(p => ({
        x: flipX ? p.x * -1 : p.x,
        y: flipY ? p.y * -1 : p.y,
    }));
}

export function round(num: number, fractionDigits: number): number {
    return Number(num.toFixed(fractionDigits));
}