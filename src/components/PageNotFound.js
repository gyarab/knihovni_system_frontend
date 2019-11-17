import React, {Component} from 'react';
import '../styles/404.css'
import {Link} from "react-router-dom";


class PageNotFound extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    render() {
        return (
            <div className='pnfWrap'>
                <span>Whoops! 404!</span>
                <Link to="/dashboard"> You can return to your dashboard via the navigation bar,
                    or simply by clicking here.</Link>
            </div>
        );
    }
}

export default PageNotFound;
