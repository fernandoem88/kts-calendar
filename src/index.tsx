import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { combinedReducers } from 'Reducers/combined-reducers';
import './index.less';
import { Routes } from './routes';
import axios from 'axios';
import { API_URL } from 'Common/constants';
import { IStoreSignature } from 'Reducers/interfaces';

axios.defaults.baseURL = API_URL;

const w: any = window;
const enhancer = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialStoreState: IStoreSignature = {
    calendarView: 'month',
    calendarReferenceDate: new Date()
};

const store = createStore(
    combinedReducers,
    initialStoreState,
    enhancer(applyMiddleware(thunk))
);
ReactDOM.render(
    <BrowserRouter basename="/">
        <Provider store={store}>
            <Routes />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root') as HTMLElement
);
