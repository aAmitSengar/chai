import variables from '../../../../styles/variables';
const styles = theme => ({
    root: {
        width: '100%',
        minWidth: 360,
        backgroundColor: variables.white,
        maxHeight: '52vh',
        display: 'flex',
        'flex-direction': 'row',
        '& div': {
            overflow: 'hidden',
            backgroundColor: variables.white,
        }
    },
    root1: {
        width: '100%'
    },
    container1: {
        margin: '0',
        marginTop: 30,
        height: 'auto',
        overflowY: 'auto !important',
        border: '1px solid #E0E0E0'
    },
    container2: {
        flexGrow: 1,
        backgroundColor: variables.white,
        color: variables.black,
        margin: '0',
        marginTop: 30,
        marginLeft: '15%',
        height: 'auto',
        overflowY: 'auto !important'
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    expansionPanel: {
        backgroundColor: variables.white,
        color: variables.black,
        '& p': {
            color: variables.black,
        },
        '& span': {
            color: variables.black,
        }
    },
    heading: {
        fontSize: variables.fs_18,
        fontWeight: variables.f_500,
    },
    rolesList: {
        border: '1px solid #E0E0E0',
        'flex-direction': 'column',
        '& li': {
            'borderBottom': '1px solid #E0E0E0'
        },
        '& div': {
            // backgroundColor: variables.black,
            display: 'flex',
            'flex-direction': 'row',
            '& span': {
                color: variables.black,
            },
            '& svg': {
                color: variables.red,
                cursor: 'pointer'
            }
        }
    },
    selectedCounter: {
        color: variables.lightBlack,
        fontSize: variables.fs_16,
        fontWeight: variables.f_600,
        fontFamily: variables.SecondaryFont,
        textAlign: 'right',
        marginRight: '1px'

    },
    selectedHeading: {
        color: variables.lightBlack + '! important',
        fontSize: variables.fs_14,
        fontWeight: variables.f_400,
    },
    expsmry: {
        '& div:nth-child(1)': {
            paddingLeft: '10%',
            display: 'flex',
            flexDirection: 'row',
            '& p': {
                "flex-grow": 1,
                marginTop: 10
            },
            '& span': {
                marginRight: 6
            }
        },
        '& div:nth-child(2)': {
            left: 0
        }
    }
});

export default styles;