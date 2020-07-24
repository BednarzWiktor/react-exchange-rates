import { minBy, maxBy } from 'lodash';

import { IExchangeRatesLatestArgs, IExchangeRatesHistoryArgs } from '../types/global';
import { IExchangeRate, IExchangeRateRow, IEarliestOldestRates, IRateHistoryPoint } from '../types/features/searchConfig';

export const roundNumberToXDecimals = (num: number, decimals: number = 3): string =>
    num.toFixed(decimals)
;

export const adjustMonthOrDay = (monthOrDay: string): string =>
    monthOrDay.length < 2 ? `0${monthOrDay}` : monthOrDay
;

export const processDateToString = (inputDate: Date): string => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = adjustMonthOrDay(`${date.getMonth() + 1}`);
    const day = adjustMonthOrDay(`${date.getDate()}`);

    return [ year, month, day ].join('-');
};

export const joinEstablishedQueries = (
    establishedQueries: Array<string> | null
): string | null =>
    establishedQueries && establishedQueries.length > 0
        ? `?${establishedQueries.join('&')}`
        : null
; 

export const constructGetLatestQuery = ({
    base,
    symbols
}: IExchangeRatesLatestArgs): string | null => {
    const baseQuery = base && `base=${base}`;
    const symbolsQuery = symbols && `symbols=${symbols}`;
    const establishedQueries = [ baseQuery, symbolsQuery ]
        .filter(query => !!query) as Array<string>
    ;

    return joinEstablishedQueries(establishedQueries);
};

export const constructGetHistoryQuery = ({
    base,
    symbols,
    dateStringifiedFrom,
    dateStringifiedTo
}: IExchangeRatesHistoryArgs): string | null => {
    const baseQuery = base && `base=${base}`;
    const symbolsQuery = symbols && `symbols=${symbols}`;
    const startAtQuery = dateStringifiedFrom && `start_at=${dateStringifiedFrom}`;
    const endAtQuery = dateStringifiedTo && `end_at=${dateStringifiedTo}`;
    const establishedQueries = [ baseQuery, symbolsQuery, startAtQuery, endAtQuery ]
        .filter(query => !!query) as Array<string>
    ;

    return joinEstablishedQueries(establishedQueries);
};

export const translateExchangeRates = (rates: object): Array<any> =>
    Object.entries(rates).map(([ key, value ]) => ({ currency: key, rate: value }))
;

export const translateHistoryRates = (rates: object): Array<any> =>
    Object.entries(rates).map(([ key, value ]) => ({ date: key, rate: Object.values(value)[0] }))
;

export const generateTableRows = (exchangeRates: Array<IExchangeRate>, amount: number, baseCurrency: string): Array<IExchangeRateRow> =>
    exchangeRates
        .map(exchangeRate => ({
            ...exchangeRate,
            value: amount * exchangeRate.rate,
        }))
        .filter(exchangeRate => exchangeRate.currency !== baseCurrency)
;

export const getEarliestOrOldestRate = (exchangeRates: Array<IRateHistoryPoint>): IEarliestOldestRates | null => {
    if (exchangeRates.length <= 2) return null;

    const earliestRate = minBy(exchangeRates, 'date') as IRateHistoryPoint;
    const oldestRate = maxBy(exchangeRates, 'date') as IRateHistoryPoint;

    return {
        earliest: earliestRate,
        oldest: oldestRate
    };
};

export const getRateProgression = (earliestOldest: IEarliestOldestRates): string | null => {
    if (!earliestOldest) return null;

    const { earliest, oldest } = earliestOldest;
    if (earliest.rate === oldest.rate) return '0%';

    const prefix = earliest.rate > oldest.rate ? '-' : '';
    const progression = Math.abs(((earliest.rate - oldest.rate) / oldest.rate) * 100).toFixed(2);
    return `${prefix}${progression}%`;
}