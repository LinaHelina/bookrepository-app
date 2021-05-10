import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddCatModal} from './AddCatModal';
import {EditCatModal} from './EditCatModal';


export class Category extends Component{

    constructor(props){
        super(props);
        this.state={categories:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'catalog')
        .then(response=>response.json())
        .then(data=>{
            this.setState({categories:data});
        });
        
    }

    componentDidMount(){
        this.refreshList();
    }



    deleteCategory(categoryId){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'catalog/'+categoryId,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }

    render(){
        const {categories, categoryId,categoryName}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>CategoryId</th>
                        <th>CategoryName</th>
                        <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category=>
                            <tr key={category.CategoryId}>
                                <td>{category.CategoryId}</td>
                                <td>{category.CategoryName}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        categoryId:category.CategoryId,categoryName:category.CategoryName})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteCategory(category.CategoryId)}>
            Delete
        </Button>

        <EditCatModal show={this.state.editModalShow}
        onHide={editModalClose}
        categoryId={categoryId}
        categoryName={categoryName}/>

      
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Category</Button>

                    <AddCatModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}