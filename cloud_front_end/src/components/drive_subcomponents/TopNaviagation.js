import React from 'react';
import Typography from "@material-ui/core/Typography";
import {DriveContext} from "../../common/GlobaContext";
import TopNaviagationStyles from "../../styles/TopNaviagationStyles";
import  {Grid} from "@material-ui/core";

export default class TopNaviagation extends React.Component{

    static contextType = DriveContext;

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
                <Typography variant="h6" noWrap>
                    <p style={TopNaviagationStyles.dir}>{this.context.currentDir}</p>
                    <p style={TopNaviagationStyles.separator}>&gt;</p>
                    <p style={TopNaviagationStyles.dir}>test</p>
                </Typography>
        )
    }

}