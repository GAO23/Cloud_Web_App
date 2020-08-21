const drawerWidth = 240;

const TopNaviagationStyles = theme => ({
    dir: {
        marginRight: "10px",
        cursor: "pointer",
        display: "inline-block"
    },
    separator: {
        marginRight: "10px",
        display: "inline-block"
    },
    content: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },

    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 240,
    },
});

export default TopNaviagationStyles;
