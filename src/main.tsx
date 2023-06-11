import React from 'react';
import ReactDOM from 'react-dom/client';
import MazeApp, { MazeAppProps } from './MazeApp.tsx';
import { MazeGenerator } from './maze/maze_generator.ts';
import { MazeAppPresenter } from './maze_app_presenter.ts';
import { EditableMazePresenterFactory } from './editable_maze/editable_maze_presenter.ts';
import { MazeConverter } from './maze/maze_converter.ts';
import { seedableRandomIntGenerator } from './util/random.ts';

function installDeps(): MazeAppProps {
    const mazeGenerator = new MazeGenerator(seedableRandomIntGenerator);
    const mazeConverter = new MazeConverter();
    const editableMazePresenterFactory = new EditableMazePresenterFactory(mazeConverter);
    const presenter = new MazeAppPresenter(
        mazeGenerator,
        mazeConverter,
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
