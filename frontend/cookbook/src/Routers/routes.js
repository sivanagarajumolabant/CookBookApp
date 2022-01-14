import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route, Router, Routes } from 'react-router-dom'

import SignIn from '../Auth/Login';
import SignUp from '../Auth/Signup';
import ClippedDrawer from '../Components/header';
import Home from '../Features/Home';
import CreateFeature from '../Features/Modules/CreateFeature';


const Routing = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/register" component={SignUp} />
                <Route exact path="/dashboard" component={Home} />
                <Route exact path="/CreateModule" component={CreateFeature} />
                

            </Switch>

        </BrowserRouter>



    )
}

export default Routing