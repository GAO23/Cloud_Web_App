const drawerWidth = 240;

const DriveDrawerStyles = theme => (
    {
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
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
    }
)

export default DriveDrawerStyles;