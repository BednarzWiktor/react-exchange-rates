import { createSelector } from '@reduxjs/toolkit';

import {
    generateTableRows,
    getEarliestOrOldestRate,
    getRateProgression
} from '../../../utils';

const selectBaseCurrency = (state: any) => state.exchangeRates.baseCurrency;
const selectResultExchangeRates = (state: any) => state.exchangeRates.result.exchangeRates;
const selectResultRateHistory = (state: any) => state.exchangeRates.result.rateHistory;
const selectAmount = (state: any) => state.exchangeRates.amount;

export const selectExchangeRatesTableRows = createSelector(
    selectResultExchangeRates,
    selectAmount,
    selectBaseCurrency,
    (resultExhangeRates, amount, baseCurrency) => generateTableRows(resultExhangeRates, amount, baseCurrency)
);

export const selectIsExchangeRatesIsFetched = createSelector(
    selectResultExchangeRates,
    resultExchangeRates => resultExchangeRates.length > 0 ? true : false
);

export const selectRateHistorySummary = createSelector(
    selectResultRateHistory,
    resultRateHistory => {
        const earliestAndOldest = getEarliestOrOldestRate(resultRateHistory);

        return earliestAndOldest ? {
            ...earliestAndOldest,
            progression: getRateProgression(earliestAndOldest)
        } : null;
    }
);