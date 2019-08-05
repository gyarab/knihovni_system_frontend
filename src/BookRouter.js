import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Bookshelf from "./components/Bookshelf";
import Navigation from "./components/Navigation";
import AddBook from "./components/AddBook";
import Errors from "./components/Errors";

class BookRouter extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <Router>
                <Route path="/" component={Navigation} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/bookshelf" component={Bookshelf}/>
                <Route exact path="/expand" component={AddBook}/>
                <Route path="/" component={Errors} />
            </Router>
        );
    }
}

export default BookRouter;
