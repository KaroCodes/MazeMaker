import { EditableBorder } from './border/EditableBorder';
import { EditableMazePresenter } from './editable_maze_presenter';

type EditableMazeProps = {
    presenter: EditableMazePresenter,
    editing: boolean,
    wallThickness: number,
}

export function EditableMaze({
    presenter,
    editing,
    wallThickness,
}: EditableMazeProps) {
    const { maze } = presenter;
    const lineColor = 'white';
    const cellSize = 64;
    const mazeSize = maze.size * cellSize;

    const Path = ({ d }: { d: string }) => (
        <path d={d} stroke={lineColor} strokeWidth={wallThickness}
            fill='none' strokeLinecap='square' strokeLinejoin='miter' />
    );

    const EditableBorders = () => (
        <>
            {presenter.getEditableBorderPresenters().map((presenter) => (
                <EditableBorder presenter={presenter} scale={cellSize}
                    strokeWidth={wallThickness} key={presenter.key} />
            ))}
        </>
    );

    const Border = () => {
        return editing
            ? <EditableBorders />
            : <Path d={presenter.getOuterWallsPath(cellSize)} />
    };

    const offset = - wallThickness / 2;
    const size = mazeSize + wallThickness;
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
