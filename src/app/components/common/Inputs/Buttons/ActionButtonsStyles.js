import variables from '../../../../styles/variables';
const actionButtonStyles = theme => ({
    Actionmenus: {
        width: 30,
        height: 30,
        //margin: '0',
        //float: 'left',
        //display: 'flex',
        '& svg': {
            fill: variables.white,
            width: 35,
            //height: 32,
            //float: 'left',
            //'margin-top': -6,
            '& rect, & path': {
                fill: '#777 !important'
            }
        }
    },
    cancelButton: {
        minWidth: 0
    },
    closeClassRed: {
        color: variables.red,
        border: '2px solid',
        borderColor: '#F5F5F5'
    },
    closeClassGreen: {
        color: variables.green,
        border: '1px solid',
        borderColor: variables.green
    },
    lightTooltip: {
        background: variables.white,
        color: variables.black,
        boxShadow: theme.shadows[1],
        fontSize: 11,
        fontFamily: variables.SecondaryFont
    },
    actionButton: {
        display: 'flex',
        background: '#27BB80',
        fontFamily: variables.SecondaryFont,
        textTransform: 'capitalize',
        fontSize: 16,
        color: variables.white,
        marginRight: 8,
        'flex-direction': 'row',
        border: 'none',

        '&:hover': {
            backgroundColor: '#27BB80',
        },
        '&:focus': {
            backgroundColor: '#27BB80'
        },
    },
    Actionmenus_defaultAdd: {
        width: 24,
        height: 24,
        margin: '0',
        marginLeft: 15,
        float: 'right',
        display: 'flex',
        '& svg': {
            fill: variables.white,
            width: '100%',
            height: '100%',
            float: 'right',
        }
    },
    actionButton_exportdata: {
        background: variables.white,
        color: variables.alertExportDataTextColor,
        fontFamily: variables.SecondaryFont,
        fontSize: variables.fs_14,
        margin: '0 5px 0 5px',
        border: '1px solid',
        flexDirection: 'row-reverse',
        display: 'flex',
        '&:hover': {
            backgroundColor: variables.white,
            color: variables.black,
            fontFamily: variables.SecondaryFont,
            fontSize: variables.fs_14,
        },
        '&:focus': {
            backgroundColor: variables.white,
            color: variables.black,
            fontFamily: variables.SecondaryFont,
            fontSize: variables.fs_14,
        },
        '&:disabled': {
            color: 'rgba(45, 40, 40, 0.3)'
        }
    },
    actionmenus_exportdata: {
        width: 24,
        height: 24,
        margin: '0px 17px 0 0',
        // marginLeft: 15,
        float: 'right',
        display: 'flex',
        '& svg': {
            width: '100%',
            height: '100%',
            float: 'right',
            '& path': {
                fill: variables.alertExportDataIconColor,
            }
        }
    },
    actionButton_download: {
        display: 'flex',
        fontFamily: variables.SecondaryFont,
        textTransform: 'capitalize',
        fontSize: 16,
        background: '#27BB80',
        color: variables.white,
        'flex-direction': 'row',
        border: 'none',
        '&:hover': {
            backgroundColor: '#27BB80',
        },
        '&:focus': {
            backgroundColor: '#27BB80'
        },
    },
    Actionmenus_download: {
        width: 24,
        height: 24,
        margin: '0',
        marginLeft: 15,
        float: 'right',
        display: 'flex',
        '& svg': {
            fill: variables.white,
            width: '100%',
            height: '100%',
            float: 'right',
            '& path': {
                fill: 'white !important'
            }
        }
    },
    actionButton_multiEdit: {
        background: variables.whiteColor,
        color: variables.lightBlack,
        'flex-direction': 'row',
        border: 'none'
    },
    actionmenus_multiEdit: {
        width: 24,
        height: 24,
        margin: '0 12px 0 0',
        float: 'left',
        display: 'flex',
        '& svg': {
            width: 32,
            height: 32,
            float: 'left',
            'margin-top': -2,
            '& path': {
                fill: variables.lightBlack,
            }
        }
    },
    actionButton_multiexportdata: {
        background: variables.whiteColor,
        color: variables.lightBlack,
        'flex-direction': 'row',
        border: 'none'
    },
    actionmenus_multiexportdata: {
        width: 24,
        height: 24,
        margin: '0 12px 0 0',
        float: 'left',
        display: 'flex',
        '& svg': {
            width: 32,
            height: 32,
            float: 'left',
            'margin-top': -2,
            '& path': {
                fill: variables.lightBlack,
            }
        }
    },
    KPIButton: {
        background: variables.whiteColor,
        color: variables.black,
        'border': '1px solid #CACACA',
        'border-radius': 0,
        display: 'flex',
        textTransform: 'capitalize'
    },
    menuIcons_KPIButton: {
        height: 24,
        width: 24,
        'margin': '-3px 10px 0 0',
        '& svg': {
            fill: variables.white,
            width: 32,
            height: 32,
        }
    },
    Notify_KPIButton: {
        background: variables.whiteColor,
        color: variables.black,
        'border': '1px solid #CACACA',
        'border-radius': 0,
        display: 'flex',
        textTransform: 'capitalize'
    },
    menuIcons_Notify_KPI: {
        height: 24,
        width: 24,
        'margin': '-3px 20px 0 0',
        '& svg': {
            fill: variables.white,
            width: 32,
            height: 30,
        }
    },
    kpiBox: {
        //borderLeft: '6px solid #328EEB'
        color: variables.lighterGray,
    },
    activeLink: {
        borderLeft: `3px solid ${variables.blue}`,
        color: variables.white,
        '& p': {
            color: variables.white
        }
    },
    menuIcons: {
        height: 40,
        width: 40,
        marginLeft: 'auto',
        '& svg': {
            fill: '#5A5B5F',
            '& path': {
                fill: '#5A5B5F'
            }
        }
    },
    activeIcon: {
        height: 40,
        width: 40,
        marginLeft: 'auto',
        '& svg': {
            fill: variables.white,
            '& path': {
                fill: variables.white
            }
        }
    },
    itemLbl: {
        position: "absolute",
        paddingTop: 60,
        paddingLeft: 22,
        width: '100%',
        textAlign: 'center'
    },
    lightTooltip1: {
        background: variables.white,
        color: variables.black,
        boxShadow: theme.shadows[1],
        fontSize: 11,
        fontFamily: variables.SecondaryFont,
        '& span':{
            color:'#3293f5 !important'
        }
    },
    barClass:{
        backgroundColor:'#000',
    },
    check:{
        color:'#3293f5 !important'
    },
    base:{
        color:'#fff'
    }

});

export default actionButtonStyles;