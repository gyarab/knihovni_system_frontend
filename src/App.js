import React, {Component} from 'react';
import BookRouter from "./BookRouter";
import {Provider} from "react-redux";
import {store} from "./store";
import './App.css'

class App extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <Provider store={store}>
                <div className='App'>
                    <BookRouter/>
                </div>
            </Provider>
        );
    }
}

export default App;


