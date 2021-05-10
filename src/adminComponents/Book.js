import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddBookModal} from './AddBookModal';
import {EditBookModal} from './EditBookModal';

export class Book extends Component{

    constructor(props){
        super(props);
        this.state={books:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'book')
        .then(response=>response.json())
        .then(data=>{
            this.setState({books:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }


    deleteBook(bookid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'book/'+bookid,{
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
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>BookId</th>
                        <th>Book Title</th>
                        <th>Book Author</th>
                        <th>Book Category</th>
                        <th>Book Publication Date</th>
                        <th>Book Language</th>
                        <th>Book Сover</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map(book=>
                            <tr key={book.BookId}>
                                <td>{book.BookId}</td>
                                <td>{book.BookTitle}</td>
                                <td>{book.BookAuthor}</td>
                                <td>{book.BookCategory}</td>
                                <td>{book.BookPublicationDate}</td>
                                <td>{book.BookLanguage}</td>
                                <td>{book.BookCover}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        bookId:book.BookId,bookTitle:book.BookTitle,bookAuthor:book.BookAuthor,
        bookCategory:book.BookCategory,bookPD:book.BookPublicationDate,bookLan:book.BookLanguage,bookCover:book.BookCover})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteBook(book.BookId)}>
            Delete
        </Button>

        <EditBookModal show={this.state.editModalShow}
        onHide={editModalClose}
        bookId={bookId}
        bookTitle={bookTitle}
        bookAuthor={bookAuthor}
        bookCategory={bookCategory}
        bookPD={bookPD}
        bookLan={bookLan}
        bookCover={bookCover}
        />

        
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>
                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Book</Button>

                    <AddBookModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}