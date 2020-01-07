import React from 'react';
import {Link} from "react-router-dom";
import '../components_css/home.css'

class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="link_position">
                <Link to={{ pathname: '/download/CSE_310', state: { content: 'CSE_310'} }}>Get CSE 310 Assignments</Link>
                <br/>
                <Link to={{ pathname: '/download/AMS_310', state: { content: 'AMS_310'} }}>Get AMS 310 Assignments</Link>
            </div>
        )
    }
}

export default Home;