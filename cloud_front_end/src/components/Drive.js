import React, {useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DriveStyles from '../styles/DriveStyles';
import {DriveContext} from "../common/GlobaContext";
import DriveAppBar from "./drive_subcomponents/DriveAppBar";
import {DriveContextMenu, DRIVE_CONTEXT_MENU_ID} from "./drive_subcomponents/DriveContextMenu";
import DriveDrawer from "./drive_subcomponents/DriveDrawer";
import {ALL_DIR_ENDPOINT, DIR_CONTENT_ENDPOINT, STATUS_OK} from "../common/constants";
import display_error from "../common/DisplayError";
import {MenuProvider} from "react-contexify";
import DirectoryPane from "./drive_subcomponents/DirectoryPane";


const getDirectoryPaneData = async (currentDir) =>{
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
        return result_json.data;
    }catch (err) {
        display_error(err);
    }
}

const getTreeViewData = async ()=> {
    try{
        let result = await fetch(ALL_DIR_ENDPOINT, {
            method: 'GET',
            credentials: 'include'
        });

        if(result.status !== 200) throw new Error(result.statusText);
        let result_json = await result.json();
        return result_json.result ;
    }catch (err) {
        display_error(err);
    }
}



export default function Drive(props) {
    const classes = DriveStyles();
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [currentDir, setDir] = React.useState('/');
    const [directoryPaneData, setDirectoryPaneData] = React.useState([]);
    const [highlighted, setHighlighted] = React.useState([]);
    const [fileTreeData, setFileTreeData] = React.useState([]);

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };



    const getNewDriveData = async () =>{
      let newDirectoryPaneData = await getDirectoryPaneData(currentDir);
      let newFileTreeData = await getTreeViewData();
      setFileTreeData(newFileTreeData);
      setDirectoryPaneData(newDirectoryPaneData);
      setHighlighted([]);
    };

    const highlightAll = async ()=>{
        let directoryPaneData = await getDirectoryPaneData(currentDir); // need to fetch new one because for some reason, it keeps being empty in the state hook
        setHighlighted(directoryPaneData);
    }


    // component did mount....
    useEffect( ()=>{
         getNewDriveData().then();

         // for crl+a
         const downListener = (event)=> {
             if (event.ctrlKey && event.code === 'KeyA') {
                 event.preventDefault();
                 highlightAll().then();
             }
         }




        window.addEventListener("keydown", downListener);


        // component will unmount....
        return ()=>{
            window.removeEventListener("keydown", downListener, false);
        }

    }, []);

    return (
        <DriveContext.Provider value={{
            highlighted: highlighted,
            setHighlighted: setHighlighted,
            getNewDriveData : getNewDriveData,
            fileTreeData: fileTreeData,
            directoryPaneData : directoryPaneData,
            theme: theme, handleDrawerClose: handleDrawerClose, handleDrawerOpen: handleDrawerOpen, open: drawerOpen, currentDir: currentDir, setDir: setDir}}
        >
            <div className={classes.root}>
                <CssBaseline/>
                <DriveAppBar />
                <DriveDrawer/>
                {/* Directory pane which list all the files are nested inside the context provider which is a div that allows right click to show context menu*/}
                <MenuProvider  id={DRIVE_CONTEXT_MENU_ID}>
                    <DirectoryPane />
                </MenuProvider>
                {/* dialogs are all nested inside the context menu*/}
                <DriveContextMenu/>
            </div>
        </DriveContext.Provider>
    );
}


