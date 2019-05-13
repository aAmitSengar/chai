import variables from '../../../../styles/variables';
const styles = theme => ({

    container: {
        display: 'flex',
        flexWrap: 'wrap',
        color: variables.black
    },
    submitButton: {
        backgroundColor: variables.lightgreen,
        'text-transform': 'capitalize',
        '&:hover': {
            backgroundColor: variables.lightgreen,
        },
        '&:active': {
            backgroundColor: variables.lightgreen,
        }
    },
    customButton: {
        backgroundColor: variables.lightestgray,
        color: variables.black,
        'text-transform': 'capitalize',
        '&:hover': {
            backgroundColor: variables.lightestgray,
        },
        '&:active': {
            backgroundColor: variables.lightestgray,
        }
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