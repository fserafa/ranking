import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import Ranking from './pages/Ranking';
import Login from './pages/Login';
import Inicio from './pages/Inicio';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/inicio" component={Inicio} />
                <Route path="/ranking" component={Ranking} />

                
            </Switch>
        </BrowserRouter>

    );
}

export default Routes; 