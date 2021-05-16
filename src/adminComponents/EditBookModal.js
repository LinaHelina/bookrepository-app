import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';
import axios from 'axios';

export class EditBookModal extends Component{
    constructor(props){
        super(props);
        this.state={details:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_COVERPATH+this.photofilename;

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Catalog',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                ProductId: event.target.ProductId.value,
                Title:event.target.Title.value,
                Author:event.target.Author.value,
                Category:event.target.Category.value,
                PublicationDate:event.target.PublicationDate.value,
                Language:event.target.Language.value,
                PageAmount:event.target.PageAmount.value,
                ISBN:event.target.ISBN.value,
                Publisher:event.target.Publisher.value,
                Price:event.target.Price.value,
                Description:event.target.Description.value,
                BookCover:this.photofilename,

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    componentDidMount()
    {
        axios.get(process.env.REACT_APP_API+"catalog/"+this.props.ProductId)
            .then(res => {
                this.setState({ details: res.data });
            })
            .catch(function (error) {
                console.log('Fetch error: ' + error.message);
            });     
            
    }


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Catalog/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_COVERPATH+result;
        },
        (error)=>{
            alert('Failed');
        })
        
    }

    render(){
        const {details}=this.state;
        
        console.log(details.result);
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit Book
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    
                <Form.Group controlId="ProductId">
                        <Form.Label>ProductId</Form.Label>
                        <Form.Control type="text" name="ProductId" required 
                        placeholder="ProductId"
                        disabled
                        defaultValue={this.props.ProductId}/>
                    </Form.Group>

                    <Form.Group controlId="Title">
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control type="text" name="Title" required 
                        defaultValue={this.props.Title}
                        placeholder="Title"/>
                    </Form.Group>

                    <Form.Group controlId="Author">
                        <Form.Label>Book Author</Form.Label>
                        <Form.Control type="text" name="Author" required 
                        defaultValue={this.props.Author}
                        placeholder="Author"/>
                    </Form.Group>

                    <Form.Group controlId="Category">
                        <Form.Label>Book Category</Form.Label>
                        <Form.Control type="text" name="Category" required
                        defaultValue={details.Category} 
                        placeholder="Category"/>
                    </Form.Group>

                    
                    <Form.Group controlId="Publisher">
                        <Form.Label>Book Publisher</Form.Label>
                        <Form.Control type="text" name="Publisher" required 
                        defaultValue={this.state.details.Publisher} 
                        placeholder="Publisher"/>
                    </Form.Group>

                    <Form.Group controlId="PublicationDate">
                        <Form.Label>Publication Date</Form.Label>
                        <Form.Control 
                        type="date"
                        name="PublicationDate"
                        required
                        placeholder="PublicationDate"
                        defaultValue={this.state.details.PublicationDate}
                        />
                    </Form.Group>

                    <Form.Group controlId="Description">
                        <Form.Label>Book Description</Form.Label>
                        <Form.Control type="textarea" name="Description" required 
                        defaultValue={this.state.details.ShortDescription}
                        placeholder="Description"/>
                    </Form.Group>   

                    <Form.Group controlId="Price">
                        <Form.Label>Book Price</Form.Label>
                        <Form.Control type="text" name="Price" required 
                        defaultValue={this.props.Price}
                        placeholder="Price"/>
                    </Form.Group>     

                    <Form.Group controlId="ISBN">
                        <Form.Label>Book ISBN</Form.Label>
                        <Form.Control type="text" name="ISBN" required 
                        defaultValue={this.state.details.IsbnNumber}
                        placeholder="ISBN"/>
                    </Form.Group>  

                    <Form.Group controlId="Language">
                        <Form.Label>Book Language</Form.Label>
                        <Form.Control type="text" name="Language" required 
                        defaultValue={this.state.details.ProductLanguage}
                        placeholder="Language"/>
                    </Form.Group> 

                    <Form.Group controlId="PageAmount">
                        <Form.Label>Book Page Amount</Form.Label>
                        <Form.Control type="text" name="PageAmount" required 
                         defaultValue={this.state.details.PageAmount}
                        placeholder="PageAmount"/>
                    </Form.Group> 

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Book
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" 
                 src={process.env.REACT_APP_COVERPATH+details.ProductImage}/>
                <input onChange={this.handleFileSelected} type="File"/>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}