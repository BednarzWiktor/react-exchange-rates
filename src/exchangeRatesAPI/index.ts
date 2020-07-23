import axios from 'axios';
import clsx from 'clsx';

import { constructGetLatestQuery, constructGetHistoryQuery } from '../utils';

import { IExchangeRatesLatestArgs, IExchangeRatesHistoryArgs } from '../types/global';

export const exchangeRatesAPI = () => {
    const baseUrl = 'https://api.exchangeratesapi.io';

    const getLatest = async (config: IExchangeRatesLatestArgs) => {
        const query = constructGetLatestQuery(config);
        const { data } = await axios.get(`${baseUrl}/latest${clsx(query)}`);
        return data;
    };

    const getHistory = async (config: IExchangeRatesHistoryArgs) => {
        const query = constructGetHistoryQuery(config);
        const { data } = await axios.get(`${baseUrl}/history${clsx(query)}`);
        return data;
    };

    return { getLatest, getHistory };
};