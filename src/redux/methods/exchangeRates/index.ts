import { Dispatch } from '@reduxjs/toolkit';

import { setBaseCurrency, setResultExchangeRates, setIsLoadingByTarget, setAmount } from '../../../features/exchangeRates/slice';

import { exchangeRatesAPI } from '../../../exchangeRatesAPI';
import { translateExchangeRates } from '../../../utils';

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