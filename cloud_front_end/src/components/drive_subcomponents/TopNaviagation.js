import React from 'react';
import Typography from "@material-ui/core/Typography";
import {DriveContext} from "../../common/GlobaContext";
import TopNaviagationStyles from "../../styles/TopNaviagationStyles";
import {withStyles} from "@material-ui/core";
import clsx from "clsx";
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

class TopNaviagation extends React.Component{

    static contextType = DriveContext;

    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
    }

    render() {
        const {classes} = this.props;
        const {open, theme} = this.context;
        return(
            <Breadcrumbs separator={<p className={classes.seperator}>/</p>} aria-label="breadcrumb"className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <Typography  className={classes.color} onClick={this.handleClick}>Breadcrumb</Typography>
                <Typography  className={classes.color} onClick={this.handleClick}>Breadcrumb</Typography>
                <Typography  className={classes.color} onClick={this.handleClick}>Breadcrumb</Typography>
            </Breadcrumbs>
        )
    }

}

export default withStyles(TopNaviagationStyles)(TopNaviagation);