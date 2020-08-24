import React from "react";
import {withStyles} from "@material-ui/core";
import {DriveContext} from "../../common/GlobaContext";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import FileTreeView from "./FileTreeView";
import DriveDrawerStyles from "../../styles/DriveDrawerStyles";

class DriveDrawer extends React.Component{
    static contextType = DriveContext;
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        const {theme, open, handleDrawerClose, fileTreeRef} = this.context;
        return(
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <div style={{flexGrow: "1"}}>
                        <h2 style={{textAlign: "center"}}>
                            My folders
                        </h2>
                    </div>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key={'FileTreeView'}>
                        <FileTreeView ref={fileTreeRef}/>
                    </ListItem>
                </List>
            </Drawer>
        )
    }
}

export default withStyles(DriveDrawerStyles)(DriveDrawer);