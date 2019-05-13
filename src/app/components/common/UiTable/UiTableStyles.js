import variables from '../../../styles/variables';

const styles = theme => ({
    root: {
        width: '100%',
        minHeight: '74vh',
        height: '100%',
        overflowX: 'hide',
        // marginTop: theme.spacing.unit * 3,
        background: variables.white,
    },
    tableDiv: {
        width: '100%',
    },
    expansionTable: {
        display: 'table'
    },
    pagination: {
        color: variables.tableFontColor,
        '& div': {
            // float: 'left',
            paddingLeft: 10,
            '& span': {
                color: variables.tableFontColor,
                fontWeight: variables.f_500,
                fontSize: variables.fs_16,
                fontFamily: variables.barlow,
            },
            '& div': {
                color: variables.tableFontColor,
                fontWeight: variables.f_500,
                fontSize: variables.fs_16,
                fontFamily: variables.barlow,
                '& div': {
                    '& svg': {
                        color: variables.tableFontColor,
                        fontWeight: variables.f_500,
                        fontSize: variables.fs_24,
                        fontFamily: variables.barlow,
                        marginTop: 3
                    },
                },
            }
        }
    },
    tBodyStyle: {
        width: '100%',
        '& td': {
            color: variables.black,
            fontSize: variables.fs_16,
            '& span': {
                color: variables.black,
                fontSize: variables.fs_16,
            }
        },
        '& th': {
            padding: '0px 0px 0px 0px',
            fontSize: variables.fs_16,
            fontWeight: variables.f_600,
            color: `${variables.tableFontColor}!important`,
            '& h4': {
                fontSize: variables.fs_18,
                fontWeight: variables.f_600,
                color: `${variables.tableh4Color}!important`,
            },
            '& span': {
                color: `${variables.tableSpanColor}`,
                fontSize: variables.fs_15,
                fontWeight: variables.f_600,
                fontFamily: variables.barlow,
                display: 'flex',
                '&:hover': {
                    color: variables.black
                },
                '&:focus': {
                    color: variables.black
                },
                '& cursor': 'inherit',
            },
            '& p': {
                marginTop: '10px !important'
            },
            borderColor: `${variables.tableBorderColor} !important`,
        },
        '& th:nth-child(1)': {
            paddingLeft: '20px',
        },
        '& th:last-child': {
          //  width: '20px',
        },
    },
    statusConnectedColor: {
        color: `${variables.green2} !important`
    },
    statusPendingColor: {
        color: '#F5AF4A !important'
    },
    statusDisconnectedColor: {
        color: `${variables.red} !important`
    },
    checkboxcolumn: {
        width: `${100}px !important`
    },
    hashcolumn: {
        width: `${50}px !important`
    },
    fieldDataStyle: {
        '& th': {
            width: '10%',
            fontSize: variables.fs_16,
            fontWeight: variables.f_600,
            color: `${variables.tableFontColor}!important`,
            borderColor: `${variables.tableBorderColor} !important`,
            'border-bottom': 'none'
        }
    },
    actionDisplay: {
        display: 'inline-flex',
        float: 'right',
        '& button': {
            padding: '0px 5px'
        }
    },
    displayArray: {
        'flex-direction': 'column',
        display: 'flex'
    },
    Actionmenus: {
        width: 30,
        height: 30,
        //margin: '0',
        //float: 'left',
        //display: 'flex',
        cursor: 'pointer',
        '& svg': {
            fill: variables.white,
            width: 35,
            //height: 32,
            //float: 'left',
            //'margin-top': -6
        },
    },
    orangeColor: {
        '& svg': {
            '& path': {
                fill: `${variables.orange} !important`
            }

        },
    },
    expansionPanel: {
        backgroundColor: 'transparent !important',
        margin: 0
    },
    expansionPanelSummary: {
        padding: '0 !important',
    },
    expansionDetails: {
        'border-top': '2px solid lightgray',
        backgroundColor: '#F9F9F9 !important',
        height: 350,
        overflow: 'auto'
    },
    actionDisplay_Critical: {
        display: 'inline-flex',
        float: 'right',
        '& div': {
            '& button': {
                '& span': {
                    '& svg': {
                        '& rect': {
                            fill: `${variables.chipCritical} !important`
                        },
                        '& path': {
                            fill: `${variables.chipCritical} !important`
                        }
                    }
                }
            }
        }
    },
    actionDisplay_Normal: {
        display: 'inline-flex',
        float: 'right',
        '& div': {
            '& button': {
                '& span': {
                    '& svg': {
                        '& rect': {
                            fill: `${variables.chipNormal} !important`
                        },
                        '& path': {
                            fill: `${variables.chipNormal} !important`
                        }
                    }
                }
            }
        }
    },
    actionDisplay_Major: {
        display: 'inline-flex',
        float: 'right',
        '& div': {
            '& button': {
                '& span': {
                    '& svg': {
                        '& rect': {
                            fill: `${variables.chipMajor} !important`
                        },
                        '& path': {
                            fill: `${variables.chipMajor} !important`
                        }
                    }
                }
            }
        }
    },
    actionDisplay_Minor: {
        display: 'inline-flex',
        float: 'right',
        '& div': {
            '& button': {
                '& span': {
                    '& svg': {
                        '& rect': {
                            fill: `${variables.chipMinor} !important`
                        },
                        '& path': {
                            fill: `${variables.chipMinor} !important`
                        }
                    }
                }
            }
        }
    },
    actionDisplay_Warning: {
        display: 'inline-flex',
        float: 'right',
        '& div': {
            '& button': {
                '& span': {
                    '& svg': {
                        '& rect': {
                            fill: `${variables.chipWarning} !important`
                        },
                        '& path': {
                            fill: `${variables.chipWarning} !important`
                        }
                    }
                }
            }
        }
    },
    alignCenter: {
        textAlign: 'center' 
    },
});

export default styles;