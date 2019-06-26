import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "./components/Auth";

class BookRouter extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <Router>
                <Route exact path="/login" component={Auth} />
            </Router>
        );
    }
}

export default BookRouter;
