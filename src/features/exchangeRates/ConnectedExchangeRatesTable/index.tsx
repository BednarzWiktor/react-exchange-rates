import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { 
    selectExchangeRatesTableRows,
    selectIsExchangeRatesIsFetched
} from '../../../redux/selectors/exchangeRates';
import {
    fetchExchangeRates,
    updateSearchConfig
} from '../../../redux/methods/exchangeRates';

import ExchangeRatesTable from '../../../components/ExchangeRatesTable';

const ConnectedExchangeRatesTable = ({
    baseCurrency,
    isLoading,
    isFetched,
    exchangeRatesTableRows,
    fetchExchangeRates,
    updateSearchConfig
}: any) => {
    useEffect(() => {
        if (!isFetched) {
            fetchExchangeRates(baseCurrency);
        }
    }, []); //eslint-disable-line

    const viewHistory = (currency: string): void => {
        updateSearchConfig({ targetCurrency: currency });
    };

    return (
        <ExchangeRatesTable
            rows={exchangeRatesTableRows}
            isLoading={isLoading}
            viewHistory={viewHistory}
        />
    );
};

const mapStateToProps = (state: any) => ({
    baseCurrency: state.exchangeRates.baseCurrency,
    exchangeRatesTableRows: selectExchangeRatesTableRows(state),
    isLoading: state.exchangeRates.isLoading.exchangeRates,
    isFetched: selectIsExchangeRatesIsFetched(state)
});

const mapDispatch = {
    fetchExchangeRates,
    updateSearchConfig
};

export default connect(mapStateToProps, mapDispatch)(ConnectedExchangeRatesTable);