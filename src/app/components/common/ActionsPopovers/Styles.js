

import variables from '../../../styles/variables';
const componentStyles = theme => ({
    leftMarginForAction: {
        marginLeft: 10,
        display: 'flex'
    },
    button: {
        background: variables.whiteColor,
        color: variables.black,
        'border': '1px solid #CACACA',
        'border-radius': 0,
        // display: 'flex'
    },
    ActionmenuIcons: {
        height: 18,
        width: 18,
        'margin': '0',
        '& svg': {
            fill: variables.white,
            margin:'0px -5px 0px 0px',
            width: 18,
            height: 18,
        }
    },
    container: {
        'color': variables.black,
        'display': 'flex',
        'flex-direction': 'column',
        backgroundColor: variables.white
    },
    actionButton: {
        background: variables.whiteColor,
        color: variables.button,
        'flex-direction': 'row',
        border: 'none'

    },   
    Actionmenus: {
        width: 24,
        height: 24,
        margin: '0',
        float: 'left',
        display: 'flex',
        '& svg': {
            fill: variables.white,
            width: 32,
            height: 32,
            float: 'left',
            'margin-top': -6
        }
    },
    dividerClass: {
        backgroundColor: variables.divider_color,
        width: '100%',
        marginTop: 10,
        marginBottom: 10
    },

});

export default componentStyles;