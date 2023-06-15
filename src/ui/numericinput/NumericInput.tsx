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

    const isEmptyOrNumber = (v: string) => v === '' || Number(v) !== undefined;
    const isValidInput = (n?: number) => n && n >= min && n <= max;

    return (
        <input className={isValidInput(Number(value)) ? '' : 'invalid'}
            type='text' value={value} min={min} max={max}
            onChange={(e) => {
                const v = e.target.value;
                if (isEmptyOrNumber(v)) {
                    setValue(v || '');
                }
                const n = Number(v);
                if (isValidInput(n)) {
                    onChange(n);
                }
            }}
        />
    );
}