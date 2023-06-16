import { EditableBorder } from './border/EditableBorder';
import { EditableMazePresenter } from './editable_maze_presenter';

const EDITABLE_WALL_THICKNESS = 3;

type EditableMazeProps = {
    presenter: EditableMazePresenter,
    editing: boolean,
    cellSize: number,
    wallThickness: number,
    roundWalls: boolean,
}

export function EditableMaze({
    presenter,
    editing,
    cellSize,
    wallThickness,
    roundWalls,
}: EditableMazeProps) {
    const { maze } = presenter;
    const mazeSize = maze.size * cellSize;
    const strokeWidth = editing ? EDITABLE_WALL_THICKNESS : wallThickness;
    const strokeLinecap = !editing && roundWalls ? 'round' : 'square';
    const strokeLinejoin = !editing && roundWalls ? 'round' : 'miter';

    const Path = ({ d }: { d: string }) => (
        <path d={d} fill='none' stroke='white' strokeWidth={strokeWidth}
            strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} />
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
