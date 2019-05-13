import variables from '../../../styles/variables';
const styles = theme => ({
    container :{
        width:'100%',
        height:38,
        border:`1.89px solid ${variables.lightGray}`,
        fontSize:15,
        color:variables.lighterGray,
        lineHeight:2,
        paddingLeft:8,
        overflow:'hidden',
        cursor: 'pointer'
    },
    menuIcons:{
        width:37,
        height:10,
        float:'left',
        cursor:'pointer',
        '& svg': {
            fill: variables.lightGray
        }
    },
    menubtn:{
        height:10,
        float:'right',
        marginTop:1,
        lineHeight:0,
        cursor:'pointer'
    },
    button:{
        borderRadius: 2,
        backgroundColor: variables.green1,
        width: 67,
        height: 32,
        color:variables.white,
        border:'none',
        fontSize:15
    },
    error:{
        border:`1px solid ${variables.red}`,
      }
});

export default styles;