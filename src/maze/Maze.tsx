import { useEffect, useRef } from 'react'
import { MazePresenter } from './maze_presenter';

type Point = {
    x: number,
    y: number,
}

type MazeProps = {
    presenter: MazePresenter,
}

function Maze({ presenter }: MazeProps) {
    const { canvasSize, size, cells } = presenter;
    const cellSize = Math.floor(canvasSize / size);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return;
        }
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        ctx.strokeStyle = '#AAA';
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, canvasSize, canvasSize);

        ctx.lineWidth = 2;
        cells.forEach(cell => {
            const x = cell.x * cellSize;
            const y = cell.y * cellSize;
            const tl = { x, y };
            const tr = { x: x + cellSize, y };
            const bl = { x, y: y + cellSize };
            const br = { x: x + cellSize, y: y + cellSize };
            if (cell.walls[0]) {
                drawLine(ctx, tl, bl);
            }
            if (cell.walls[1]) {
                drawLine(ctx, tl, tr);
            }
            if (cell.walls[2]) {
                drawLine(ctx, tr, br);
            }
            if (cell.walls[3]) {
                drawLine(ctx, bl, br);
            }
        })

    }, [])

    return (
        <canvas width={canvasSize} height={canvasSize} ref={canvasRef} />
    )
}

function drawLine(ctx: CanvasRenderingContext2D, from: Point, to: Point) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
}

export default Maze
