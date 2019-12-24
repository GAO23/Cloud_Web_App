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
                <Link to="/download/network.pdf">Get pdf</Link>
                <br/>
                <Link to="/download/CSE_310.zip">Get CSE 310 Assignments</Link>
            </div>
        )
    }
}

export default Home;