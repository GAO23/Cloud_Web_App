import React from "react";
import {DriveContext} from "../../common/GlobaContext";
import DirectoryPaneStyles from "../../styles/DirectoryPaneStyles";
import {withStyles} from "@material-ui/core";
import clsx from "clsx";
import FileCard from "./FileCard";
import {Grid} from "@material-ui/core";
import {DIR_CONTENT_ENDPOINT, STATUS_OK} from "../../common/constants";
import display_error from "../../common/DisplayError";



class DirectoryPane extends React.Component{
    static contextType = DriveContext;


    constructor(props) {
        super(props);
        this.state = {

        }
        this.getContent = this.getContent.bind(this);
    }

    getContent(){
        const {directoryPaneData} = this.context;
        let result = directoryPaneData.map((element, index) => {
            return(
                <Grid key={index} item={true}>
                    <FileCard data={element} name={"test file"} />
                </Grid>
                )
        });

        return result;
    }


    render() {
        const {classes} = this.props;
        const {open} = this.context;
        const content = this.getContent();
        return(
            <main id={"directory content"}
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Grid container={true} spacing={2} >
                    {content}
                </Grid>
            </main>
        )
    }

}

export default withStyles(DirectoryPaneStyles)(DirectoryPane);

