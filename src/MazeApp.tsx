import { useEffect, useState } from 'react';
import './MazeApp.css';
import EditableMaze from './editable_maze/EditableMaze';
import { CELL_SIZE, DEFAULT_ID, DEFAULT_SIZE, DEFAULT_THICKNESS, MAX_ID, MAX_SIZE, MAX_THICKNESS, MIN_ID, MIN_SIZE, MIN_THICKNESS, MazeAppPresenter } from './maze_app_presenter';
import { NumericInput } from './ui/numericinput/NumericInput';
import { Slider } from './ui/slider/Slider';
import { randomInt } from './util/random';
import { RoundingPicker } from './ui/roundingpicker/RoundingPicker';

export type MazeAppProps = {
    presenter: MazeAppPresenter,
}

function MazeApp({ presenter }: MazeAppProps) {

    const [editing, setEditing] = useState(false);

    const [id, setId] = useState(DEFAULT_ID);
    const [size, setSize] = useState(DEFAULT_SIZE);
    const [wallThickness, setWallThickness] = useState(DEFAULT_THICKNESS);
    const [roundWalls, setRoundWalls] = useState(false);

    const [maze, setMaze] = useState(presenter.getMaze(id, size));

    useEffect(() => {
        setMaze(presenter.getMaze(id, size));
    }, [id, size]);

    return (
        <div className='container'>

            <EditableMaze presenter={presenter.getEditablePresenter(maze)}
                editing={editing} cellSize={CELL_SIZE}
                wallThickness={wallThickness} roundWalls={roundWalls} />

            <div className='controls'>

                <button className={editing ? 'primary' : ''}
                    onClick={() => setEditing(!editing)}>
                    {editing ? 'Done ✓' : 'Edit exits'}
                </button>

                <div className='header'>
                    <h3>Maze ID</h3>
                </div>
                <div className='idPicker'>
                    <button onClick={() => setId(id - 1)}
                        disabled={id <= MIN_ID}>
                        &#8678;
                    </button>
                    <NumericInput
                        min={MIN_ID}
                        max={MAX_ID}
                        value={id}
                        onChange={setId} />
                    <button onClick={() => setId(id + 1)}
                        disabled={id >= MAX_ID}>
                        &#8680;
                    </button>
                    <button onClick={() => setId(randomInt(MIN_ID, MAX_ID))}>
                        Random
                    </button>
                </div>

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
                <RoundingPicker
                    roundWalls={roundWalls}
                    setRoundWalls={(value) => setRoundWalls(value)} />

            </div>

            <button className='download primary'
                onClick={() => presenter.download(maze, wallThickness, roundWalls)}>
                Download SVG
            </button>
        </div>
    )
}

export default MazeApp
