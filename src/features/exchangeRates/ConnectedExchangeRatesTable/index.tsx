import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { selectExchangeRatesTableRows } from '../../../redux/selectors/exchangeRates';
import { fetchExchangeRates } from '../../../redux/methods/exchangeRates';

import ExchangeRatesTable from '../../../components/ExchangeRatesTable';

const ConnectedExchangeRatesTable = ({
    baseCurrency,
    exchangeRatesTableRows,
    fetchExchangeRates
}: any) => {
    useEffect(() => {
        if (exchangeRatesTableRows.length === 0) {
            fetchExchangeRates(baseCurrency);
        }
    }, [])

    return (
        <ExchangeRatesTable
            rows={exchangeRatesTableRows}
        />
    );
};

const mapStateToProps = (state: any) => ({
    baseCurrency: state.exchangeRates.baseCurrency,
    exchangeRatesTableRows: selectExchangeRatesTableRows(state)
});

const mapDispatch = {
    fetchExchangeRates
};

export default connect(mapStateToProps, mapDispatch)(ConnectedExchangeRatesTable);