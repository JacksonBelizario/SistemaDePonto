import * as React from 'react';
import { Route } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';

import Layout from './components/Layout';
import Home from './views/Home';
import Reports from './views/Reports';
import Audits from './views/Audits';

export default () => (
    <React.Fragment>
        <CssBaseline />
        <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/reports' component={Reports} />
            <Route path='/audits' component={Audits} />
        </Layout>
    </React.Fragment>
);
