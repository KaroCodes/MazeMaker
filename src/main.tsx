import React from 'react'
import ReactDOM from 'react-dom/client'
import MazeApp from './MazeApp.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <MazeApp />
    </React.StrictMode>,
)
