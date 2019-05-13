import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './Styles'

class MultipleSelects extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.defaultValue || [],
    };
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
    this.props.handleSelected(event.target.value)
  };

  // handleClose = event => {
  //       console.log('aaaaaaaaaaaaaaaaaaaaaaa')
  //   if (typeof (this.props.handleClose) === 'function') {
  //     this.props.handleClose(event.target.value)
  //   }
  // };

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({
        name: nextProps.defaultValue
      });
    }
  }
  render() {
    const { classes, item } = this.props;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          {/* <InputLabel htmlFor="select-multiple-checkbox">{label || 'Select'}</InputLabel> */}
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            // onClose={event=> console.log(event)}
            displayEmpty={true}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.length > 0 ? +" " + selected.length + " Selected" : "Select"}
            
            MenuProps={{
              className: classes.multiselectlist,
            }}
            classes={{ root: classes.select, selectMenu: classes.menuItem }}
          >
            {item.map(name => (
              <MenuItem className={classes.menuItem} style={{ minWidth: (this.props.minWidth) ? this.props.minWidth : 200 }} color={'primary'} key={name} value={name}>
                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </div>
    );
  }
}

MultipleSelects.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelects);