import React from 'react';
import ReactDOM from 'react-dom/client';
import MazeApp, { MazeAppProps } from './MazeApp.tsx';
import { MazeGenerator } from './util/maze_generator.ts';
import { MazeAppPresenter } from './maze_app_presenter.ts';
import seedrandom from "seedrandom";
import { EditableMazePresenterFactory } from './editable_maze/editable_maze_presenter.ts';
import { MazeConverter } from './util/maze_converter.ts';

function installDeps(): MazeAppProps {
    const randomIntGenerator = (seed: number) => {
        const srnd = seedrandom(`${seed}`);
        return (min: number, max: number) => Math.floor(srnd() * (max - min) + min);
    }
    const mazeGenerator = new MazeGenerator(randomIntGenerator);
    const editableMazePresenterFactory = new EditableMazePresenterFactory(new MazeConverter());
    const presenter = new MazeAppPresenter(
        mazeGenerator,
        editableMazePresenterFactory,
    );
    return { presenter }
}

const { presenter } = installDeps();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    < React.StrictMode >
        <MazeApp presenter={presenter} />
    </React.StrictMode >,
)
