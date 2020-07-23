import React from 'react';

import clsx from 'clsx';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@material-ui/core';

import styles from './index.module.scss';

const ExchangeRatesTable = ({
    rows,
    isLoading
}: any) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="exchange rates table">
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
        </TableContainer>
    );
};

export default ExchangeRatesTable;