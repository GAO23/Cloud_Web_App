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

let selected = [];


export default function ConfirmDialog({confirmOpen, confirmAction, handleConfirmClose}) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const context = React.useContext(DriveContext);
    const {highlighted, currentDir} = context;

    const DIALOG_LABEL = "confirm-dialog";
    const DIALOG_TITLE_ID = "confirm-dialog-id";

    selected = (highlighted.length === 0) ? selected: JSON.parse(JSON.stringify(highlighted)); // this will be gone after context menu click so store a backup

    const handleDelete = async ()=>{
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