import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddBookModal} from './AddBookModal';
import {EditBookModal} from './EditBookModal';

export class Book extends Component{

    constructor(props){
        super(props);
        this.state={books:[], addModalShow:false, editModalShow:false}
    }

    componentDidMount(){

        axios.get(process.env.REACT_APP_API+"catalog/Products/")
            .then(res => {
                this.setState({ books: res.data });
            })
            .catch(function (error) {
                console.log('Fetch error: ' + error.message);
            });
        

    }

    
    deleteBook(bookid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'Catalog/'+bookid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }


    render(){
        const {books, bookId,bookTitle,bookAuthor,bookCategory,bookPD,bookLan,bookCover}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div style={{width:"80%", margin:'20px auto'}}>

                <div class="page-header">
                        <h1>ADMIN CRUD</h1>
                        </div>
                <Table className="mt-4" striped bordered hover size="sm" style={{width:"70%", margin:'20px auto'}}>
                    <thead>
                        <tr>
                            <th>BookId</th>
                        <th>Book Title</th>
                        <th>Book Price</th>
                        <th>Book Author</th>

                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book=>
                            <tr key={book.ProductId}>
                                <td>{book.ProductId}</td>
                                <td>{book.ProductName}</td>
                                <td>{book.ProductPrice}</td>
                                <td>{book.ProductAuthor}</td>
                                <ButtonToolbar>
                    <Button className="mr-2" variant="danger"
                    onClick={()=>this.deleteBook(book.ProductId)}>
                        Delete
                        </Button>

                    </ButtonToolbar>

                            </tr>)}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <Button variant='primary' style={{margin:'20px auto'}}
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Book</Button>

                    <AddBookModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}