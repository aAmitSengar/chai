import variables from '../../styles/variables';

const styles = theme => ({
    root: {
        flexGrow: 1,
        //minHeight: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        paddingLeft: 100,
        height: '100vh',
        width: '100vw'
    },

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
    }
});

export default styles;