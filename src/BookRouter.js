import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Auth from "./components/Auth";
import BookShelf from "./components/BookShelf";
import Navigation from "./components/Navigation";

class BookRouter extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <Router>
                <Route  path="/" component={Navigation} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/bookshelf" component={BookShelf}/>
            </Router>
        );
    }
}

export default BookRouter;
