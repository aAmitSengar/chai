import variables from '../../../styles/variables';

const styles = theme => ({
    addUser: {
       // display: 'flex',
        flexGrow: 1,
        backgroundColor: variables.white,
        overflow: 'hidden',
        overflowY: 'scroll',
        margin: '0',
        'flex-direction': 'column',
        width: 'auto'
    },
    paper: {
        //   padding: theme.spacing.unit * 2,
        //   textAlign: 'center',
        //   color: theme.palette.text.secondary,
    },
    userImage: {
        width: 200,
        height: 200,
        'border-radius': 100,
        margin: '0 0 0px 30%',
        border: "1px solid black",
        '& svg': {
            width: 50,
            height: 50,
            margin: '69px 0 0 72px'
        }

    },
    PlusButton: {
        // margin: 'auto', 
        '& svg': {
            width: 50,
            height: 50,
            margin: '152px 0 0 -57px',
            fill: variables.green,
            display: 'flex'
        }
    },
    innerDiv: {
        display: 'flex',
        'flex-grow': 1,
        'flex-direction': 'row',
    },
    addUser_form: {
        display: 'flex',
        'flex-direction': 'column',
        'margin': '10px 20px'
    },
    addUser_innerDiv_custom: {
        display: 'flex',
        'flex-direction': 'row',
        marginTop: '20px',
    },
    addUser_innerDiv: {
        display: 'flex',
        'flex-direction': 'row',
        marginTop: 10,
        //marginRight: 10,
        '& div': {
            width: '100%',
            // 'margin-right': '10px'
        }

    },
    filterHead: {
        fontFamily: variables.SecondaryFont,
        fontWeight: 500,
        fontSize: 14,
        color: variables.lightBlack
    },
    dropdownItem: {
        display: 'flex',
        flexDirection: 'column',
        'flex-grow': 1,
         margin: 5,
        // '& button': {
        //     width: '100% !important'
        // }
    },
    removeRightMargin: {
        marginRight: 0
    },
    dividerClass: {
        backgroundColor: variables.gray,
        width: '98%',
        margin: '20px 0 10px 0',
        marginRight: 10
    },
    addUser_actions: {
        display: 'flex',
        'flex-direction': 'row-reverse',
        margin: '20px 0px 10px'
    },
    input: {
        'flex-grow': 1,
        margin:'20px 10px 0 0'

    },
    listDivsPrev: {
        margin: '10px 10px 10px 33px',
        maxHeight: '30vh',
        // overflowY: 'scroll !important',
        overflow: 'auto !important'
    },
    listDivsPrevNode:{
        maxHeight: '30vh',
        overflow: 'auto !important',
        border: '1px solid #d2d2d2',
    },
    nodes:{
        display: 'flex',
        borderBottom: '1px solid #d2d2d2',
        padding: 10,
        fontFamily: 'barlow'
    },
    nodeTitle:{
        color: '#666666',
        fontSize: 12,
        fontFamily: 'Montserrat',
        fontWeight: 500
    }
});

export default styles;