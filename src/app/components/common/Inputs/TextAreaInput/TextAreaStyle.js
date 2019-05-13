import variables from '../../../../styles/variables';
const styles = theme => ({

    container: {
        display: 'flex',
        flexWrap: 'wrap',
        color: variables.black,
        marginTop: 10
    },
    bootstrapRoot: {
        padding: 0,
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    bootstrapInput: {
        borderRadius: 0,
        color: variables.black,
        backgroundColor: variables.white,
        border: '1px solid #ced4da',
        fontSize: variables.fs_16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: variables.textbox_border,
            boxShadow: '0 0 0 0.1rem #E4E4E4',
        },
    },
    bootstrapFormLabel: {
        fontSize: 18,
        color: variables.black,
        fontWeight: variables.f_500
    },

});

export default styles;