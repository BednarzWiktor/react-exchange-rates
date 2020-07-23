import React, { useState, SyntheticEvent } from 'react';

import clsx from 'clsx';

import { TextField} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import styles from './index.module.scss';

interface Props {
    value: string,
    setValue: Function,
    options: Array<string>,
    label: string,
    disableClearable?: boolean
}

const SearchableSelect = ({
    value,
    setValue,
    options,
    label,
    disableClearable
}: Props) => {
    const [ inputValue, setInputValue ] = useState<string>(value);

    const handleSetValue = (event: SyntheticEvent<EventTarget>, newValue: any): void => {
        setValue(newValue);
    };

    const handleOnChangeInputValue = (event: SyntheticEvent<EventTarget>, newInputValue: string): void => {
        setInputValue(newInputValue);
    };

    return (
        <Autocomplete
            disableClearable={disableClearable}
            value={value}
            onChange={handleSetValue}
            inputValue={inputValue}
            onInputChange={handleOnChangeInputValue}
            options={options}
            clearOnBlur={false}
            renderInput={
                props =>
                    <TextField
                        {...props}
                        label={label}
                        InputProps={{
                            ...props.InputProps,
                            startAdornment: <div className={clsx(`currency-flag currency-flag-${value.toLowerCase()}`, styles.flag)}/>
                        }}
                    />
            }
            renderOption={
                option =>
                    <span className={styles.option}>
                        <div className={clsx(`currency-flag currency-flag-${option.toLowerCase()}`, styles.flag)}/>
                        <span>{option}</span>
                    </span>
            }
        />
    );
};

export default SearchableSelect;