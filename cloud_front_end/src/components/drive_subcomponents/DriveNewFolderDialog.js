import React, {useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {DriveContext} from "../../common/GlobaContext";
import {IconButton, Typography} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {useNewFolderDialogStyles} from "../../styles/DriveNewFolderDialogStyles"
import display_error from "../../common/DisplayError";
import {MKDIR_ENDPOINT, STATUS_OK} from "../../common/constants";


export default function DriveNewFolderDialog({handleNewFolderDialogClose, newFolderDialogOpen}){
    const context = useContext(DriveContext);
    const classes = useNewFolderDialogStyles();
    const {currentDir} = context;
    const [newFolderName, setNewFolderName] = React.useState("");


    const DIALOG_LABEL = "new-folder-dialog";
    const DIALOG_TITLE_ID = "new-folder-dialog-id";



    const handleCreate = async (event) => {
        try{
            const regexValidation = /^[^\s\/]+$/gm;
            const parentDir = (currentDir === '/') ? '' : currentDir;
            const {getNewDriveData} = context;
            if(!newFolderName.match(regexValidation)){
                throw new Error('invalid new folder name');
            }
            console.log(MKDIR_ENDPOINT);
            let result =  await fetch(MKDIR_ENDPOINT, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({fullPath: `${parentDir}/${newFolderName}`})
            });

            if(result.status !== 200) throw new Error(result.statusText);
            let result_json = await result.json();
            if(result_json.status !== STATUS_OK) throw new Error(result_json.error);
            await getNewDriveData()
            handleNewFolderDialogClose();
        }catch (err){
            display_error(err);
        }
    }

    const handleNewFolderText = (event)=>{
        setNewFolderName(event.target.value);
    }

    return(
        <Dialog open={newFolderDialogOpen} onClose={handleNewFolderDialogClose} aria-labelledby={DIALOG_LABEL}>
            <DialogTitle id={DIALOG_TITLE_ID} disableTypography className={classes.dialogTitle}>
                <Typography variant={"h6"}>
                    New Folder
                </Typography>
                <IconButton onClick={handleNewFolderDialogClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.DialogContent}>
                <DialogContentText >
                    Enter your new folder name below, make sure it does not exist already.
                </DialogContentText>
                <TextField
                    variant={"outlined"}
                    autoFocus={true}
                    id={"new-folder"}
                    label={"New Folder"}
                    onChange={handleNewFolderText}
                />
                <DialogActions>
                    <Button onClick={handleNewFolderDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant={"contained"} onClick={handleCreate} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )

}