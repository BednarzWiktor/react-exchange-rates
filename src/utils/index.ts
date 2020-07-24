import { IExchangeRatesLatestArgs, IExchangeRatesHistoryArgs } from '../types/global';
import { IExchangeRate, IExchangeRateRow } from '../types/features/searchConfig';

export const adjustMonthOrDay = (monthOrDay: string): string =>
    monthOrDay.length < 2 ? `0${monthOrDay}` : monthOrDay
;

export const processDateToString = (date: Date): string => {
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

export const generateTableRows = (exchangeRates: Array<IExchangeRate>, amount: number): Array<IExchangeRateRow> =>
    exchangeRates.map(exchangeRate => ({
        ...exchangeRate,
        value: amount * exchangeRate.rate,
    }))
;