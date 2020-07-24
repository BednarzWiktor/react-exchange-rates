import { CurrenciesEnum } from '../../enums';

export interface IExchangeRate {
    currency: CurrenciesEnum,
    rate: number
}

export interface IRateHistoryPoint {
    date: Date,
    rate: number
}

interface IRateHistorySearchConfig {
    dateFrom: Date,
    dateTo: Date,
    targetCurrency: CurrenciesEnum | null
}

export interface IResult {
    exchangeRates: Array<IExchangeRate>,
    rateHistory: Array<IRateHistoryPoint>
}

export interface IIsLoading {
    exchangeRates: Boolean,
    rateHistory: Boolean
}

export interface ISliceState {
    baseCurrency: CurrenciesEnum,
    rateHistorySearchConfig: IRateHistorySearchConfig,
    amount: number,
    result: IResult,
    isLoading: IIsLoading,
}

export interface ISetBaseCurrencyAction {
    baseCurrency: CurrenciesEnum,
}

export interface IUpdateRateHistorySearchConfigAction {
    targetCurrency?: CurrenciesEnum | null,
    dateFrom?: Date,
    dateTo?: Date
}

export interface ISetAmountAction {
    amount: number
}

export interface ISetResultExchangeRatesAction {
    resultExchangeRates: Array<IExchangeRate>
}

export interface ISetResultRateHistoryAction {
    resultRateHistory: Array<IRateHistoryPoint>
}

export interface ISetIsLoadingByTargetAction {
    target: 'exchangeRates' | 'rateHistory',
    isLoading: Boolean
}

export interface IExchangeRateRow extends IExchangeRate {
    value: number
}

export interface IEarliestOldestRates {
    earliest: IRateHistoryPoint,
    oldest: IRateHistoryPoint
}