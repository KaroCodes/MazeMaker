import { EditableBorder } from './border/EditableBorder';
import { EditableMazePresenter } from './editable_maze_presenter';

const EDITABLE_WALL_THICKNESS = 3;

type EditableMazeProps = {
    presenter: EditableMazePresenter,
    editing: boolean,
    cellSize: number,
    wallThickness: number,
}

export function EditableMaze({
    presenter,
    editing,
    cellSize,
    wallThickness,
}: EditableMazeProps) {
    const { maze } = presenter;
    const mazeSize = maze.size * cellSize;
    const strokeWidth = editing ? EDITABLE_WALL_THICKNESS : wallThickness

    const Path = ({ d }: { d: string }) => (
        <path d={d} stroke='white' strokeWidth={strokeWidth}
            strokeLinecap='square' strokeLinejoin='miter' fill='none' />
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

    const offset = - strokeWidth / 2;
    const size = mazeSize + strokeWidth;
    return (
        <div>
            <svg xmlns='http://www.w3.org/2000/svg'
                viewBox={`${offset} ${offset} ${size} ${size}`}>
                <Border />
                <Path d={presenter.getInnerWallsPath(cellSize)} />
            </svg>
        </div>
    )
}

export default EditableMaze
