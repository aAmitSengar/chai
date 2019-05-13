import variables from '../../../../styles/variables';
const styles = theme => ({
    info: {
        display: 'flex',
        'flex-direction': 'column',
        backgroundColor: variables.white,
        'flex-grow': 1,
        minWidth: '25vw'
    },
    dividerClass: {
        backgroundColor: variables.gray,
        width: '100%',
        // margin: '10% 1% 3% 6%',
    },
    closeDiv: {

    },
    CloseButton: {
        margin: 'auto',
        cursor: 'pointer',
        float: 'right',
        width: 30,
        height: 30,
        '& svg': {
            // width: 50,
            // height: 50,
        }
    },
    headContainer: {
        'flex-direction': 'row',
        display: 'flex',
        // minHeight: 280
        margin: 10
    },
    userDetail: {
        'flex-direction': 'column',
        display: 'flex',
    },
    UserImageDiv: {
        minWidth: 100,
        margin: '10px 10px 0px 33px'
    },
    listDivs: {
        margin: '10px 10px 10px 33px',
        
    },
    listDivsPrev: {
        margin: '10px 10px 10px 33px',
        maxHeight: '30vh',
        // overflowY: 'scroll !important',
        overflow: 'auto !important'
    },
    LeftLabel: {
        fontFamily: variables.primaryFont,
        color: variables.black,
        fontWeight: variables.f_500,
        fontSize: variables.fs_16,
    },
    RightLabel: {
        fontFamily: variables.primaryFont,
        color: variables.lightBlack,
        fontWeight: variables.f_500,
        fontSize: variables.fs_16,
    },
    UserName: {
        fontFamily: variables.primaryFont,
        fontWeight: variables.f_600,
        fontSize: variables.fs_18,
        textTransform: 'capitalize'
    },
    detail: {
        margin: '5px 0 15px 0px'
    },
    displayArray: {
        'flex-direction': 'column',
        display: 'flex',
        margin: '18px 5px 4px 13px'
    }

});

export default styles;