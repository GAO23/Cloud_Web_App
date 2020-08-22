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
            data: [],
            highlighted : []
        }
        this.getContent = this.getContent.bind(this);
    }

    getContent(){
        let result = this.state.data.map((element, index) => {
            let highlighted = this.state.highlighted.includes(element.filename);
            return(
                <Grid key={index} item={true}>
                    <FileCard highlighted={highlighted} data={element} name={"test file"} highlighted={false}/>
                </Grid>
                )
        });

        return result;
    }

    async componentDidMount() {
        try{
            let currentDir = this.context.currentDir;
            let result = await fetch(`${DIR_CONTENT_ENDPOINT}?dir=${currentDir}`,{
                method: "GET",
                credentials: "include"
            });
            if ( result.status !== 200) throw new Error(result.statusText);
            let result_json = await result.json();
            if(result_json.status !== STATUS_OK) throw new Error(result_json.error);
            this.setState({...this.state, data: result_json.data});
        }catch (err) {
            display_error(err);
        }
    }

    render() {
        const {classes} = this.props;
        const {open} = this.context;
        const content = this.getContent();
        return(
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <Grid container={true} >
                    {content}
                </Grid>

            </main>
        )
    }

}

export default withStyles(DirectoryPaneStyles)(DirectoryPane);

