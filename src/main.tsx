import React from 'react';
import ReactDOM from 'react-dom/client';
import MazeApp, { MazeAppProps } from './MazeApp.tsx';
import { MazeGenerator } from './util/maze_generator.ts';
import { MazeAppPresenter } from './maze_app_presenter.ts';
import seedrandom from "seedrandom";

function installDeps(): MazeAppProps {
    const randomIntGenerator = (seed: number) => {
        const srnd = seedrandom(`${seed}`);
        return (min: number, max: number) => Math.floor(srnd() * (max - min) + min);
    }
    const mazeGenerator = new MazeGenerator(randomIntGenerator);
    const presenter = new MazeAppPresenter(mazeGenerator);
    return { presenter }
}

const { presenter } = installDeps();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    < React.StrictMode >
        <MazeApp presenter={presenter} />
    </React.StrictMode >,
)
