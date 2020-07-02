import React from 'react';
import Authenticator from "../common/Authenticator";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ProtectedRoute} from "../common/ProtectedRoute";
import {RootContext} from "../common/GlobaContext";
import Drive from "./drive";
import Signin from "./signin";

class Root extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            session_checked: false
        }
    }

    async componentDidMount() {
        try{
            await Authenticator.checkAlive();
            this.setState({session_checked: true});
        }catch (err) {
            console.log(err.stack);
            alert(err.message);
        }
    }
    render() {
        if(!this.state.session_checked) return null;
        return(
            <RootContext.Provider value={{...this.state}}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={'/signin'} render={(props)=> <Signin {...props} />}/>
                        <ProtectedRoute exact path={'/'} component={Drive} />
                    </Switch>
                </BrowserRouter>
            </RootContext.Provider>
        )
    }
}

export default Root;