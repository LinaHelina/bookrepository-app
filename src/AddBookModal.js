import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class AddBookModal extends Component{
    constructor(props){
        super(props);
        this.state={categories:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anon.png";
    imagesrc = process.env.REACT_APP_COVERPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'catalog')
        .then(response=>response.json())
        .then(data=>{
            this.setState({categories:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'book',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Title:event.target.Title.value,
                Author:event.target.Author.value,
                Category:event.target.Category.value,
                PublicationDate:event.target.PublicationDate.value,
                Language:event.target.Language.value,
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


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'book/SaveFile',{
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
            Add Book
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="Title">
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control type="text" name="Title" required 
                        placeholder="Title"/>
                    </Form.Group>

                    <Form.Group controlId="Author">
                        <Form.Label>Book Author</Form.Label>
                        <Form.Control type="text" name="Author" required 
                        placeholder="Author"/>
                    </Form.Group>

                    <Form.Group controlId="Category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select">
                        {this.state.categories.map(category=>
                            <option key={category.CategoryId}>{category.CategoryName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="PublicationDate">
                        <Form.Label>Publication Date</Form.Label>
                        <Form.Control 
                        type="date"
                        name="PublicationDate"
                        required
                        placeholder="PublicationDate"
                        />
                       
                        
                    </Form.Group>

                    <Form.Group controlId="Language">
                        <Form.Label>Book Language</Form.Label>
                        <Form.Control type="text" name="Language" required 
                        placeholder="Language"/>
                    </Form.Group>                    

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Add Book
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" src={this.imagesrc}/>
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