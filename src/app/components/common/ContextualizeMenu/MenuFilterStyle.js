import variables from '../../../styles/variables';

const styles = theme => ({

    buttnCnt:{
        display:'flex',
        flexDirection:'column'
    },
    filterTitle:{
        flex:1,
        marginBottom:0
    },
    filterSubTitle: {
        flex:1,
        color: variables.lighterGray,
        marginBottom:0,
        
    },
    plvFilterIcon:{
        maxWidth:15,
        margin:5
    },
    menuFilter: {
        display: 'inline-block',
        marginLeft:10,
        //marginBottom:10
    },
    color:{
        color:'black'
    }
});

export default styles;