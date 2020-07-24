import { Dispatch } from '@reduxjs/toolkit';

import {
    setBaseCurrency,
    setResultExchangeRates,
    setResultRateHistory,
    setIsLoadingByTarget,
    setAmount,
    updateRateHistorySearchConfig
} from '../../../features/exchangeRates/slice';

import { exchangeRatesAPI } from '../../../exchangeRatesAPI';
import {
    translateExchangeRates,
    processDateToString,
    translateHistoryRates 
} from '../../../utils';

import { IUpdateRateHistorySearchConfigAction } from '../../../types/features/searchConfig';
import { CurrenciesEnum } from '../../../enums';

const eRAPI = exchangeRatesAPI();

export const fetchExchangeRates = (baseCurrency: CurrenciesEnum) => async (dispatch: Dispatch) => {
    dispatch(setIsLoadingByTarget({ target: 'exchangeRates', isLoading: true }));

    const payload = await eRAPI.getLatest({ base: baseCurrency });

    if (payload) {
        const { rates, base } = payload;
        const translatedRates = translateExchangeRates(rates);

        dispatch(setBaseCurrency({ baseCurrency: base }));
        dispatch(setResultExchangeRates({ resultExchangeRates: translatedRates }));
    }

    dispatch(setIsLoadingByTarget({ target: 'exchangeRates', isLoading: false }));
};

export const changeAmount = (amount: number) => (dispatch: Dispatch) => {
    dispatch(setAmount({ amount: amount }));
};

export const updateSearchConfig = (config: IUpdateRateHistorySearchConfigAction) => (dispatch: Dispatch) => {
    dispatch(updateRateHistorySearchConfig(config));
};

export const fetchRateHistory = (config: IUpdateRateHistorySearchConfigAction, baseCurrency: CurrenciesEnum) => async (dispatch: Dispatch) => {
    dispatch(setIsLoadingByTarget({ target: 'rateHistory', isLoading: true }));

    const searchConfig = {
        dateStringifiedFrom: processDateToString(config.dateFrom!),
        dateStringifiedTo: processDateToString(config.dateTo!),
        symbols: config.targetCurrency,
        base: baseCurrency
    };

    const payload = await eRAPI.getHistory(searchConfig);

    if (payload) {
        const { rates } = payload;
        const translatedRates = translateHistoryRates(rates);

        dispatch(setResultRateHistory({ resultRateHistory: translatedRates }));
    }
    dispatch(setIsLoadingByTarget({ target: 'rateHistory', isLoading: false }));
};

export const clearRateHistory = () => (dispatch: Dispatch) => {
    dispatch(setResultRateHistory({ resultRateHistory: [] }));
}