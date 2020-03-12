import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './views/Home';
import Counter from './components/Counter';
import Reports from './components/Reports';

import './custom.css'

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/reports/:startDateIndex?' component={Reports} />
    </Layout>
);
