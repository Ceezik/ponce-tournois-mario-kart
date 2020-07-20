import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import 'moment/locale/fr';
import './style.css';
import App from './App';

moment.locale('fr');

ReactDOM.render(<App />, document.getElementById('root'));
