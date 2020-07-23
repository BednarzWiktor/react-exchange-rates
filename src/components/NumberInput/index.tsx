import React, { SyntheticEvent } from 'react';

import { TextField } from '@material-ui/core';

interface Props {
    label: string,
    value: number,
    setValue: Function
}

const NumberInput = ({ label, value, setValue }: Props) => {
    const handleSetValue = (event: SyntheticEvent<EventTarget>): void => {
        const target = event.target as HTMLInputElement;
        setValue(target.value);
    };
    
    return (
        <TextField
            label={label}
            value={value}
            onChange={handleSetValue}
            id={"number-input"}
            type="number"
            InputProps={{ inputProps: { min: 0 }}}
        />
    );
};

export default NumberInput;