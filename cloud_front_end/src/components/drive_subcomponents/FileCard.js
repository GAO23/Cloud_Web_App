import React from "react";
import {withStyles} from "@material-ui/core";
import FileCardStyles from "../../styles/FileCardStyles";
import fileIcon from "../../assets/images/file.png";
import folderIcon from "../../assets/images/folder.png";
import {Paper} from "@material-ui/core";
import {DriveContext} from "../../common/GlobaContext";

class FileCard extends React.Component{
    static contextType = DriveContext;

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onRightClick = this.onRightClick.bind(this);
    }

    onClick(event){
        event.stopPropagation();
        const {data} = this.props;
        const {filename} = data;
        const {highlighted, setHighlighted} = this.context;
        let newHighlighted = [filename];
        let crl = window.event.ctrlKey
        if(crl) {
            {
                if (highlighted.includes(filename)) {
                    newHighlighted = highlighted.filter((item)=>{
                        return item !== filename;
                    });
                } else {
                    newHighlighted = newHighlighted.concat(highlighted);
                }
            }
        }
        setHighlighted(newHighlighted);
    }

    onRightClick(event){
        const {setHighlighted, highlighted} = this.context;
        const {data} = this.props;
        const {filename} = data;
        if(highlighted.length > 1) return;
        let newHighlighted = [filename];
        setHighlighted(newHighlighted);
    }



    render() {
        const {highlighted} = this.context;
        const {data, classes} = this.props;
        const {isDir, filename, lastModified, size, contentType, fullPath} = data;
        const toHighlight = highlighted.includes(filename);
        return(
            <Paper
                onContextMenu={this.onRightClick}
                onClick={this.onClick} variant={'outlined'} className={(toHighlight) ? classes.highlighted : classes.imagContainer}>
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