import React from "react";
import {Route, Redirect} from 'react-router-dom';
import Authenticator from "./Authenticator";


export const ProtectedRoute = ({path, component: Component, ...rest}) => {
    const authenticated = Authenticator.isAuthenticated();
    return(
            <Route {...path} render={
                (props) => {
                    if(authenticated){
                        return <Component {...props} {...rest}/>
                    }else{
                        return <Redirect to={
                            {
                                pathname: "/signin",
                                state: {
                                    from: props.location
                                }
                            }
                        }/>
                    }
                }
            }
            />
        );

};