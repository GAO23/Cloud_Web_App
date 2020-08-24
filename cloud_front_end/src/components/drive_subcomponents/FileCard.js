import React from "react";
import {withStyles} from "@material-ui/core";
import FileCardStyles from "../../styles/FileCardStyles";
import fileIcon from "../../assets/images/file.png";
import folderIcon from "../../assets/images/folder.png";
import {Paper} from "@material-ui/core";

class FileCard extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {
        const {data, highlighted, classes} = this.props;
        const {isDir, filename, lastModified, size, contentType, fullPath} = data;
        return(
            <Paper variant={'outlined'} className={(highlighted) ? classes.highlighted : classes.imagContainer}>
                <img
                    src={(isDir) ? folderIcon : fileIcon}
                    alt="file"
                    className={classes.image}
                />
                <span className={classes.caption}>{filename}</span>
            </Paper>
        )
    }
}


export default withStyles(FileCardStyles)(FileCard);