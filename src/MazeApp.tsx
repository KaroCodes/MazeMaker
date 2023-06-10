import { useState } from 'react';
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
            <div className='mazeControls'>
                <button onClick={() => setEditing(!editing)}>
                    {editing ? 'Done ✓' : 'Edit exits'}</button>
            </div>
            <EditableMaze presenter={presenter.getEditablePresenter(maze)} editing={editing} />
            <div className='mazePicker'>
                <button onClick={() => setMaze(presenter.getPreviousMaze())}>
                    &#8678;
                </button>
                <button onClick={() => setMaze(presenter.getRandomMaze())}>
                    Get random maze
                </button>
                <button onClick={() => setMaze(presenter.getNextMaze())}>
                    &#8680;
                </button>
            </div>
        </div>
    )
}

export default MazeApp
