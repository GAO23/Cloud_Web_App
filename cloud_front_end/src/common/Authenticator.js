import {LOGIN_ENDPOINT, STATUS_OK, LOGOUT_ENDPOINT, IS_LOGGINED_ENDPOINT, LOGGINED} from "./constants";
import display_error from "./DisplayError";


let account_enum = {
    STUDENT: "Student",
    ADMIN: "Admin"
}

class Authenticator{

    constructor() {
        this.username = "";
        this.account = "";
    }


    // for logging in users only
    async login(username, password){
        try{
            username = username.replace(/\s/g, '');
            let body = {username: username, password: password};
            let response = await fetch(
                LOGIN_ENDPOINT,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }
            );
            if(!response.ok) throw new Error(response.statusText);
            let response_json = await response.json();
            if(response_json.status !== STATUS_OK) throw new Error(response_json.error);
            this.authenticated = true;
            this.username = username;
        } catch (err) {
            display_error(err);
        }
    }

    // unimplemented
    async logout(){
        try{
            let response = await fetch(
                LOGOUT_ENDPOINT,
                {
                    method: 'POST',
                    credentials: 'include',
                    header:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            if(response.status != STATUS_OK) throw new Error(response.statusText);
            let response_json = await response.json();
            if (response_json.status !== STATUS_OK) throw new Error(response_json.error);
            this.authenticated = false;
            this.username = response_json.username;
        }catch (err) {
            display_error(err);
        }
    }

    async checkAlive(){
        try{
            let response =  await fetch(IS_LOGGINED_ENDPOINT,
                {
                    credentials : 'include',
                    method: 'GET'
                });
            if(!response.ok) throw new response.statusText;
            let response_json = await response.json();
            this.authenticated = (response_json.msg === LOGGINED);
            this.username = response_json.username;
        }catch (err) {
            display_error(err);
        }
    }

    isAuthenticated(){
        return this.authenticated;
    }

    getUserName(){
        return this.username;
    }

    getAccountType(){
        return this.account;
    }

    expiredSession(){
        this.username = "";
        this.account = "";
        this.authenticated = false;
    }
}

// exporting a new instance as singleton
export default new Authenticator();
export {account_enum as account_enum};