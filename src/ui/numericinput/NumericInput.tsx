import { useEffect, useState } from 'react';
import './NumericInput.css';

type NumericInputProps = {
    onChange: (value: number) => void,
    min: number,
    max: number,
    value: number,
}

export function NumericInput({
    onChange,
    min,
    max,
    value: _value,
}: NumericInputProps) {

    const [value, setValue] = useState<string>(`${_value}`);

    useEffect(() => {
        setValue(`${_value}`);
    }, [_value]);

    const isValidNumericInput = (v: string) => /^(?:0|[1-9]\d*|)$/.test(v);
    const isValidInput = (n?: number) => n && n >= min && n <= max;

    return (
        <input className={isValidInput(Number(value)) ? '' : 'invalid'}
            type='text' value={value} min={min} max={max}
            onChange={(e) => {
                e.preventDefault();
                const v = e.target.value;
                if (isValidNumericInput(v)) {
                    setValue(v);
                }
                const n = Number(v);
                if (isValidInput(n)) {
                    onChange(n);
                }
            }}
        />
    );
}