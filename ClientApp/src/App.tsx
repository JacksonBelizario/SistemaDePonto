import * as React from 'react';
import { Route } from 'react-router';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Layout from './components/Layout';
import Home from './views/Home';
import Counter from './components/Counter';
import Reports from './components/Reports';
import moment from "moment";
import "moment/locale/pt-br";
import './custom.css'
// moment.locale("pt-br");

export default () => (
    <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/reports/:startDateIndex?' component={Reports} />
        </Layout>
    </MuiPickersUtilsProvider>
);
