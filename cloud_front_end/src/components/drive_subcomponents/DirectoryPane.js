import React from "react";
import {DriveContext} from "../../common/GlobaContext";
import fileIcon from "../../assets/images/file.png";
import folderIcon from "../../assets/images/folder.png";
import Typography from "@material-ui/core/Typography";
import DirectoryPaneStyles from "../../styles/DirectoryPaneStyles";

export default class DirectoryPane extends React.Component{
    static contextType = DriveContext;


    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return(
            <Typography>
                <div style={DirectoryPaneStyles.imagContainer}>
                    <img
                        src={fileIcon}
                        alt="file"
                    />
                    <span style={DirectoryPaneStyles.caption}>file</span>
                </div>

                <div style={DirectoryPaneStyles.imagContainer}>
                    <img
                        src={folderIcon}
                        alt="file"
                    />
                    <span style={DirectoryPaneStyles.caption}>folder</span>
                </div>
            </Typography>
        )
    }

}

