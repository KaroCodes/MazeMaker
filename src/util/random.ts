import seedrandom from "seedrandom";

export function seedableRandomIntGenerator(seed: number) {
    const srnd = seedrandom(`${seed}`);
    return (min: number, max: number) => Math.floor(srnd() * (max - min) + min);
}

export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) - min);
}