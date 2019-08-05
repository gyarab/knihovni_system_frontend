import React, {Component} from 'react';
import '../styles/books.css'
import {connect} from "react-redux";
import { getAllBooks} from "../actionCreators/bookActions";

class Bookshelf extends Component {
    static defaultProps = {};

    static propTypes = {};

    state = {};

    componentDidMount() {
        this.props.getAllBooks()
    }

    books(){
        if(this.props.allBooks.length>0){
            return this.props.allBooks.map((item,index)=><h4 key={index}>{item.title}</h4>)
        }
    }

    render() {
        return (
            <div className="col-md-12 col-lg-8 offset-lg-2 shelfWrapper">
                <div style={{marginTop:'5px'}}>
                    {this.books()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    allBooks: state.books.all,
    errors: state.books.errs,
});
const mapDispatchToProps = (dispatch) => ({
    getAllBooks: () => {
        dispatch(getAllBooks())
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Bookshelf);

