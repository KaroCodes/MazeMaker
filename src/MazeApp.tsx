import { useState } from 'react';
import './MazeApp.css';
import EditableMaze from './editable_maze/EditableMaze';
import { MAX_ID, MAX_SIZE, MAX_THICKNESS, MIN_ID, MIN_SIZE, MIN_THICKNESS, MazeAppPresenter } from './maze_app_presenter';
import { Slider } from './ui/slider/Slider';

export type MazeAppProps = {
    presenter: MazeAppPresenter,
}

function MazeApp({ presenter }: MazeAppProps) {

    const [maze, setMaze] = useState(presenter.getMaze());
    const [editing, setEditing] = useState(false);
    const [wallThickness, setWallThickness] = useState(3);

    return (
        <div className='container'>

            <EditableMaze presenter={presenter.getEditablePresenter(maze)}
                editing={editing} wallThickness={wallThickness} />

            <div className='controls'>

                <button className={editing ? 'primary' : ''}
                    onClick={() => setEditing(!editing)}>
                    {editing ? 'Done ✓' : 'Edit exits'}
                </button>

                <h3>Maze ID</h3>
                <div className='picker'>
                    <button onClick={() => setMaze(presenter.getPreviousMaze())}
                        disabled={!presenter.canGetPreviousMaze()}>
                        &#8678;
                    </button>
                    <input type='number' value={maze.id}
                        min={MIN_ID} max={MAX_ID}
                        onChange={(e) => {
                            const id = Number(e.target.value) || undefined;
                            console.log(id)
                            setMaze(presenter.getMaze({ id }));
                        }} />
                    <button onClick={() => setMaze(presenter.getNextMaze())}
                        disabled={!presenter.canGetNextMaze()}>
                        &#8680;
                    </button>
                    <button onClick={() => setMaze(presenter.getRandomMaze())}>
                        Random
                    </button>
                </div>

                <h3>Size</h3>
                <Slider
                    minValue={MIN_SIZE}
                    maxValue={MAX_SIZE}
                    defaultValue={maze.size}
                    onChange={(size) => setMaze(presenter.getMaze({ size }))}
                />

                <h3>Wall thickness</h3>
                <Slider
                    minValue={MIN_THICKNESS}
                    maxValue={MAX_THICKNESS}
                    defaultValue={wallThickness}
                    onChange={(thickness) => setWallThickness(thickness)}
                />

                <h3>Wall style</h3>

            </div>

            <button className='primary'
                onClick={() => presenter.download(wallThickness)}>
                Download SVG
            </button>
        </div>
    )
}

export default MazeApp
