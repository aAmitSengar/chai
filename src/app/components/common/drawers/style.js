import variables from '../../../styles/variables';
const styles = theme => ({
    root: {
        overflow: 'visible',
        ':nth-child(2)': {
            top: 90
        }
    },

    paper: {
        overflowY: 'auto',
        overflowX: 'hidden',
        // overflowY:'scroll',
        // ':nth-child(2)': {
        top: '8.3%',
        bottom: 0,
        // height: '91%',
        backgroundColor: variables.white,
        // }
        height:'91vh'
    },
    '@media screen and (max-width: 947px)': {
        paper: {
            width: '100vw'
        }
    },
    
});

export default styles;