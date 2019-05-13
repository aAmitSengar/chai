import variables from '../../../../styles/variables';
const styles = theme => ({

    container: {
        display: 'flex',
        flexWrap: 'wrap',
        color: variables.black
    },
    cancelButton: {
        backgroundColor: variables.white,
        color: variables.darkgray,
        'text-transform': 'capitalize',
        textDecoration: 'underline',
        border: 'none'
    },
    lightTooltip: {
        background: variables.white,
        color: variables.black,
        boxShadow: theme.shadows[1],
        fontSize: 11,
        fontFamily: variables.SecondaryFont
    }
});

export default styles;