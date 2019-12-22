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
                <Link to="/pdf">Get pdf</Link>
            </div>
        )
    }
}

export default Home;