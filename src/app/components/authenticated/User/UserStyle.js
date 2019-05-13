import variables from '../../../styles/variables';

const styles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: '100vh',
        zIndex: 1,
        position: 'relative',
        display: 'flex',
        overflow: 'auto'
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
        marginTop: "calc(6% - 3em)",
        height: 'auto'
    },
    marginLeft: {
        marginLeft: '0 !important'
    },
    marginTop: {
        marginTop: '10px'
    },
    imgClass: {
        width: '100%'
    },
    tableBackground: {
        backgroundColor: 'white !important',
        overflowY: '-webkit-paged-x'

    },
    button: {
        border: 'none',
        color: 'white',
        padding: '10px 32px',
        'text-align': 'center',
        'text-decoration': 'none',
        display: 'inline-block',
        fontSize: 16,
        margin: '2px 2px',
        cursor: 'pointer',
    },
    button3: {
        backgroundColor: 'white',
        color: 'black',
        border: '2px solid #e7e7e7',
        width: 'auto',
        float: 'right',
    },
    button6: {
        backgroundColor: 'white',
        color: 'black',
        border: '2px solid #e7e7e7',
        float: 'right',
    },

    tableClass: {
        'border-collapse': 'collapse',
        width: '100%',
        '& td, th': {
            'text-align': 'left',
            padding: 25,
            fontSize: 16,
        },
        '& tr:nth-child(even)': {
            'background-color': '#dddddd',
        }
    },
    headerClass: {
        backgroundColor: 'aliceblue',
    },
    apptop: {
        'margin-top': '10px'
    },
    appbg: {
        color: '#000',
        backgroundColor: 'white'
    },
    // link1: {
    //     'font-size': '12px',
    //     color: '#328EEB',
    // },
    // fontS: {
    //     'font-size': '12px',
    // },
    toolbar: {
        '& div': {
            display: 'flex',

        }
    },
    actionButton: {
        display: 'flex',
        background: '#27BB80',
        color: variables.white,
        'flex-direction': 'row',
        border: 'none',

        '&:hover': {
            backgroundColor: '#27BB80',
        },
        '&:focus': {
            backgroundColor: '#27BB80'
        },
    },
    header: {
        // fontSize: variables.fs_18,
        fontWeight: variables.f_600
    },
    arrow: {
        margin: '0 1px 0 1px',
        color: variables.subHeadingColor
    },
    fillspace: {
        'flex-grow': 1
    },
    link1: {
        fontSize: 15,
        color: '#328EEB',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    fontS: {
        fontSize: 15,
        color: variables.subHeadingColor
    },
    Actionmenus: {
        width: 24,
        height: 24,
        margin: '0',
        marginLeft: 15,
        float: 'right',
        display: 'flex',
        '& svg': {
            fill: variables.white,
            width: '100%',
            height: '100%',
            float: 'right',
        }
    },
    buttonGroup: {
        marginLeft: 12,
        marginTop: 12,
        marginBottom: 12
    },
    buttonPrimary: {
        borderColor: variables.darakGray,
        color: 'none',
        '&:hover': {
            borderColor: variables.darakGray,
            color: variables.black,
            backgroundColor: variables.white
        }
    },
    selectedButton: {
        borderBottomColor: variables.selectedButton,
        borderBottomWidth: 5
    }
});

export default styles;