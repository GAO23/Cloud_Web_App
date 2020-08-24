import React from 'react';
import FileTreeViewStyles from "../../styles/FileTreeViewStyle";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {ALL_DIR_ENDPOINT} from "../../common/constants";
import {withStyles} from "@material-ui/core";
import display_error from "../../common/DisplayError";
import {DriveContext} from "../../common/GlobaContext";

class FileTreeView extends React.Component{

    static contextType = DriveContext;

    constructor(props) {
        super(props);
        this.state = {

        }
        this.getSubdirPath = this.getSubdirPath.bind(this)
        this.getTreeView = this.getTreeView.bind(this);
    }

    getSubdirPath(parentDir, subFullPath){
        let subString = subFullPath.substring(parentDir.length);
        let subDirPath = subString.split('/');
        return subDirPath[0];
    }


    getTreeView(path, lists){
        let subDirs = {};
        let filteredList = [];
        const re = new RegExp(`${path}.+`);
        for(let i = 0; i < lists.length; i++){
            let element = lists[i];
            let subDir = this.getSubdirPath(path, element.fullPath);
            if(re.test(element.fullPath)){
                subDirs[subDir] = (subDirs[subDir] === undefined) ? 0 : subDirs[subDir] + 1;
                filteredList.push(element);
            }

        }

        if(Object.keys(subDirs).length === 0) {
            return (
                <TreeItem nodeId={"1"} label={"empty"}></TreeItem>
            );
        }

        return(
            <React.Fragment>
                {
                    Object.keys(subDirs).map( (key, index) => {
                        return(
                           <TreeItem key={key} nodeId={key} label={key}>
                               {this.getTreeView(`${path}${key}/`, filteredList)}
                           </TreeItem>
                       )
                    })
                }
            </React.Fragment>
        )
    }




    render() {
        let {currentDir, fileTreeData} = this.context;
        let treeView = this.getTreeView(currentDir, fileTreeData);
        const {classes} = this.props;
        return (
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {treeView}

            </TreeView>
        );
    }
}

export default withStyles(FileTreeViewStyles)(FileTreeView);