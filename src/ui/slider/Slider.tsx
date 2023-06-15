import './Slider.css';

type SliderProps = {
    onChange: (value: number) => void,
    min: number,
    max: number,
    value?: number,
}

export function Slider({
    onChange,
    min,
    max,
    value,
}: SliderProps) {
    return (
        <div className='slider-container'>
            <span>{min}</span>
            <input className='slider' type='range'
                min={min} max={max} value={value}
                onChange={(e) => {
                    const value = Number(e.target.value);
                    onChange(value);
                }} />
            <span>{max}</span>
        </div>
    );
}