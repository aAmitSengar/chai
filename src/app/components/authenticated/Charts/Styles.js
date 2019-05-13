import variables from '../../../styles/variables';
const styles = theme => ({

    chatCnt:{
        position:'relative',
        height:'100%',
        width:'100%',
        paddingTop:0,
        cursor:'pointer'
    },

    pieContainer: {
        marginLeft: '10%',
        '& svg': {
            cursor: 'pointer',
            '& path': {
                stroke:'none'
            }
        }
    },
    areaContainer: {
        background: variables.whiteColor,
        'box-shadow': 'none',
        'color': variables.white,
    }, 
    areaContainer1: {
        background: variables.whiteColor,
        'box-shadow': 'none',
        'color': variables.white,
        'height':'200px',
        'max-width':'1000px'
    },
    chartStyle: {
        'width':'100%'
    },
    title: {
        'color': variables.black,
        'font-weight': variables.f_800,
        'font-size': variables.fs_12
    },
    marginLeft: {
        marginLeft: 50
    },
    centerText:{
        display:'flex',
        flexDirection:'column'
    },
    centerItem:{
        color:variables.white,
    },
    centerItemLbl:{
        color:variables.lighterGray
    },
    pieChartIndicate:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
        textAlign:"center",
        position:'absolute',
        display:'flex',
        flexDirection:'column'
    },
    statCount:{
        fontSize:variables.fs_24
    },
    statLbl:{
        marginTop:5
    },
    label:{
        fill:'red',
        marginLeft:10
    },
    chat:{
        backgroundColor:'red'
    }
});

export default styles;