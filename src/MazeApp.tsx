import { useCallback, useState } from 'react';
import './MazeApp.css';
import EditableMaze from './editable_maze/EditableMaze';
import { MazeAppPresenter } from './maze_app_presenter';

export type MazeAppProps = {
    presenter: MazeAppPresenter,
}

function MazeApp({ presenter }: MazeAppProps) {

    const [maze, setMaze] = useState(presenter.getMaze());
    const [editing, setEditing] = useState(false);

    return (
        <div className='container'>

            <div className='controls'>
                <button onClick={() => setMaze(presenter.getRandomMaze())}>
                    Get random maze
                </button>
                <button onClick={() => setEditing(!editing)}>
                    {editing ? 'Done ✓' : 'Edit exits'}
                </button>
            </div>

            <EditableMaze presenter={presenter.getEditablePresenter(maze)} editing={editing} />

            <div className='controls'>
                <div className='picker'>
                    <button onClick={() => setMaze(presenter.getPreviousMaze())}>
                        &#8678;
                    </button>
                    <span>Id: {maze.id}</span>
                    <button onClick={() => setMaze(presenter.getNextMaze())}>
                        &#8680;
                    </button>
                </div>
                <div className='picker'>
                    <button onClick={() => setMaze(presenter.sizeDown())}
                        disabled={!presenter.canSizeDown()}>
                        &#8681;
                    </button>
                    <span>Size: {maze.size}</span>
                    <button onClick={() => setMaze(presenter.sizeUp())}
                        disabled={!presenter.canSizeUp()}>
                        &#8679;
                    </button>
                </div>
            </div>

            <button onClick={() => presenter.download()}>
                Download SVG
            </button>
        </div>
    )
}

export default MazeApp
