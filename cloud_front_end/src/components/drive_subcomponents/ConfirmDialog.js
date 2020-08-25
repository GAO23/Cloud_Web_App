import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import {DriveContext} from "../../common/GlobaContext";
import {confirmActionEnum} from "./DriveContextMenu";
import {DELETE_FILE_ENDPOINT, DELETE_DIR_ENDPOINT, STATUS_OK} from "../../common/constants";
import display_error from "../../common/DisplayError";

let selected = [];

const deleteItem = async (item)=>{
    try{
        let url = (item.isDir) ? DELETE_DIR_ENDPOINT : DELETE_FILE_ENDPOINT;
        let body = {fullPath : item.fullPath};
        let response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if(response.status !== 200) throw new Error(`deleting ${item.filename} failed, ${response.statusText}`);
        let response_json = await response.json();
        if(response_json.status !== STATUS_OK) throw new Error(`deleting ${item.filename} failed, ${response.statusText}`);
    } catch (err) {
        display_error(err);
    }
}

export default function ConfirmDialog({confirmOpen, confirmAction, handleConfirmClose}) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const context = React.useContext(DriveContext);
    const {highlighted,  getNewDriveData} = context;

    const DIALOG_LABEL = "confirm-dialog";
    const DIALOG_TITLE_ID = "confirm-dialog-id";

    selected = (highlighted.length === 0) ? selected: JSON.parse(JSON.stringify(highlighted)); // this will be gone after context menu click so store a backup

    const handleDelete = async ()=>{
        let promises = selected.map((item, index)=>{
            return deleteItem(item);
        });
        await Promise.all(promises);
        await getNewDriveData();
        handleConfirmClose();
    }

    let confirmActions = {
        [confirmActionEnum.DELETE] : handleDelete
    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={confirmOpen}
                onClose={handleConfirmClose}
                aria-labelledby={DIALOG_LABEL}
                fullWidth={true}
            >
                <DialogTitle id={DIALOG_TITLE_ID}>Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You sure?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleConfirmClose} color="primary">
                        No
                    </Button>
                    <Button variant={"contained"} onClick={confirmActions[confirmAction]} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}