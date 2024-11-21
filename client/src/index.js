import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from'react-redux'
import {configureStore,combineReducers} from '@reduxjs/toolkit'
import { rootReducer } from './redux/rootReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const finalState= combineReducers({
  rootReducer:rootReducer
})
const initialState = {
  rootReducer: {
    cartItem: localStorage.getItem('cartItem') 
      ? JSON.parse(localStorage.getItem('cartItem')) 
      : []
  }
};

const store = configureStore({
  reducer:finalState,
  preloadedState:initialState})
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
