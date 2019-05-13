import variables from '../../../styles/variables';
const componentStyles = theme => ({
    securityLevels: {
        display: 'flex',
        'flex-direction': 'row',
    },
    headerButtons: {
        background: variables.lightdarkgrayWhite
    },
    button: {
        background: variables.whiteColor,
        color: variables.black,
        'border': '1px solid #CACACA',
        'border-radius': 0,
        display: 'flex'
    },
    menuIcons: {
        height: 24,
        width: 24,
        'margin': '-3px 20px 0 0',
        '& svg': {
            fill: variables.white,
            width: 32,
            height: 32,
        }

    },
    popoverTextBoxMargin: {
        margin: '10px'
    },
    inputlabel: {
        color: variables.black,
        fontSize: variables.fs_16,
        fontWeight: variables.f_500,
        margin: '0'
    },
    input: {
        borderRadius: 4,
        color: variables.black,
        border: '1px solid #E0E0E0',
        fontSize: variables.fs_16,
        marginLeft: -5
    },
    // Separate this part into it's own CSS class
    inputFocused: {
        color: variables.black,
        borderColor: '#E0E0E0',
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

export default componentStyles;