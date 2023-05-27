import './MazeApp.css'
import MazeCanvas from './maze/MazeCanvas'
import { Maze } from './maze/maze'
import { MazeGenerator } from './maze/maze_generator';
import { MazePresenter } from './maze/maze_presenter'
import seedrandom from "seedrandom";

function MazeApp() {

    const randomIntGenerator = (seed: number) => {
        const srnd = seedrandom(`${seed}`);
        return (min: number, max: number) => Math.floor(srnd() * (max - min) + min);
    }

    const mazeGenerator = new MazeGenerator(randomIntGenerator);

    const maze: Maze = mazeGenerator.generate({
        seed: Math.random(),
        size: 9,
        start: { x: 0, y: 0 },
        end: { x: 4, y: 4 }
    });

    const mazePresenter = new MazePresenter(maze);

    return (
        <>
            <MazeCanvas presenter={mazePresenter} />
        </>
    )
}

export default MazeApp
