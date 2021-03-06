import decode from 'jwt-decode';
import axios from 'axios';

export default class AuthService {

    constructor() {
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
    }

    login(email, password) {

        return this.fetch(process.env.REACT_APP_API+'Authentification/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(response => {
            this.setToken(response.token); // set token in local storage
            this.setProfile(response.token);   // set profile for user login
            this.setCart(response.token); // set cart for user
            console.log(response.token);
            return Promise.resolve(response);
        })
    }

    loggedIn() {
        //check if there is a token and it's still alive
        const token = this.getToken() 
        return !!token && !this.isTokenExpired(token) 
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token); // decode token
            // check expired or not
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else return false;
        }
        catch (error) {
            return false;
        }
    }

    //save user toker to local storage
    setToken(idToken) {
        localStorage.setItem('id_token', idToken);
    }

    // get token from local storage
    getToken() {
        localStorage.getItem('id_token');
    }

    getRole(){
        if(this.loggedIn())
        return JSON.parse(localStorage.getItem('profile')).CustomerRole;
    }

    // delete token and profile data from local storage
    logout() {
        localStorage.removeItem('id_token');
    }

    // Saves profile data to localStorage
    setProfile(token) {
        localStorage.setItem('profile', JSON.stringify(decode(token)));
    }

    getUserId() {
        if(this.loggedIn())
        return JSON.parse(localStorage.getItem('profile')).CustomerId;
    }

    
    setCart(token) {
        //get user id from token
        const id = (decode(token)).CustomerId; console.log("test id", id);
        axios.get(process.env.REACT_APP_API+'user/'+id+'/cart') //get data from api
            .then(res => {
                console.log('cart from api', res.data); //test cart api
                if (res.status == 204) // if no content
                    //set cart as empty array after login if nothing in database
                    localStorage.setItem("cart", JSON.stringify([]));
                else
                    localStorage.setItem("cart", JSON.stringify(res.data));
            })    
    }
    

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            {
                console.log("login ok", response);
                return response
            }
        } else {
            // if status is not ok throw text error from response
            return response.text().then(text => { throw new Error(text).message })
        }
    }

}