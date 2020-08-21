import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import DriveStyles from '../styles/DriveStyles';
import {DriveContext} from "../common/GlobaContext";
import DirectoryPane from "./drive_subcomponents/DirectoryPane";
import DriveAppBar from "./drive_subcomponents/DriveAppBar";
import DriveDrawer from "./drive_subcomponents/DriveDrawer";


export default function Drive(props) {
    const classes = DriveStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [currentDir, setDir] = React.useState('/');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <DriveContext.Provider value={{theme: theme, handleDrawerClose: handleDrawerClose, handleDrawerOpen: handleDrawerOpen, open: open, currentDir: currentDir, setDir: setDir}}>
            <div className={classes.root}>
                <CssBaseline />
                <DriveAppBar/>
                <DriveDrawer/>
                <DirectoryPane/>
            </div>
        </DriveContext.Provider>
    );
}


