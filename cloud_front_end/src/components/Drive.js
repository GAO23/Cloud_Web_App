import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DriveStyles from '../styles/DriveStyles';
import {DriveContext} from "../common/GlobaContext";
import DirectoryPane from "./drive_subcomponents/DirectoryPane";
import DriveAppBar from "./drive_subcomponents/DriveAppBar";
import {DriveContextMenu, DriveContextMenuProvider} from "./drive_subcomponents/DriveContextMenu";
import DriveDrawer from "./drive_subcomponents/DriveDrawer";
import DriveNewFolderDialog from "./drive_subcomponents/DriveNewFolderDialog";
import {DIR_CONTENT_ENDPOINT, STATUS_OK} from "../common/constants";
import display_error from "../common/DisplayError";


export default function Drive(props) {
    const classes = DriveStyles();
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [currentDir, setDir] = React.useState('/');
    const [newFolderDialogOpen, setNewFolderDialogOpen] = React.useState(false);
    const [directoryPaneData, setDirectoryPaneData] = React.useState([]); // only use this because for some reason, setting ref for directory pane doesnt work, besides allowing children components directly calling on one another without moving through hte common parents sound like anti pattern.
    const fileTreeRef = React.createRef(); // this will be use to update the file list from another child component when modifying folders, it is an anti pattern, i only do this because im lazy to rewrite my bad code

    const updateDirectoryPaneData = async () =>{
        try{
            let result = await fetch(`${DIR_CONTENT_ENDPOINT}?dir=${currentDir}`,{
                method: "GET",
                credentials: "include"
            });
            if ( result.status !== 200) throw new Error(result.statusText);
            let result_json = await result.json();
            if(result_json.status !== STATUS_OK) throw new Error(result_json.error);
            result_json.data = result_json.data.sort((elementOne, elementTwo)=>{
                if(elementOne.isDir && elementTwo.isDir) return 0;
                if(elementOne.isDir && !elementTwo.isDir) return -1;
                if(!elementOne.isDir && elementTwo.isDir) return 1;
            });
            setDirectoryPaneData(result_json.data);
        }catch (err) {
            display_error(err);
        }
    }

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleNewFolderDialogOpen = () => {
        setNewFolderDialogOpen(true);
    };

    const handleNewFolderDialogClose = () => {
        setNewFolderDialogOpen(false);
    };



    return (
        <DriveContext.Provider value={{
            fileTreeRef: fileTreeRef, directoryPaneData : directoryPaneData, updateDirectoryPaneData : updateDirectoryPaneData,
            handleNewFolderDialogOpen: handleNewFolderDialogOpen, handleNewFolderDialogClose : handleNewFolderDialogClose, newFolderDialogOpen : newFolderDialogOpen,
            theme: theme, handleDrawerClose: handleDrawerClose, handleDrawerOpen: handleDrawerOpen, open: drawerOpen, currentDir: currentDir, setDir: setDir}}
        >
            <div className={classes.root}>
                <CssBaseline/>
                <DriveAppBar />
                <DriveDrawer/>
                {/* Directory pane which list all the files are nested inside the context provider which is a div taht allows right click to show context menu*/}
                <DriveContextMenuProvider />
                <DriveContextMenu/>
                <DriveNewFolderDialog />
            </div>
        </DriveContext.Provider>
    );
}


