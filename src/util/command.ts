export type Command = {
    type: 'M' | 'L',
    x: number,
    y: number,
};

export function commandsToPath(commands: Command[], scale: number = 1): string {
    return commands.map(cmd =>
        `${cmd.type}${cmd.x * scale} ${cmd.y * scale}`
    ).join(' ');
}