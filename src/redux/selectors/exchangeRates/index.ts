import { createSelector } from '@reduxjs/toolkit';

import { generateTableRows } from '../../../utils';

const selectResultExchangeRates = (state: any) => state.exchangeRates.result.exchangeRates;
const selectAmount = (state: any) => state.exchangeRates.amount;

export const selectExchangeRatesTableRows = createSelector(
    selectResultExchangeRates,
    selectAmount,
    (resultExhangeRates, amount) => generateTableRows(resultExhangeRates, amount)
);