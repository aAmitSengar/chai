import variables from '../../../styles/variables';
export const CardStyle = {
    card: {
        minWidth: 150,
        backgroundColor:variables.widget_background,
    },
    cardheader:{
        paddingBottom:5,
    },
    cardContent:{
        paddingTop:5,
        paddingBottom:0
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 5,
        fontSize: 32,
        fontWeight:600,
        paddingTop:0,
        cursor: 'pointer'
    },
    pos: {
        marginBottom: 12,
    },
}