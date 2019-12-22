import React from 'react';
import '../components_css/download.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import axios from 'axios';

class Download extends React.Component{
    constructor(props) {
        super(props);
    }

    async download(){
        try{
            let url = 'http://34.70.223.87/download_pdf';
            const response = await axios({
                url: url,
                method: 'GET',
                responseType: 'blob', // important
            });
            url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'network.pdf');
            link.click();
        }catch(err){
            console.log(err.message);
        }
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