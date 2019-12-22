import React from 'react';
import '../components_css/download.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";

class Download extends React.Component{
    constructor(props) {
        super(props);
    }

    async download(){
        let url = 'http://localhost:3001/pdf';
        let a = document.createElement('a');
        a.href = url;
        a.click();
    }

    render() {
        return(
            <div className="link_position">
                <Button onClick={this.download} className="custom_btn">Download <FontAwesomeIcon icon={faDownload}/> </Button>
            </div>
        )
    }
}

export default Download;