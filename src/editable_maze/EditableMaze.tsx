import { EditableBorder } from './border/EditableBorder';
import { EditableMazePresenter } from './editable_maze_presenter';

type EditableMazeProps = {
    presenter: EditableMazePresenter,
    editing: boolean,
}

export function EditableMaze({ presenter, editing }: EditableMazeProps) {
    const { maze } = presenter;
    const strokeWidth = 3;
    const lineColor = 'white';
    const cellSize = 64;
    const mazeSize = maze.size * cellSize;

    const Path = ({ d }: { d: string }) => (
        <path d={d} stroke={lineColor} strokeWidth={strokeWidth}
            fill='none' strokeLinecap='square' strokeLinejoin='miter' />
    );

    const EditableBorders = () => (
        <>
            {presenter.getEditableBorderPresenters().map((presenter) => (
                <EditableBorder presenter={presenter} scale={cellSize}
                    strokeWidth={strokeWidth} key={presenter.key} />
            ))}
        </>
    );

    const Border = () => {
        return editing
            ? <EditableBorders />
            : <Path d={presenter.getOuterWallsPath(cellSize)} />
    };

    return (
        <div>
            <svg xmlns='http://www.w3.org/2000/svg'
                viewBox={`${- strokeWidth / 2} ${- strokeWidth / 2} \
                ${mazeSize + strokeWidth} ${mazeSize + strokeWidth}`}>
                <Border />
                <Path d={presenter.getInnerWallsPath(cellSize)} />
            </svg>
        </div>
    )
}

export default EditableMaze
