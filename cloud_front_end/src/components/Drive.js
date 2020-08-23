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


export default function Drive(props) {
    const classes = DriveStyles();
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [currentDir, setDir] = React.useState('/');
    const [newFolderDialogOpen, setNewFolderDialogOpen] = React.useState(false);

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
            handleNewFolderDialogOpen: handleNewFolderDialogOpen, handleNewFolderDialogClose : handleNewFolderDialogClose, newFolderDialogOpen : newFolderDialogOpen,
            theme: theme, handleDrawerClose: handleDrawerClose, handleDrawerOpen: handleDrawerOpen, open: drawerOpen, currentDir: currentDir, setDir: setDir}}
        >
            <div className={classes.root}>
                <CssBaseline />
                <DriveAppBar/>
                <DriveDrawer/>
                {/* Directory pane which list all the files are nested inside the context provider which is a div taht allows right click to show context menu*/}
                <DriveContextMenuProvider component={DirectoryPane}/>
                <DriveContextMenu/>
                <DriveNewFolderDialog />
            </div>
        </DriveContext.Provider>
    );
}


