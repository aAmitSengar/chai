import variables from '../../../styles/variables';
const styles = theme => ({
    rootDialogue: {
        backgroundColor: variables.white,
    },
    innerContainer: {
        background: variables.white,
        color: variables.black,
        maxWidth: '100%'
    },
    dialogueHeading: {
        // background: variables.white,
        // color: variables.black,
        padding: '30px 0px 18px 23px',
        margin: 0,
    },
    dialogAction: {
        backgroundColor: 'white !important',
        margin: '10px 10px 15px 10px'
    }
});

export default styles;