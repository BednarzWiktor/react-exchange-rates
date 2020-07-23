import React from "react";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";

import { Container } from '@material-ui/core';

import ConnectedExchangeRatesTable from './features/exchangeRates/ConnectedExchangeRatesTable';
import Controls from './features/exchangeRates/Controls';

import 'currency-flags/dist/currency-flags.css';

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Container>
					<Controls />
					<ConnectedExchangeRatesTable />
				</Container>
			</PersistGate>
		</Provider>
	);
};

export default App;
