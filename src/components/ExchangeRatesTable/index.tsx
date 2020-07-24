import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress
} from '@material-ui/core';

import styles from './index.module.scss';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        height: '70vh',
    },
});

const ExchangeRatesTable = ({
    rows,
    isLoading
}: any) => {
    const classes = useStyles();
    
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows.map((row: any) => (
                                        <TableRow key={row.currency}>
                                            <TableCell component="th" scope="row">
                                                <span className={styles.option}>
                                                    <div className={clsx(`currency-flag currency-flag-${row.currency.toLowerCase()}`, styles.flag)}/>
                                                    <span>{row.currency}</span>
                                                </span>
                                            </TableCell>
                                            <TableCell align="right">{row.rate}</TableCell>
                                            <TableCell align="right">{row.value}</TableCell>
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