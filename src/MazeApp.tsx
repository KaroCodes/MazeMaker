import { useState } from 'react';
import './MazeApp.css';
import EditableMaze from './editable_maze/EditableMaze';
import { MazeAppPresenter } from './maze_app_presenter';
import { Maze } from './util/models';

export type MazeAppProps = {
    presenter: MazeAppPresenter,
}

function MazeApp({ presenter }: MazeAppProps) {

    const [maze, setMaze] = useState<Maze>(presenter.defaultMaze);

    return (
        <div className='container'>
            <button onClick={() =>
                setMaze(presenter.getRandomMaze())}>Get new maze</button>
            <EditableMaze maze={maze} />
        </div>
    )
}

export default MazeApp
