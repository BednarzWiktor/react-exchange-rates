import React from 'react';

import { connect } from 'react-redux';
import { fetchExchangeRates, changeAmount } from '../../../redux/methods/exchangeRates';

import { Paper } from '@material-ui/core';

import SearchableSelect from '../../../components/SearchableSelect';
import NumberInput from '../../../components/NumberInput';

import { CurrenciesEnum } from '../../../enums';

const Controls = ({
    baseCurrency,
    amount,
    fetchExchangeRates,
    changeAmount
}: any) => {
    const handleFetchExchangeRates = (baseCurrency: any): void => {
        fetchExchangeRates(baseCurrency);
    };

    const handleChangeAmount = (amount: any): void => {
        changeAmount(amount);
    };

    return (
        <Paper>
            <SearchableSelect
                value={baseCurrency}
                setValue={handleFetchExchangeRates}
                options={Object.values(CurrenciesEnum)}
                label="Base Currency"
                disableClearable
            />
            <NumberInput
                value={amount}
                setValue={handleChangeAmount}
                label="Amount"
            />
        </Paper>
    );
};

const mapStateToProps = (state: any) => ({
    baseCurrency: state.exchangeRates.baseCurrency,
    amount: state.exchangeRates.amount
});

const mapDispatch = {
    fetchExchangeRates,
    changeAmount
};

export default connect(mapStateToProps, mapDispatch)(Controls);