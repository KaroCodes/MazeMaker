import { MazeConverter } from '../util/maze_converter';
import { Maze, Point } from '../util/models';
import './EditableMaze.css';

type Rect = Point & {
    width: number,
    height: number,
    customPath?: string,
}

type MazeSVGProps = {
    maze: Maze,
    // presenter: MazePresenter,
}

export function EditableMaze({ maze }: MazeSVGProps) {
    // const fill = '#111';
    const lineWidth = 3;
    let lineColor = 'white';
    const cellSize = 64;
    const mazeSize = maze.size * cellSize;

    const borderPaths: { d: string, rect: Rect, open: boolean, toggleExit?: () => void }[] = [];
    const cmds = MazeConverter.toInnerPaths(maze);
    const d = cmds.map(cmd => `${cmd.type}${cmd.x * cellSize} ${cmd.y * cellSize}`).join(' ');
    console.log(d)

    maze.cells.forEach(row => {
        row.forEach(cell => {
            const x = cell.x * cellSize;
            const y = cell.y * cellSize;
            const tl = { x, y };
            const tr = { x: x + cellSize, y };
            const bl = { x, y: y + cellSize };
            const br = { x: x + cellSize, y: y + cellSize };

            if (cell.x === 0 && cell.walls[0]) {
                const rect = { x, y, width: cellSize / 2, height: cellSize };
                const customPath = cell.y === 0
                    ? `M${rect.x} ${rect.y} L${rect.x + cellSize / 2} ${rect.y + cellSize / 2} L${rect.x + cellSize / 2} ${rect.y + cellSize} L${rect.x} ${rect.y + cellSize} Z`
                    : undefined;

                borderPaths.push({
                    d: `M${tl.x} ${tl.y} L${bl.x} ${bl.y}`,
                    rect: { ...rect, customPath },
                    open: false,
                    toggleExit: () => { console.log('hi'); cell.walls[0] = !cell.walls[0]; }
                });
            }
            if (cell.x === maze.size - 1) {
                const rect = { x: x + cellSize / 2, y, width: cellSize / 2, height: cellSize };

                borderPaths.push({
                    d: `M${tr.x} ${tr.y} L${br.x} ${br.y}`,
                    rect,
                    open: false,
                });
            }
            if (cell.y === 0 && cell.walls[1]) {
                const rect = { x, y, width: cellSize, height: cellSize / 2 };
                const customPath = cell.x === 0
                    ? `M${rect.x} ${rect.y} L${rect.x + cellSize} ${rect.y} L${rect.x + cellSize} ${rect.y + cellSize / 2} L${rect.x + cellSize / 2} ${rect.y + cellSize / 2} Z`
                    : undefined;


                borderPaths.push({
                    d: `M${tl.x} ${tl.y} L${tr.x} ${tr.y}`,
                    rect: { ...rect, customPath },
                    open: false,
                });
            }
            if (cell.y === maze.size - 1) {
                const rect = { x, y: y + cellSize / 2, width: cellSize, height: cellSize / 2 };
                borderPaths.push({
                    d: `M${bl.x} ${bl.y} L${br.x} ${br.y}`,
                    rect,
                    open: false,
                });
            }
        })
    })

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${mazeSize} ${mazeSize}`}>
                <g>
                    {borderPaths.map(({ open, d, rect, toggleExit }, i) => {
                        const bg = rect.customPath
                            ? (
                                <path
                                    d={rect.customPath}
                                    stroke='none'
                                    fill='#111'
                                    opacity={.5}
                                />
                            )
                            : (
                                <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} fill={'#111'} opacity={.5} />
                            );
                        return (
                            <g className={open ? 'exit' : 'border'} key={i} onClick={toggleExit}>
                                {bg}
                                <path d={d} stroke={lineColor} strokeWidth={10} fill='none' />
                            </g>
                        )
                    })}
                    <path d={d} stroke={lineColor} strokeWidth={lineWidth} fill='none' strokeLinejoin='miter' />
                </g>
            </svg>
        </div>
    )
}

export default EditableMaze
