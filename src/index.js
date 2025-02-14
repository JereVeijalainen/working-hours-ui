import React from 'react';
import { createRoot } from 'react-dom/client';
import './stylesheets/index.css';
import './stylesheets/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import AppRouter from './components/AppRouter';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AppRouter />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
