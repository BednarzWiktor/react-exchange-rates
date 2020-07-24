import { CurrenciesEnum } from '../enums';

export interface IExchangeRatesLatestArgs {
    base?: CurrenciesEnum,
    symbols?: CurrenciesEnum | null | undefined,
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