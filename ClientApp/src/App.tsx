import * as React from 'react';
import { Route } from 'react-router';

import Layout from './components/Layout';
import Home from './views/Home';
import Reports from './views/Reports';
import Audits from './views/Audits';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/reports' component={Reports} />
        <Route path='/audits' component={Audits} />
    </Layout>
);
