import React from "react";
import {DriveContext} from "../../common/GlobaContext";
import DirectoryPaneStyles from "../../styles/DirectoryPaneStyles";
import {withStyles} from "@material-ui/core";
import clsx from "clsx";
import FileCard from "./FileCard";


class DirectoryPane extends React.Component{
    static contextType = DriveContext;


    constructor(props) {
        super(props);
        this.state = {

        }
        this.getContent = this.getContent.bind(this);
    }

    getContent(){

    }

    render() {
        const {classes} = this.props;
        const {open} = this.context;
        return(
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />

                <FileCard isDir={false} name={"test file"} highlighted={false}/>
                <FileCard isDir={true} name={"test folder"} highlighted={true}/>
            </main>
        )
    }

}

export default withStyles(DirectoryPaneStyles)(DirectoryPane);

