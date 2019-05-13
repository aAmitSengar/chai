import variables from '../../../styles/variables';

const styles = theme => ({
    tableClass: {
        width: '85%',
        marginLeft: '15%',
        '& thead': {
            'border-bottom': 'none !important',
            '& th': {
                'border-bottom': 'none !important',
            },
        },
        '& td': {
            'border-top': 'none !important',
        },
        '& th': {
            'border-top': 'none !important',
        },
        '& tbody': {
            '& tr': {
                'border-bottom': '1px solid #EAEAEA',
                '& td': {
                    width: '0% !important',
                }

            }
        }
    },
    headerClass: {
        fontFamily: variables.barlow
    },
    tbodyClass: {
        fontFamily: variables.barlow,
        fontSize: 16
    }
});

export default styles;