import React from 'react';
import Typography from "@material-ui/core/Typography";
import {DriveContext} from "../../common/GlobaContext";
import TopNaviagationStyles from "../../styles/TopNaviagationStyles";
import {withStyles} from "@material-ui/core";
import clsx from "clsx";

class TopNaviagation extends React.Component{

    static contextType = DriveContext;

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {classes} = this.props;
        const {open} = this.context;
        return(
                <Typography variant="h6" noWrap className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}>
                    <p className={classes.dir}>{this.context.currentDir}</p>
                    <p className={classes.separator}>&gt;</p>
                    <p className={classes.dir}>testasdfasdfasdfasdfasdfasdfSDAFASDFASDFASDFASDFDSFASDFASDFSADFDS</p>
                </Typography>
        )
    }

}

export default withStyles(TopNaviagationStyles)(TopNaviagation);