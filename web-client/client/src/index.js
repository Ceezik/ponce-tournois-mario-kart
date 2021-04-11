import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import 'moment/locale/fr';
import './style.css';
import App from './App';
import store from './redux/store';
import { ErrorBoundary } from './components/utils/ErrorBoundary';

moment.locale('fr');

ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);
