import variables from '../../../styles/variables';

const toolbarStyles = theme => ({
    root: {
        backgroundColor: variables.headerGrey,
        '& thead': {
            width: '100%',
            '& tr':{
                '& th':{
                    textAlign: 'left'
                }
            }
        },
        '& tr': {
            '& th': {
                width: 'auto',
                padding: '0px 0px 0px 0px',
                borderColor: '#C1C1C1 !important',
                '& span': {
                    color: variables.tableHeadetTextColor,
                    fontSize: variables.fs_16,
                    fontWeight: variables.f_600,
                    fontFamily: variables.barlow,
                    '&:hover': {
                        color: variables.black
                    },
                    '&:focus': {
                        color: variables.black
                    },
                    '& cursor': 'inherit'
                }
            },
            '& th:nth-child(1)': {
                paddingLeft: '20px !important',
                // width: 'auto !important'
            },
        }
    },
});

export default toolbarStyles;