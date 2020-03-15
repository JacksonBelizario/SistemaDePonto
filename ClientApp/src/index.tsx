import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './utils/SnackbarUtils';

import MomentUtils from '@date-io/moment';
import moment from "moment";
import "moment/locale/pt-br";
import './custom.css'
// moment.locale("pt-br");

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history);

ReactDOM.render(
    <Provider store={store}>
        <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
            <ConnectedRouter history={history}>
                <SnackbarProvider maxSnack={3}>
                    <SnackbarUtilsConfigurator />
                    <App />
                </SnackbarProvider>
            </ConnectedRouter>
        </MuiPickersUtilsProvider>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
