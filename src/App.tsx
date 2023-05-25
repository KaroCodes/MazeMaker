import './App.css'
import Maze from './maze/Maze'
import { MazePresenter } from './maze/maze_presenter'

const mazePresenter = new MazePresenter(1024, 8);

function App() {

    return (
        <>
            <Maze presenter={mazePresenter} />
        </>
    )
}

export default App
