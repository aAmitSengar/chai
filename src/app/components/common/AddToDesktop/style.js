import variables from '../../../styles/variables';
const a2hStyles = theme => ({
    'addtohomebanner': {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        fontFamily: variables.primaryFont, 
        background: '#51a54f',
        color: 'black',
        textAlign: 'center',
        '-webkit-user-select': 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    "addtohomecontent": {
        display: 'none',
        alignItems: 'center',
        cursor: 'pointer'
    },

    "addtohomeicon": {
        width: 32,
        height: 32,
        // padding: 10,
        // paddingRight: 0
        marginLeft:10
    },

    "addtohometext": {
        display: 'inline-block',
        fontSize: 16,
        paddingLeft: 10,
        marginTop: 16
    },

    "addtohomeclosebtn": {
        display: 'inline-block',
        position: 'relative',
        right: 4,
        float: 'right',
        fontSize: 32,

    }

});

export default a2hStyles;