import './RoundingPicker.css';

type RoundingPickerProps = {
    setRoundWalls: (roundWalls: boolean) => void;
    roundWalls: boolean,
}

export function RoundingPicker({
    setRoundWalls,
    roundWalls,
}: RoundingPickerProps) {
    return (
        <div className='roundingPicker'>
            <div aria-label='square'
                className={'roundingChoice square' + (!roundWalls ? ' selected' : '')}
                onClick={() => setRoundWalls(false)} />
            <div aria-label='round'
                className={'roundingChoice round' + (roundWalls ? ' selected' : '')}
                onClick={() => setRoundWalls(true)} />
        </div>
    )
}