import * as React from 'react';
import { Route } from 'react-router';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './components/Layout';
import Home from './views/Home';
import Reports from './views/Reports';
import Audits from './views/Audits';

import MomentUtils from '@date-io/moment';
import moment from "moment";
import "moment/locale/pt-br";
import './custom.css'
// moment.locale("pt-br");

export default () => (
    <React.Fragment>
        <CssBaseline />
        <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/reports' component={Reports} />
                <Route path='/audits' component={Audits} />
            </Layout>
        </MuiPickersUtilsProvider>
    </React.Fragment>
);
