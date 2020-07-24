import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { roundNumberToXDecimals } from '../../utils';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    IconButton
} from '@material-ui/core';
import TimelineIcon from '@material-ui/icons/Timeline';

import { IExchangeRateRow } from '../../types/features/searchConfig';

import styles from './index.module.scss';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        height: '70vh',
    },
});

interface Props {
    rows: Array<IExchangeRateRow>,
    isLoading: Boolean,
    viewHistory: Function
};

const ExchangeRatesTable = ({
    rows,
    isLoading,
    viewHistory
}: Props) => {
    const classes = useStyles();
    
    const handleViewHistory = (currency: string) => (): void => {
        viewHistory(currency);
    };

    return (
        <Paper className={classes.root} elevation={5}>
            <TableContainer className={classes.container}>
                { 
                    isLoading ? (
                        <div className={styles.spinner}>
                            <CircularProgress />
                        </div>
                    ) : (
                        <Table stickyHeader aria-label="exchange rates table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Currency</TableCell>
                                    <TableCell align="right">Exchange Rate</TableCell>
                                    <TableCell align="right">Value</TableCell>
                                    <TableCell align="right">History</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows.map((row: IExchangeRateRow) => (
                                        <TableRow key={row.currency}>
                                            <TableCell component="th" scope="row">
                                                <span className={styles.option}>
                                                    <div className={clsx(`currency-flag currency-flag-${row.currency.toLowerCase()}`, styles.flag)}/>
                                                    <span>{row.currency}</span>
                                                </span>
                                            </TableCell>
                                            <TableCell align="right">{row.rate}</TableCell>
                                            <TableCell align="right">{roundNumberToXDecimals(row.value)}</TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={handleViewHistory(row.currency)} aria-label="history" size="small">
                                                    <TimelineIcon color="primary"/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
        </Paper>
    );
};

export default ExchangeRatesTable;