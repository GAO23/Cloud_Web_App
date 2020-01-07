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

    // async download(filename){
    //     try{
    //         let url = `http://34.70.223.87/download/${filename}`;
    //         const response = await axios({
    //             url: url,
    //             method: 'GET',
    //             responseType: 'blob', // important
    //         });
    //         url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement('a');
    //         link.href = url;
    //         link.setAttribute('download', filename);
    //         link.click();
    //     }catch(err){
    //         alert(err.message);
    //     }
    // }

    download(filename){
        try{
            let url = `http://34.70.223.87/download/${filename}`;
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            link.click();
        }catch(err){
            alert(err.message);
        }
    }


    render() {
        let content = this.props.location.state.content;
        switch(content) {
            case "CSE_310":
                return(
                    <div className="link_position">
                        <Button onClick={() => {this.download("network.pdf")}} className="custom_btn">Download {`${content} textbook`}<FontAwesomeIcon icon={faDownload}/></Button>
                        <br/>
                        <Button onClick={() => {this.download("CSE_310.zip")}} className="custom_btn">Download { `${content} assignments/exams`}<FontAwesomeIcon icon={faDownload}/> </Button>
                    </div>
                );
                break;

            case "AMS_310":
                return (
                    <div className="link_position">
                        <Button onClick={() => {this.download("AMS_310.zip")}} className="custom_btn">Download {`${content} textbook`}<FontAwesomeIcon icon={faDownload}/></Button>
                    </div>
                );

            default:
                return (
                    <div>
                        <h1>Rendering failed</h1>
                    </div>
                )
        }

    }
}

export default Download;