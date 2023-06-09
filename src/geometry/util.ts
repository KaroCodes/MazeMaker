export function round(num: number, fractionDigits: number): number {
    return Number(num.toFixed(fractionDigits));
}

export function degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180.0;
}