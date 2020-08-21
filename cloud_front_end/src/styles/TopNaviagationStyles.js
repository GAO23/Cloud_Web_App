const drawerWidth = 240;

const TopNaviagationStyles = theme => ({
    color:{
        color: theme.palette.primary.contrastText,
        cursor: "pointer"
    },
    seperator: {
        color: theme.palette.primary.contrastText,
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
