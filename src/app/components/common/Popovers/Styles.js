import variables from '../../../styles/variables';
const styles = theme => ({
    paper:{
        backgroundColor:variables.white,
        padding:15
    },
    popover: {
        maxWidth: '100%',
       // marginLeft: '7%'
    },
    popoverHeading: {
        fontFamily:variables.primaryFont,
        fontSize:24,
        margin: 15,
        fontWeight: variables.f_600
    }

});

export default styles;