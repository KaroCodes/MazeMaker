import { useState } from 'react';
import './MazeApp.css';
import EditableMaze from './editable_maze/EditableMaze';
import { MazeAppPresenter } from './maze_app_presenter';
import { Maze } from './util/models';

export type MazeAppProps = {
    presenter: MazeAppPresenter,
}

function MazeApp({ presenter }: MazeAppProps) {

    const [maze, setMaze] = useState<Maze>(presenter.getMaze());

    return (
        <div className='container'>
            <div className='mazeControls'>
                <button onClick={() => { }}>Edit exits</button>
            </div>
            <EditableMaze presenter={presenter.getEditablePresenter(maze)} />
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
