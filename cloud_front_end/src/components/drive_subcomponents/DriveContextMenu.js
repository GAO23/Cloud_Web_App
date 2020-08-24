import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';
import {DIRECTORY_PANE_ID} from "../../common/constants";
import 'react-contexify/dist/ReactContexify.min.css';
import React, {useContext} from "react";
import {DriveContext} from "../../common/GlobaContext";
import DirectoryPane from "./DirectoryPane";

const DriveContextMenu = () => {
    const context = useContext(DriveContext);
    const {handleNewFolderDialogOpen} = context;

    return(
            <Menu id={DIRECTORY_PANE_ID} animation={"flip"}>
                <Item onClick={handleNewFolderDialogOpen}>New Folder</Item>
                <Item onClick={() => console.log("Ipsum")}>Ipsum</Item>
                <Separator/>
                <Item disabled>Dolor</Item>
                <Separator/>
                <Submenu label="Foobar">
                    <Item onClick={() => console.log("foo")}>Foo</Item>
                    <Item onClick={() => console.log("bar")}>Bar</Item>
                </Submenu>
            </Menu>
        );

};

const DriveContextMenuProvider = () =>{
    const context = React.useContext(DriveContext);
    const {directoryPaneRef} = context;
    return(
        <MenuProvider  id={DIRECTORY_PANE_ID}>
            <DirectoryPane />
        </MenuProvider>
    );
}


export {DriveContextMenu, DriveContextMenuProvider};