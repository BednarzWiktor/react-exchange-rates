import { CurrenciesEnum } from '../../enums';

export interface IExchangeRate {
    currency: CurrenciesEnum,
    rate: number
}

export interface IRateHistoryPoint {
    x: Date,
    y: number
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