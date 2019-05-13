import variables from '../../../styles/variables';
const styles = theme => ({

    container: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
        color:variables.black,
      },
      menu: {
        width: 200,
      },
      inputroot:{
          border:`1.87px solid ${variables.lightGray}`,
          color:variables.black,
          paddingLeft:8,
          height:38
      },
      textLabel: {
        fontSize: 18,
        color: variables.black,
        fontWeight: variables.f_500
    },
    error:{
      border:`1px solid ${variables.red}`,
    },
    disabled:{
      color:variables.black,
      cursor:'not-allowed'
    }

});

export default styles;