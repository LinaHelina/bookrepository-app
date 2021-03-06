import React, { Component } from 'react';
import AuthService from '../services/AuthentificationService';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import NotificationAlert from 'react-notification-alert';

var success = { place: 'tl', message: (<div>Update success!</div>), type: "success", icon: "now-ui-icons ui-1_bell-53", autoDismiss: 2 };
var unsuccess = { place: 'tl', message: (<div>Update unsuccess, please check again!</div>), type: "danger", icon: "now-ui-icons ui-1_bell-53", autoDismiss: 2 };

export class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {}, 
            isLogin: this.props.isLogin,
            visible: false,
            emailError: '',
            passwordError: '',
            password2Error: ''
        };
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    onShowAlert = () => {
        this.setState({ visible: true }, () => {
            window.setTimeout(() => {
                this.setState({ visible: false })
            }, 2000)
        });
    }

    noti() {
        const isValid = this.handleValidate();
        if (isValid)
            this.refs.notify.notificationAlert(success);
        else
            this.refs.notify.notificationAlert(unsuccess)
    }


    handleChange = (event) => {
        this.setState({
            user: { ...this.state.user, [event.target.name]: event.target.value}          
        })
    }

    handleValidate = () => {
        let emailError = "", passwordError = "", password2Error = "";
        if (!this.state.user.Email.includes('@')) {
            emailError = "* Invalid email";
        }
        if (!this.state.user.Email) {
            emailError = "* Email cannot be blank";
        }
        if (emailError || passwordError || password2Error) {
            this.setState({ emailError: emailError, passwordError: passwordError, password2Error: password2Error });
            return false;
        } else {
            this.setState({ emailError: "", passwordError: "", password2Error: "" });
            return true;
        }
    }

    handleUpdate = () => {
        const id = JSON.parse(localStorage.getItem("profile")).CustomerId;

        var userchange = {
            newname: this.state.user.fullname,
            newaddress1: this.state.user.address1,
            newemail: this.state.user.Email,
            newcity: this.state.user.city,
        }
        console.log(userchange);
        const isValid = this.handleValidate();
        if (isValid) {
            axios.post(process.env.REACT_APP_API+'user/' + id + '/update/', userchange)
                .then(res => {
                    this.setState({ user: res });
                    this.props.history.push('/account');
                });
            console.log("user now", this.state.user);
            console.log("profile will edit", userchange)
        }
    }
   

    componentDidMount() {

        if (this.state.isLogin == true) {
            const id = JSON.parse(localStorage.getItem("profile")).CustomerId;

        axios.get(process.env.REACT_APP_API+"user/" + id)
            .then(res => {
                this.setState({ user: res.data });
                this.setState({ user: { ...this.state.user, ["password2"]: "" } });
            })
            .catch(function (error) {
                console.log('Fetch error: ' + error.message);
            });
        }
    }



    render() {
        const user = this.state.user;
        if (this.state.isLogin == false) {
            return <div>Please login to see your account...</div>;
        } else {
            return (
                <div>
                    <NotificationAlert ref="notify" />
                    <Container>
                        <div className="page-header"><h1>YOUR ACCOUNT</h1></div>
                    </Container>
                    <div className="container">
                        <div className="row my-2">
                            <div className="col-lg-8 order-lg-2">
                                        <Link to='/history'>
                                            <button type="button" class="btn btn-success"  style={{backgroundColor:'#56baed'}}>Order History</button>
                                        </Link>
                                <hr></hr>
                                <div>
                                    
                                    <div className="tab-pane active" id="edit">

                                    <h5 className="mb-3"><b>Customer Profile</b></h5>
                                        <div className="row">
                                            <div className="col-md-4 page-header">
                                                <h6><b>Fullname:</b>{" "}{user.Fullname}</h6>
                                                <h6><b>Email:</b>{"    "}{user.Email}</h6>
                                                <h6><b>Address:</b>{" "}{user.Address}</h6>
                                                <h6><b>City:</b>{"     "}{user.City}</h6>                                                
                                            </div>
                                        </div>
                                        
                                        <h3>Edit your profile:</h3>
                                        <hr/>
                                        
                                        <form role="form">
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label form-control-label">Full Name</label>
                                                <div className="col-lg-9">
                                                    <input onChange={this.handleChange} name="fullname" className="form-control" type="text" value={this.state.user.Fullname} placeholder="Enter your fullname"/>
                                                </div>
                                            </div>
                                            
                                            
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label form-control-label">Address</label>
                                                <div className="col-lg-9">
                                                    <input onChange={this.handleChange} name="address1" className="form-control" type="text" value={user.Address} placeholder="Enter your address" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label form-control-label">City</label>
                                                <div className="col-lg-9">
                                                    <input onChange={this.handleChange} name="city" className="form-control" type="text" value={user.City} placeholder="Enter your city" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label form-control-label">Email</label>
                                                <div className="col-lg-9">
                                                    <input onChange={this.handleChange} name="email" className="form-control" type="email" value={user.Email}/>
                                                    <div style={{ fontSize: 12, color: "red" }}>{this.state.emailError}</div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label form-control-label" />
                                                <div className="col-lg-9">
                                                
                                                    <input onClick={() => { this.handleUpdate(); this.noti(); }} type="button" className="btn btn-primary" defaultValue="Save Changes" />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 order-lg-1 text-center">
                                <img src="https://cdn0.iconfinder.com/data/icons/management-1/100/business-05-512.png"
                                    className="mx-auto img-fluid img-circle d-block" alt="avatar" />
                            </div>
                        </div>
                    </div>
                 
                    
                </div>
            );
        }
    }

}