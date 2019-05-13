import variables from '../../../styles/variables';
const componentStyles = theme => ({
    container: {
        'color': variables.black,
        'display': 'flex',
        'flex-direction': 'column'
    },
    button: {
        background: variables.whiteColor,
        color: variables.black,
        'border': '1px solid #CACACA',
        'border-radius': 0,
        display: 'flex'
    },
    component: {
        display: 'flex',
        flex: '1 auto',
        color: variables.black,
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
    popoverContainer: {
        display: 'flex',
        flex: '1 auto',
        'flex-direction': 'column',
        width: '600px',
        margin: '10px'
    },
    inputFocused: {
        color: variables.black,
        borderColor: variables.notify_gray,
    },
    actionContainer: {
        'color': variables.black,
        'display': 'flex',
        'flex-direction': 'row-reverse',
        margin: '38px -12px 0 0;'
    },
    orLabel: {
        margin: '10px 30px 0px 30px',
        color: variables.darkgray,

    },
    formControl: {
        margin: 10,
    },
    marginfromtop: {
        marginTop: 10
    }
});

export default componentStyles;