# react-exchange-rates
[live demo](https://bednarzwiktor.github.io/react-exchange-rates/)
##### Exchange Rate Tracker
Simple react application allowing to easily track the latest exchange rates, calculate the values between currencies and track exchange rate trend between dates of interrested. Application was written as a 48hrs constrained side-project, therefore it is not properly suited for production environment. 
Application written in **TypeScript** and bootstrapped with [material-ui](https://material-ui.com/). State managment constructed with [redux](https://redux-toolkit.js.org/) and data fetching done via [axios](https://github.com/axios/axios) HTTP client.

##### Installation:
```sh
$ git clone https://github.com/BednarzWiktor/react-exchange-rates
$ cd react-exchange-rates
$ yarn install
```
##### Startup:
yarn:
```sh
$ yarn run start
```
npm:
```sh
$ npm run start
```

### TO-DO's:
- Redesign Layout - even though application is usable on mobile displays, it would need some better styling or refactored solutions to achieve better UX
- Implement test-suites - to provide more stable maintenance and make the app production ready
- Tweak types - due to time constraints, some types were omitted with explicit `any` types
- Expand exchange rates history view by implementing charts