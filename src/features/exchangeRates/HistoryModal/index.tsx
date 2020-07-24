import React, { useState, useEffect } from 'react';

import clsx from 'clsx';
import { connect } from 'react-redux';
import { selectRateHistorySummary } from '../../../redux/selectors/exchangeRates';
import {
    updateSearchConfig,
    fetchRateHistory,
    clearRateHistory
} from '../../../redux/methods/exchangeRates';

import {
    Container,
    Button,
    Paper,
    Typography,
    CircularProgress
} from '@material-ui/core';
import { Search, ArrowRight } from '@material-ui/icons';

import Modal from '../../../components/Modal';
import DateSelect from '../../../components/DateSelect';
import ProgressionIcon from '../../../components/ProgressionIcon';

import styles from './index.module.scss';

const HistoryModal = ({
    baseCurrency,
    rateHistory,
    targetCurrency,
    dateFrom,
    dateTo,
    historySummary,
    isLoading,
    fetchRateHistory,
    clearRateHistory,
    updateSearchConfig,
}: any) => {
    const [ cachedDateFrom, setCachedDateFrom ] = useState<Date>(new Date(dateFrom));
    const [ cachedDateTo, setCachedDateTo ] = useState<Date>(new Date(dateTo));
    const [ cachedTargetCurrency, setCachedTargetCurrency ] = useState<string>(targetCurrency || '');

    useEffect(() => {
        if (targetCurrency) {
            fetchRateHistory({ targetCurrency, dateFrom, dateTo }, baseCurrency);
            setCachedTargetCurrency(targetCurrency);
        }
    }, [ targetCurrency ]); // eslint-disable-line

    const handleClose = () => {
        updateSearchConfig({ targetCurrency: null });
        clearRateHistory();
    };

    const setDateFrom = (date: Date): void => {
        setCachedDateFrom(date);
    };

    const setDateTo = (date: Date): void => {
        setCachedDateTo(date);
    };

    const handleSearchRateHistory = () => {
        fetchRateHistory({
            targetCurrency, 
            dateFrom: cachedDateFrom, 
            dateTo: cachedDateTo
        }, baseCurrency);
    };

    const isSearchActionBlocked =
        isNaN(cachedDateFrom.getTime())
        || isNaN(cachedDateTo.getTime())
        || cachedDateTo.getTime() < cachedDateFrom.getTime()
        || cachedDateTo.getTime() > new Date().getTime()
    ;

    return (
        <Modal
            label="exchange rate history modal"
            description="shows detailed history of currency exchange rate"
            isOpen={targetCurrency ? true : false}
            close={handleClose}
        >
            <Container>
                <header className={styles.header}>
                    <span className={styles.title}>
                        <Typography noWrap variant="h6" component="span">
                            Rate history for:
                        </Typography>
                        <span className={styles.titleAdorment}>
                            <span className={styles.option}>
                                <div className={clsx(`currency-flag currency-flag-${baseCurrency.toLowerCase()}`, styles.flag)}/>
                                <span>{baseCurrency}</span>
                            </span>
                            <ArrowRight />
                            <span className={styles.option}>
                                <div className={clsx(`currency-flag currency-flag-${cachedTargetCurrency.toLowerCase()}`, styles.flag)}/>
                                <span>{cachedTargetCurrency}</span>
                            </span>
                        </span>
                    </span>
                    <span className={styles.controls}>
                        <span className={styles.input}>
                            <DateSelect
                                label="Starting Date"
                                maxDate={cachedDateTo || new Date()}
                                selectedDate={cachedDateFrom}
                                setSelectedDate={setDateFrom}
                            />
                        </span>
                        <span className={styles.input}>
                            <DateSelect
                                label="Ending Date"
                                minDate={cachedDateFrom}
                                maxDate={new Date()}
                                selectedDate={cachedDateTo}
                                setSelectedDate={setDateTo}
                            />
                        </span>
                        <span className={styles.button}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<Search />}
                                disabled={isSearchActionBlocked}
                                onClick={handleSearchRateHistory}
                            >
                                Search
                            </Button>
                        </span>
                    </span>
                </header>
                <Paper elevation={3}>
                    <main className={styles.main}>
                        {
                            historySummary ? (
                                <>
                                    <span className={styles.dates}>
                                        <Typography variant="body2" component="span">
                                            <strong>Opening rate</strong>
                                            {` (${historySummary.earliest.date}): ${historySummary.earliest.rate}`}
                                        </Typography>
                                        <Typography variant="body2" component="span">
                                            <strong>Closing rate</strong>
                                            {` (${historySummary.oldest.date}): ${historySummary.oldest.rate}`}
                                        </Typography>
                                    </span>
                                    <span className={styles.progression}>
                                        <Typography variant="h6" component="span">
                                            {historySummary.progression}
                                        </Typography>
                                        <ProgressionIcon progression={historySummary.progression}/>
                                    </span>
                                </>
                            ) : isLoading
                                ? (
                                    <CircularProgress />
                                ) : rateHistory.length > 0 && (
                                    <Typography variant="body2" component="span">
                                        Not enough data to calculate rate progression for given date range.
                                    </Typography>
                                )
                        }
                        
                    </main>
                </Paper>
            </Container>
        </Modal>
    )
};

const mapStateToProps = (state: any) => ({
    baseCurrency: state.exchangeRates.baseCurrency,
    targetCurrency: state.exchangeRates.rateHistorySearchConfig.targetCurrency,
    dateFrom: state.exchangeRates.rateHistorySearchConfig.dateFrom,
    dateTo: state.exchangeRates.rateHistorySearchConfig.dateTo,
    historySummary: selectRateHistorySummary(state),
    isLoading: state.exchangeRates.isLoading.rateHistory,
    rateHistory: state.exchangeRates.result.rateHistory
});

const mapDispatch = {
    updateSearchConfig,
    fetchRateHistory,
    clearRateHistory
};

export default connect(mapStateToProps, mapDispatch)(HistoryModal);