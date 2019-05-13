import variables from '../../../styles/variables';
const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor:variables.black,
        width: "100%",
        borderRadius:0,
        marginBottom:14
        
    },
    contextualTab:{
        marginBottom:'0',
        marginTop:'0',
        backgroundColor:variables.black,
        '& :nth-child(1n)':{
            marginBottom:'0',
            marginTop:'0',
        },
        
    },    
   
    borderColor: {
        border: '2px solid grey'
    },
    tabRoot : {
        width:'100%',
        margin:0
    },
    active: {
        color: `${variables.white} !important`,
    },
    inactive:{
        color: `${variables.darakGray} !important`,        
    },
    item:{
        justifyContent:'space-between',
        flex:1,
        fontWeight: variables.f_700,
        fontSize: 18
    },
    select: {
        width: "40px"
    },
    caret: {
       top:5,
       paddingLeft:5
    },
    submenuItem:{
        display:'flex',
        width:'100%',
        color:variables.white
    },
    menuChild:{
        // flex:1,
    },
    menuLabel:{
        marginLeft:10,
        flex:2
    },

    rightAlign:{
        textAlign:'right',
        flex:1
    },
    
    critical:{
        color:variables.red,
    },
    major:{
        color:variables.orange
    },
    minor:{
        color:variables.darkyellow
    },
    warning:{
        color:variables.blue
    },
    success : {
        color:variables.lightgreen
    },
    clearFix:{
        clear:'both'
    },
    expansionPanel:{
        flexDirection:'column'
    },
    verticalLine:{
        borderLeft: `1px solid ${variables.darakGray}`,
    },
    contextualMenuItem:{
        lineHeight: 1,
        //height: 5
        paddingLeft:0,
        paddingRight:0
    },
    plvFilterIcon:{
        maxWidth:15,
        margin:5
    },

    menuContainer:{
        width: "100%",
        paddingTop:10,
        paddingLeft: 30,
    },
    menuContainerDisplay: {
        display: 'inline-flex'
    },
    menuItem:{
        flex:1
    },
    manageKpi:{
        height:40,
        width:150,
        marginRight:12,
        float: 'right',
        backgroundColor:variables.lightgreen,
    },
    margginLeft: {
        margginLeft: 58
    }
});

export default styles;