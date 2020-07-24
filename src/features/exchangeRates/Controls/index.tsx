import React from 'react';

import { connect } from 'react-redux';
import { fetchExchangeRates, changeAmount } from '../../../redux/methods/exchangeRates';

import { Paper } from '@material-ui/core';

import SearchableSelect from '../../../components/SearchableSelect';
import NumberInput from '../../../components/NumberInput';

import { CurrenciesEnum } from '../../../enums';

import styles from './index.module.scss';

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
        <Paper elevation={5}>
            <div className={styles.container}>
                <span className={styles.autocomplete}>
                    <SearchableSelect
                        value={baseCurrency}
                        setValue={handleFetchExchangeRates}
                        options={Object.values(CurrenciesEnum)}
                        label="Base Currency"
                        disableClearable
                    />
                </span>
                <span className={styles.number}>
                    <NumberInput
                        value={amount}
                        setValue={handleChangeAmount}
                        label="Amount"
                    />
                </span>
            </div>
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