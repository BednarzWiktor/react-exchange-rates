import { CurrenciesEnum } from '../../enums';
import {
    ISliceState,
    ISetBaseCurrencyAction,
    IUpdateRateHistorySearchConfigAction,
    ISetAmountAction,
    ISetIsLoadingByTargetAction,
    ISetResultExchangeRatesAction,
    ISetResultRateHistoryAction
} from '../../types/features/searchConfig';

import { createSlice } from '@reduxjs/toolkit';

export const initialState: ISliceState = {
    baseCurrency: CurrenciesEnum.EUR,
    rateHistorySearchConfig: {
        dateFrom: ( d => new Date(d.setDate(d.getDate()-1)) )(new Date()),
        dateTo: new Date(),
        targetCurrency: null,
    },
    amount: 1.00,
    result: {
        exchangeRates: [],
        rateHistory: []
    },
    isLoading: {
        exchangeRates: false,
        rateHistory: false
    },
};

const exchangeRates = createSlice({
    name: 'exchangeRates',
    initialState,
    reducers: {
        setBaseCurrency(state, action) {
            const { baseCurrency }: ISetBaseCurrencyAction = action.payload;

            state.baseCurrency = baseCurrency;
        },
        updateRateHistorySearchConfig(state, action) {
            const rateHistorySearchConfig: IUpdateRateHistorySearchConfigAction = action.payload;

            state.rateHistorySearchConfig = {
                ...state.rateHistorySearchConfig,
                ...rateHistorySearchConfig
            };
        },
        setAmount(state, action) {
            const { amount }: ISetAmountAction = action.payload;

            state.amount = amount
        },
        setResultExchangeRates(state, action) {
            const { resultExchangeRates }: ISetResultExchangeRatesAction = action.payload;

            state.result.exchangeRates = resultExchangeRates;
        },
        setResultRateHistory(state, action) {
            const { resultRateHistory }: ISetResultRateHistoryAction = action.payload;

            state.result.rateHistory = resultRateHistory;
        },
        setIsLoadingByTarget(state, action) {
            const { target, isLoading }: ISetIsLoadingByTargetAction = action.payload;

            state.isLoading[target] = isLoading;
        }
    }
});

export const {
    setBaseCurrency,
    setAmount,
    updateRateHistorySearchConfig,
    setResultExchangeRates,
    setResultRateHistory,
    setIsLoadingByTarget
} = exchangeRates.actions;

export default exchangeRates.reducer;