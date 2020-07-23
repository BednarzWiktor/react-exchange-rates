import { CurrenciesEnum } from '../enums';

export interface IExchangeRatesLatestArgs {
    base?: CurrenciesEnum,
    symbols?: Array<CurrenciesEnum>,
}

export interface IExchangeRatesLatestReturn {
    base: CurrenciesEnum,
    date: string,
    rates: object,
}

export interface IExchangeRatesHistoryArgs extends IExchangeRatesLatestArgs {
    dateStringifiedFrom?: string,
    dateStringifiedTo?: string,
}