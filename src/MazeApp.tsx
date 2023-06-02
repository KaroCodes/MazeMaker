import { useState } from 'react';
import './MazeApp.css'
import MazeCanvas from './maze/MazeCanvas'
import MazeSVG from './maze/MazeSVG';
import { Maze } from './maze/maze'
import { MazeGenerator } from './maze/maze_generator';
import { MazePresenter } from './maze/maze_presenter'
import seedrandom from "seedrandom";

const randomIntGenerator = (seed: number) => {
    const srnd = seedrandom(`${seed}`);
    return (min: number, max: number) => Math.floor(srnd() * (max - min) + min);
}
const mazeGenerator = new MazeGenerator(randomIntGenerator);
const defaultMaze: Maze = mazeGenerator.generate({ seed: 1, size: 9 });

function MazeApp() {

    const [maze, setMaze] = useState<Maze>(defaultMaze);

    // const mazePresenter = new MazePresenter(maze);

    return (
        <div className='container'>
            <button onClick={() =>
                setMaze(mazeGenerator.generate({ seed: Math.random(), size: 9 })
                )}>Get new maze</button>
            {/* <MazeCanvas presenter={mazePresenter} /> */}
            <MazeSVG maze={maze} />
        </div>
    )
}

export default MazeApp
