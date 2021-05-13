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
        if (!this.state.user.email.includes('@')) {
            emailError = "* Invalid email";
        }
        if (!this.state.user.email) {
            emailError = "* Email cannot be blank";
        }
        if (!this.state.user.password) {
            passwordError = "* Password cannot be blank";
        }
        if (!this.state.user.password2) {
            password2Error = "* Password needs to be confirmed";
        }
        if ((this.state.user.password !== this.state.user.password2)) {
            password2Error = "* Password does not match!";
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
            newname: this.state.user.Fullname,
            newaddress1: this.state.user.Address,
            newemail: this.state.user.Email,
            newpassword: this.state.user.Password
        }
        const isValid = this.handleValidate();
        // check validation frontend first
        if (isValid) {
            axios.post(process.env.REACT_APP_API+'user/' + id + '/update/', userchange)
                .then(res => {
                    this.setState({ user: res });
                    this.props.history.push('/');
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
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a href data-target="#profile" data-toggle="tab" className="nav-link active">Profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href data-target="#messages" data-toggle="tab" className="nav-link">Messages</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href data-target="#edit" data-toggle="tab" className="nav-link">Update/Edit</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/history'>
                                            <button type="button" class="btn btn-success">Order History</button>
                                        </Link>
                                    </li>
                                    
                                </ul>
                                <div className="tab-content py-4 page-">
                                    <div className="tab-pane active" id="profile">
                                        <h5 className="mb-3"><b>Customer Profile</b></h5>
                                        <div className="row">
                                            <div className="col-md-6 page-header">
                                                <h6><b>Fullname:</b>{" "}{user.Fullname}</h6>
                                                <h6><b>Email:</b>{"    "}{user.Email}</h6>
                                                <h6><b>Address1:</b>{" "}{user.Address}</h6>
                                                <h6><b>City:</b>{"     "}{user.City}</h6>

                                                
                                            </div>
                                        </div>
                                        {/*/row*/}
                                    </div>
                                    <div className="tab-pane" id="messages">
                                        <div className="alert alert-info alert-dismissable">
                                            <a className="panel-close close" data-dismiss="alert">×</a> Congratulation! {user.Fullname}. You earned <strong>1149</strong> Points reward. You need <strong>4951</strong> more points to get redeem.
                                        </div>
                                        <table className="table table-hover table-striped">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <span className="float-right font-weight-bold">3 hrs ago</span> You got <strong>549</strong> points from your purchase!
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="float-right font-weight-bold">Yesterday</span> You got <strong>200</strong> points for Happy Day!
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="float-right font-weight-bold">9/10</span> You got <strong>50</strong> points from your lucky date!
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="float-right font-weight-bold">7/4</span> You got <strong>150</strong> points for July Four!
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="float-right font-weight-bold">5/4</span> You got <strong>200</strong> points from your purchase!
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane" id="edit">
                                        <form role="form">
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label form-control-label">Full Name</label>
                                                <div className="col-lg-9">
                                                    <input onChange={this.handleChange} name="fullname" className="form-control" type="text" value={user.Fullname} placeholder="Enter your fullname"/>
                                                </div>
                                            </div>
                                            
                                            
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label form-control-label">Address 1</label>
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
                                                <label className="col-lg-3 col-form-label form-control-label">Password</label>
                                                <div className="col-lg-9">
                                                    <input onChange={this.handleChange} name="password" className="form-control" type="password" value={user.Password} />
                                                    <div style={{ fontSize: 12, color: "red" }}>{this.state.passwordError}</div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label form-control-label">Confirm password</label>
                                                <div className="col-lg-9">
                                                    <input onChange={this.handleChange} name="password2" className="form-control" type="password" placeholder="Confrim your password" />
                                                    <div style={{ fontSize: 12, color: "red" }}>{this.state.password2Error}</div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-lg-3 col-form-label form-control-label" />
                                                <div className="col-lg-9">
                                                    <input type="reset" className="btn btn-secondary" defaultValue="Cancel" />
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
                                <h6 className="mt-2">Upload a different photo</h6>
                                <label className="custom-file">
                                    <input type="file" id="file" className="custom-file-input" />
                                    <span className="custom-file-control">Choose file</span>
                                </label>
                            </div>
                        </div>
                    </div>
                 
                    
                </div>
            );
        }
    }

}