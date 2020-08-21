import React from 'react';
import Authenticator from "../common/Authenticator";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ProtectedRoute} from "../common/ProtectedRoute";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import Drive from "./Drive";
import Signin from "./signin";

// theming the pages, use closely with styles
const theme = createMuiTheme({

});


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
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={'/signin'} render={(props)=> <Signin {...props} />}/>
                        <ProtectedRoute exact path={'/'} component={Drive} />
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        )
    }
}

export default Root;