import {makeStyles} from "@material-ui/core/styles";

const useNewFolderDialogStyles = makeStyles((theme) => ({
    dialogTitle: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    DialogContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
}));

export {useNewFolderDialogStyles};