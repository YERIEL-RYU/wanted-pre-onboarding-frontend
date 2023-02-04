import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from "react-router-dom";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reportWebVitals from './reportWebVitals';
import App from './App';
import reducer from './modules';

const store = createStore(reducer, applyMiddleware(thunk, logger))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter  basename="/wanted-pre-onboarding-frontend">
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
