import React from 'react';
import FileTreeViewStyles from "../../styles/FileTreeViewStyle";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {ALL_DIR_ENDPOINT} from "../../common/constants";
import {withStyles} from "@material-ui/core";

class FileTreeView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            dirLists: []
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

   async componentDidMount() {
        try{
            let result = await fetch(ALL_DIR_ENDPOINT, {
               method: 'GET',
               credentials: 'include'
            });

            // let file = await fetch('http://localhost:3001/stream?fullPath=/441.jpg',{
            //     credentials: 'include',
            //     method: 'GET'
            // });
            //
            // if(file.status !== 200) throw new Error(result.statusText);
            // let image = await file.blob();
            // let blobUrl = URL.createObjectURL(image);


            if(result.status !== 200) throw new Error(result.statusText);
            let result_json = await result.json();
            this.setState({dirLists: result_json.result});
        }catch (err) {
            console.log(err.stack);
            alert(err.message);
        }
    }


    render() {
        let treeView = this.getTreeView('/', this.state.dirLists);
        const {classes} = this.props;
        return (
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {treeView}

                {/*<TreeItem nodeId="1" label="Applications">*/}
                {/*    <TreeItem nodeId="2" label="Calendar" />*/}
                {/*    <TreeItem nodeId="3" label="Chrome" />*/}
                {/*    <TreeItem nodeId="4" label="Webstorm" />*/}
                {/*</TreeItem>*/}
                {/*<TreeItem nodeId="5" label="Documents">*/}
                {/*    <TreeItem nodeId="10" label="OSS" />*/}
                {/*    <TreeItem nodeId="6" label="Material-UI">*/}
                {/*        <TreeItem nodeId="7" label="src">*/}
                {/*            <TreeItem nodeId="8" label="index.js" />*/}
                {/*            <TreeItem nodeId="9" label="tree-view.js" />*/}
                {/*        </TreeItem>*/}
                {/*    </TreeItem>*/}
                {/*</TreeItem>*/}
            </TreeView>
        );
    }
}

export default withStyles(FileTreeViewStyles)(FileTreeView);