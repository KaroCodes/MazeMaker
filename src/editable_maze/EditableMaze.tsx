import { EditableBorder } from './border/EditableBorder';
import { EditableMazePresenter } from './editable_maze_presenter';

const XMLNS = "http://www.w3.org/2000/svg";

type EditableMazeProps = {
    presenter: EditableMazePresenter,
}

export function EditableMaze({ presenter }: EditableMazeProps) {
    const { maze } = presenter;
    // const fill = '#111';
    const lineWidth = 3;
    let lineColor = 'white';
    const cellSize = 64;
    const mazeSize = maze.size * cellSize;

    const innerWallsPaths = presenter.innerWalls.map(cmd =>
        `${cmd.type}${cmd.x * cellSize} ${cmd.y * cellSize}`
    ).join(' ');

    const borderCells = presenter.getBorderCells();

    return (
        <div>
            <svg xmlns={XMLNS} viewBox={`0 0 ${mazeSize} ${mazeSize}`}>

                {borderCells.flatMap((cells, side) => cells.map((cell, idx) => (
                    <EditableBorder key={`${side}_${idx}`} cell={cell}
                        cellSize={cellSize} side={side} mazeSize={maze.size} />
                )))}
                <path
                    d={innerWallsPaths}
                    stroke={lineColor}
                    strokeWidth={lineWidth}
                    fill='none'
                    strokeLinejoin='miter'
                />
            </svg>
        </div>
    )
}

export default EditableMaze
