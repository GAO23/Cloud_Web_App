const drawerWidth = 240;

const DirectoryPaneStyles = theme => ({
    imagContainer : {
        verticalAlign: "top",
        display: "inline-block",
        textAlign: "center",
        width: "120px"
    },
    caption: {
        display: "block"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar, // need to get rid of this for background
        justifyContent: 'flex-end',
        // backgroundColor: "red"
    },
});

export default DirectoryPaneStyles;