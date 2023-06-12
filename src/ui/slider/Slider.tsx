import './Slider.css';

type SliderProps = {
    onChange: (value: number) => void,
    minValue: number,
    maxValue: number,
    defaultValue?: number,
}

export function Slider({
    onChange,
    minValue,
    maxValue,
    defaultValue,
}: SliderProps) {
    return (
        <div className='slider-container'>
            <span>{minValue}</span>
            <input className='slider' type='range'
                min={minValue} max={maxValue}
                defaultValue={defaultValue}
                onChange={(e) => {
                    const value = Number(e.target.value);
                    onChange(value);
                }} />
            <span>{maxValue}</span>
        </div>
    );
}