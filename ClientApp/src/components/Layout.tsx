import * as React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import NavMenu from './NavMenu';

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <CssBaseline />
        <NavMenu/>
        <Container>
            {props.children}
        </Container>
    </React.Fragment>
);
