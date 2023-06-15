import { useEffect, useState } from 'react';
import './MazeApp.css';
import EditableMaze from './editable_maze/EditableMaze';
import { DEFAULT_ID, DEFAULT_SIZE, DEFAULT_THICKNESS, MAX_ID, MAX_SIZE, MAX_THICKNESS, MIN_ID, MIN_SIZE, MIN_THICKNESS, MazeAppPresenter } from './maze_app_presenter';
import { Slider } from './ui/slider/Slider';
import { NumericInput } from './ui/numericinput/NumericInput';

export type MazeAppProps = {
    presenter: MazeAppPresenter,
}

function MazeApp({ presenter }: MazeAppProps) {

    const [maze, setMaze] = useState(presenter.getMaze());
    const [editing, setEditing] = useState(false);

    const [id, setId] = useState(DEFAULT_ID);
    const [size, setSize] = useState(DEFAULT_SIZE);
    const [wallThickness, setWallThickness] = useState(DEFAULT_THICKNESS);

    useEffect(() => {
        setMaze(presenter.getMaze({ id, size }));
    }, [id, size]);

    return (
        <div className='container'>

            <EditableMaze presenter={presenter.getEditablePresenter(maze)}
                editing={editing} wallThickness={wallThickness} />

            <div className='controls'>

                <button className={editing ? 'primary' : ''}
                    onClick={() => setEditing(!editing)}>
                    {editing ? 'Done ✓' : 'Edit exits'}
                </button>

                {/* <div className='header'>
                    <h3>Maze ID</h3>
                </div>
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
                </div> */}


                <div className='header'>
                    <h3>Size</h3>
                    <NumericInput
                        min={MIN_SIZE}
                        max={MAX_SIZE}
                        value={size}
                        onChange={setSize} />
                </div>
                <Slider
                    min={MIN_SIZE}
                    max={MAX_SIZE}
                    value={size}
                    onChange={setSize} />

                <div className='header'>
                    <h3>Wall thickness</h3>
                    <NumericInput
                        min={MIN_THICKNESS}
                        max={MAX_THICKNESS}
                        value={wallThickness}
                        onChange={setWallThickness} />
                </div>
                <Slider
                    min={MIN_THICKNESS}
                    max={MAX_THICKNESS}
                    value={wallThickness}
                    onChange={setWallThickness} />

                <div className='header'>
                    <h3>Wall style</h3>
                </div>

            </div>

            <button className='primary'
                onClick={() => presenter.download(wallThickness)}>
                Download SVG
            </button>
        </div>
    )
}

export default MazeApp
