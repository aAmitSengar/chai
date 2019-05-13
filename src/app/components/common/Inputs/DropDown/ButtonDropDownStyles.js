//import variables from '../../../../styles/variables';
const styles = theme => ({

    buttonDisplay: {
        display: 'block'
    },
    select: {
        '& .btn-secondary': {
            backgroundColor: 'white',
            color: 'black',
            borderRadius: 0
        },
        '& .dropdown-menu': {
            height: '145px',
            overflow: 'auto'
        },
        flex: 1
    }
});

export default styles;