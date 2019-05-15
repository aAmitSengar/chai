import variables from '../../styles/variables';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '80%',
        height: 'auto',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    // root: {
    //     flexGrow: 1,
    //     //minHeight: '100vh',
    //     zIndex: 1,
    //     overflow: 'hidden',
    //     position: 'relative',
    //     display: 'flex',
    //     paddingLeft: 100,
    //     height: '100vh',
    //     width: '100vw'
    // },

    content: {
        flexGrow: 1,
        backgroundColor: variables.black,
        marginTop: theme.spacing.unit,
        paddingTop: theme.spacing.unit * 8,
        minWidth: 0, // So the Typography noWrap works
    },
    nolink: {
        textDecoration: "none",
        cursor: "pointer",
        outline: "none",
        '&:focus, &:hover, &:visited, &:link, &:active ': {
            textDecoration: "none",
        }
    },
    SmallScreen: {
        minWidth: 420
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing.unit,
        backgroundColor: variables.whiteColor,
        overflow: 'hidden'
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    actionContainer: {
        'color': variables.black,
        'display': 'flex',
        'flex-direction': 'row-reverse',
        margin: '38px -12px 0 0;'
    },
    submitButton: {
        backgroundColor: variables.lightgreen,
    },
    cancelButton: {
        backgroundColor: variables.white,
        color: variables.darkgray,
        textDecoration: 'underline',
        border: 'none'
    },
    orLabel: {
        margin: '10px 20px 0px 20px',
        color: variables.darkgray,

    },
});

export default styles;