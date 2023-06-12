import { useCallback, useState } from "react";
import './EditableBorder.css';
import { EditableBorderPresenter } from "./editable_border_presenter";

const BACKGROUND_COLOR = 'hsl(264.12, 100%, 61.96%)';

type EditableBorderProps = {
    presenter: EditableBorderPresenter,
    scale: number,
    strokeWidth: number,
}

export function EditableBorder({
    presenter,
    scale,
    strokeWidth,
}: EditableBorderProps) {

    const [open, setOpen] = useState(presenter.isOpen());

    const onClick = useCallback(() => {
        presenter.onClick();
        setOpen(!open);
    }, [open, setOpen]);

    const border = presenter.getBorder(scale);

    const Background = () => {
        const fill = open ? 'transparent' : BACKGROUND_COLOR;

        if (border.background.type === 'RECT') {
            const { x, y, width, height } = border.background.rect;
            return (
                <rect x={x} y={y} width={width} height={height}
                    opacity={.5} fill={fill} />
            )
        }

        return (
            <path d={border.background.d} opacity={.5} fill={fill} />
        )
    }

    const BorderWall = () => {
        if (open || !border) {
            return null;
        }
        return (
            <path d={border.wallPath}
                stroke='white'
                strokeLinejoin='miter'
                strokeWidth={strokeWidth}
                strokeLinecap='square'
            />
        )
    };

    return (
        <g className={`border ${open ? 'exit' : 'wall'}`} onClick={onClick}>
            <Background />
            <BorderWall />
        </g>
    )
}
