import { Maze, Point } from './maze';
import './MazeSVG.css';

type Rect = Point & {
    width: number,
    height: number,
    isCorner: boolean,
}

type MazeSVGProps = {
    maze: Maze,
    // presenter: MazePresenter,
}

export function MazeSVG({ maze }: MazeSVGProps) {
    const fill = '#111';
    const lineWidth = 1;
    const lineColor = 'white';
    const cellSize = 64;
    const mazeSize = maze.size * cellSize;

    const borderPaths: { d: string, rect: Rect, toggleExit?: () => void }[] = [];
    let d = '';

    maze.cells.forEach(row => {
        row.forEach(cell => {
            const x = cell.x * cellSize;
            const y = cell.y * cellSize;
            const tl = { x, y };
            const tr = { x: x + cellSize, y };
            const bl = { x, y: y + cellSize };
            const br = { x: x + cellSize, y: y + cellSize };

            let continuation = false;

            if (cell.x === 0 && cell.walls[0]) {
                borderPaths.push({
                    d: `M${tl.x} ${tl.y} L${bl.x} ${bl.y}`,
                    rect: {
                        x,
                        y,
                        width: cellSize / 2,
                        height: cellSize,
                        isCorner: cell.y === 0 || cell.y === maze.size,
                    },
                    toggleExit: () => { console.log('hi'); cell.walls[0] = !cell.walls[0] }
                });
            }
            if (cell.x === maze.size - 1) {
                borderPaths.push({
                    d: `M${tr.x} ${tr.y} L${br.x} ${br.y}`,
                    rect: { x: x + cellSize / 2, y, width: cellSize / 2, height: cellSize, isCorner: false }
                });
            }
            if (cell.y === 0) {
                borderPaths.push({
                    d: `M${tl.x} ${tl.y} L${tr.x} ${tr.y}`,
                    rect: { x, y, width: cellSize, height: cellSize / 2, isCorner: false }
                });
            }
            if (cell.y === maze.size - 1) {
                borderPaths.push({
                    d: `M${bl.x} ${bl.y} L${br.x} ${br.y}`,
                    rect: { x, y: y + cellSize / 2, width: cellSize, height: cellSize / 2, isCorner: false }
                });
            }

            if (cell.walls[0] && cell.x !== 0) {
                d += `M${bl.x} ${bl.y} L${tl.x} ${tl.y}`;
                continuation = true;
            }
            if (cell.walls[1] && cell.y !== 0) {
                if (continuation) {
                    d += `L${tr.x} ${tr.y}`;
                } else {
                    d += `M${tl.x} ${tl.y} L${tr.x} ${tr.y}`;
                }
                continuation = true;
            }
        })
    })

    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${mazeSize} ${mazeSize}`}>
                <g>
                    <path d={d} stroke={lineColor} strokeWidth={lineWidth} fill='none' />
                    {borderPaths.map(({ d, rect, toggleExit }) => {
                        // const bg = rect.isCorner
                        //     ? (
                        //         <path
                        //             d={`M${rect.x} ${rect.y} L${rect.x + cellSize} ${rect.y} L${rect.x + cellSize} ${rect.y + cellSize / 2} L${rect.x + cellSize / 2} ${rect.y + cellSize / 2} Z`}
                        //             stroke='none'
                        //             fill={'blue'}
                        //             opacity={.5}
                        //         />
                        //     )
                        //     : (
                        //         <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} fill={'#111'} opacity={.5} />
                        //     );
                        return (
                            <g className='border' onClick={toggleExit}>
                                <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} fill={'#111'} opacity={.5} />
                                <path d={d} stroke={lineColor} strokeWidth={10} fill='none' />
                            </g>
                        )
                    })}
                </g>
            </svg>
        </div>
    )
}

export default MazeSVG
