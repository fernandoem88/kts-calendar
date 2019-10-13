import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { combinedReducers } from 'Reducers/combined-reducers';
import './index.css';
import AppCalendar from 'App/AppCalendar';
// import { IStoreSignature } from 'Reducers/interfaces';

// const w: any = window;
// const enhancer = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const initialStoreState: IStoreSignature = {
//     calendarView: 'month',
//     calendarReferenceDate: new Date()
// };

// const store = createStore(
//     combinedReducers,
//     initialStoreState,
//     enhancer(applyMiddleware(thunk))
// );
ReactDOM.render(
    // <BrowserRouter basename="/kts-calendar">
    <AppCalendar />,
    // </BrowserRouter>,
    document.getElementById('root') as HTMLElement
);
