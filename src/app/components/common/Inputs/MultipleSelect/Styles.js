import variables from '../../../../styles/variables';
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    color: 'black',

    '& div': {
      color: variables.gray1,
      '& svg': {
        color: variables.black
      }
    }
  },
  formControl: {
    margin: '0',
    minWidth: 120,
    'flex-grow': 1,
    '& label': {
      color: variables.black
    },
  },
  listItem: {
    color: variables.white,
  },
  selectItem: {
    background: variables.white,
    // '& div': {
    //   '& div': {
    //     background: variables.white,
    //     color: variables.black,
    //   }
    // },
  },
  select:{
    border: '1px solid ' + variables.borderColor
  },
  menuItem: {
    //border: '1px solid ' + variables.borderColor,
    '& div:nth-child(1)': {
      marginLeft: 5
    },
    backgroundColor: variables.white,
    '& span': {
      color: variables.black,
      textTransform:'capitalize'
    },
    '&:active': {
      backgroundColor: variables.white,
    },
    '&:hover': {
      backgroundColor: variables.white,
    },
    '&:focus': {
      backgroundColor: variables.white,
    },
  },
  multiselectlist: {
    '& ul': {
      maxHeight: 200,
      overflowY: 'scroll'
    },
    // '& div:nth-child(2)':{
    //   top:'160px !important'
    // }
  }
});

export default styles;