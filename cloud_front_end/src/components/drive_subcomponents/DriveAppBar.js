import React from "react";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import TopNaviagation from "./TopNaviagation";
import AppBar from "@material-ui/core/AppBar";
import {withStyles} from "@material-ui/core";
import DriveAppBarStyles from "../../styles/DriveAppBarStyles";
import {DriveContext} from "../../common/GlobaContext";

class DriveAppBar extends React.Component{
    static contextType = DriveContext;
    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        const {handleDrawerOpen, open} = this.context;
        return(
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <TopNaviagation/>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(DriveAppBarStyles)(DriveAppBar);