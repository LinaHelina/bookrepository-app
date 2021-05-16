import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddBookModal} from './AddBookModal';
import {EditBookModal} from './EditBookModal';

export class Book extends Component{

    constructor(props){
        super(props);
        this.state={books:[], addModalShow:false, editModalShow:false, details:[], Category:null}
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
            });
        }
    }

    editBook(bookId){
        axios.get(process.env.REACT_APP_API+"catalog/"+bookId)
        .then(res => {
            this.setState({ details: res.data });
        })
        .catch(function (error) {
            console.log('Fetch error: ' + error.message);
        }); 
        
        this.setState({editModalShow:true, Category: this.state.details.Category});
        //this.setState({editModalShow:true,
        //    ProductId:this.state.book.ProductId,Title:this.state.book.ProductName,Author:this.state.book.ProductAuthor, Price: this.state.book.ProductPrice, Category: this.state.details.Category});
    }



    render(){
        const {books, ProductId, Title,Author, Price, Category, details}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        console.log(details,this.state.editModalShow);
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
                                <td>
                    <ButtonToolbar>

                    <Button className="mr-2" variant="info"
                    onClick={()=>this.editBook(book.ProductId)}>
            Edit
        </Button>
                    <Button className="mr-2" variant="danger"
                    onClick={()=>this.deleteBook(book.ProductId)}>
                        Delete
                        </Button>
                        <EditBookModal show={this.state.editModalShow}
                                onHide={editModalClose}
                                ProductId={details.ProductId}
                                Title={details.ProductName}
                                Author={book.ProductAuthor}
                                Price={details.Price}
                                Category={details.Category}
                                Publisher={details.Publisher}
                                ShortDescription={details.ShortDescription}
                                IsbnNumber={details.IsbnNumber}
                                Language={details.ProductLanguage}
                                PageAmount={details.PageAmount}
                                Price={book.ProductPrice}
                                ProductImage={details.ProductImage}
                                />

                    </ButtonToolbar>
                    </td>

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