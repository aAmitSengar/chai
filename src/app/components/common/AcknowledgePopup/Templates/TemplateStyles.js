import variables from '../../../../styles/variables';
const componentStyles = theme => ({
    securityLevelsroot: {
        display: 'flex',
        'flex-direction': 'column',
        margin: 1,
        width: '100%'
    },
    securityInnedDiv: {
        display: 'flex',
        'flex-direction': 'column',
        minWidth: 138
    },
    rigthAlign: {
        float: 'right',
        margin: '6px 10px 0 0'
    },
    securityLevel: {
        color: variables.black
    },

});

export default componentStyles;