import React from 'react';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

interface Props {
    label: String,
    minDate?: Date,
    maxDate?: Date,
    selectedDate: Date,
    setSelectedDate: Function,
}

const DateSelect = ({
    label,
    minDate,
    maxDate,
    selectedDate,
    setSelectedDate
}: Props) => {
    const handleSetSelectedDate = (date: any): void => {
        setSelectedDate(date);
    };

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                minDate={minDate}
                maxDate={maxDate}
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker"
                label={label}
                value={selectedDate}
                onChange={handleSetSelectedDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    )
};

export default DateSelect;