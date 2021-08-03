import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createMemoryHistory } from 'history'


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const history = createMemoryHistory()


ReactDOM.render(
  <BrowserRouter history={history} >
    <App />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

