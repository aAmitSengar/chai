import variables from '../../../../styles/variables';
const styles = theme => ({

    container: {
        // display: 'flex',
        flexWrap: 'wrap',
        // color: variables.black
    },
    
    input: {
        borderRadius: 0,
        color: variables.black,
        border: '1px solid #E0E0E0',
        fontSize: 20,
        fontFamily: variables.SecondaryFont,
        // marginLeft: -5
    },
    label: {
        color: variables.black,
        fontFamily: variables.SecondaryFont,
        fontWeight: variables.f_500,
        fontSize: variables.fs_1, 
    },
    bootstrapRoot: {
        padding: 0,      
        'label + &': {
            marginTop: theme.spacing.unit * 3,
            fontFamily: variables.SecondaryFont,
        },
    },
    bootstrapInput: {
        borderRadius: 0,
        fontFamily: variables.SecondaryFont,
        fontWeight: variables.f_500,
        fontSize: variables.fs_14,
        color: variables.lightBlack,
        backgroundColor: variables.white,
        border: '1px solid '+ variables.borderColor,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderColor: variables.textbox_border,
            boxShadow: '0 0 0 0.1rem #E4E4E4',
        },
    },
    bootstrapFormLabel: {
        fontFamily: variables.SecondaryFont,
        color: variables.lightBlack,
        fontWeight: variables.f_500,
        fontSize: variables.fs_15,
        '& span':{
            color:variables.red
        }
    },
    errorClass:{
        color: variables.text_box_error,
        fontFamily: variables.SecondaryFont,
    }

});

export default styles;