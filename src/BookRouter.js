import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Auth from "./components/Auth";
import Navigation from "./components/Navigation";
import AddBook from "./components/AddBook";
import Errors from "./components/Errors";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";

class BookRouter extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <Router>
                <Route path="/" component={Navigation}/>
                <Route path="/" component={Errors}/>
                <Switch>
                    <Route exact path="/auth" component={Auth}/>
                    <Route exact path="/expand" component={AddBook}/>
                    <Route exact path="/dashboard" component={Dashboard}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/" component={() => <Redirect to="/dashboard"/>}/>
                    <Route path="/" component={() => <PageNotFound/>}/>
                </Switch>
            </Router>
        );
    }
}

export default BookRouter;
