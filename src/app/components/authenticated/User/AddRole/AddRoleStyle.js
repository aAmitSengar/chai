import variables from '../../../../styles/variables';

const styles = theme => ({
    container: {
        // display: 'flex',
        flexGrow: 1,
        backgroundColor: variables.white,
        color: variables.black,
        // overflow: 'hidden',
        margin: '0',
        marginTop: 30,
        marginBottom: 60,
        'flex-direction': 'column',
        minWidth: '50vw',
        width: 'auto'
    },
    expansionPanel: {
        marginTop: '2px',
        backgroundColor: variables.white,
        color: variables.black,
        flexGrow: 1,
        'box-shadow': 'none',
        margin: '10px'
    },


    dividerClass: {
        backgroundColor: variables.gray,
        width: '98%',
        margin: '0 0 10px 0',
    },
    container1: {
        display: 'flex',
        backgroundColor: variables.white,
        color: variables.black,
        // overflow: 'hidden',
        margin: '0',
        marginTop: 10,
        'flex-direction': 'column',
    },
    container2: {
        display: 'flex',
        backgroundColor: variables.white,
        color: variables.black,
        overflow: 'hidden',
        margin: '0',
        marginTop: 30,
        'flex-direction': 'row',
    },
    addRole_actions: {
        display: 'flex',
        'flex-direction': 'row-reverse',
        margin: '14px 8px 20px 4px'
    }
});

export default styles;