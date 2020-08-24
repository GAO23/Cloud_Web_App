import { Menu, Item, Separator, Submenu, MenuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import React, {useContext} from "react";
import {DriveContext} from "../../common/GlobaContext";
import DriveNewFolderDialog from "./DriveNewFolderDialog";
import ConfirmDialog from "./ConfirmDialog";

const DRIVE_CONTEXT_MENU_ID = "directory-pane-menu"


const confirmActionEnum = {
    DELETE: "delete",
}

const DriveContextMenu = () => {
    const context = useContext(DriveContext);
    const {highlighted} = context;
    const [newFolderDialogOpen, setNewFolderDialogOpen] = React.useState(false);
    const [confirmOpen, setConfirmOpen] = React.useState(false);
    let confirmAction = confirmActionEnum.DELETE;


    const handleNewFolderDialogOpen = () => {
        setNewFolderDialogOpen(true);
    };

    const handleNewFolderDialogClose = () => {
        setNewFolderDialogOpen(false);
    };

    const handleConfirmOpen = () => {
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };

    const directoryPaneContextMenu = ()=>(
            <Menu id={DRIVE_CONTEXT_MENU_ID} animation={"flip"}>
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
    )

    const fileContextMenu = ()=>(
            <Menu id={DRIVE_CONTEXT_MENU_ID} animation={"flip"}>
                <Item onClick={({event, props})=>{
                    event.stopPropagation();
                    confirmAction = confirmActionEnum.DELETE;
                    handleConfirmOpen();
                }}>Delete</Item>
                <Item onClick={() => console.log("Ipsum")}>Ipsum</Item>
                <Separator/>
                <Item disabled>Dolor</Item>
                <Separator/>
                <Submenu label="Foobar">
                    <Item onClick={() => console.log("foo")}>Foo</Item>
                    <Item onClick={() => console.log("bar")}>Bar</Item>
                </Submenu>
            </Menu>
    )

    let contextMenu = (highlighted.length === 0) ? directoryPaneContextMenu() : fileContextMenu();

    return(
            <>
                {contextMenu}
                <ConfirmDialog confirmOpen={confirmOpen} handleConfirmClose={handleConfirmClose} />
                <DriveNewFolderDialog confirmAction={confirmAction} handleNewFolderDialogClose={handleNewFolderDialogClose} newFolderDialogOpen={newFolderDialogOpen} />
            </>
        );

};


export {DriveContextMenu, DRIVE_CONTEXT_MENU_ID, confirmActionEnum};