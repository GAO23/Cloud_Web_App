import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DriveContext} from "../../common/GlobaContext";


export default function DriveNewFolderDialog(){
    const context = useContext(DriveContext);

    const {newFolderDialogOpen, handleNewFolderDialogClose} = context;

    const DIALOG_LABEL = "new-folder-dialog";
    const DIALOG_TITLE_ID = "new-folder-dialog-id";

    const handleCreate = (event) => {

    }

    return(
        <Dialog open={newFolderDialogOpen} onClose={handleNewFolderDialogClose} aria-labelledby={DIALOG_LABEL}>
            <DialogTitle id={DIALOG_TITLE_ID}>New Folder</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your new folder name below, make sure it does not exist already.
                </DialogContentText>
                <TextField
                    autoFocus={true}
                    id={"new-folder"}
                    label={"New Folder"}
                />
                <DialogActions>
                    <Button onClick={handleNewFolderDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant={"contained"} onClick={handleNewFolderDialogClose} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )

}