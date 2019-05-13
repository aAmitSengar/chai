import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import styles from './TextStyle';
import _ from 'lodash'
// eslint-disable-next-line no-useless-escape
const EmailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const LattersOnly = /^[a-zA-Z0-9_]+$/;
const LattersWithSpaceOnly = /^[a-zA-Z ]+$/;
const MobilenoCheck = /^[0-9]*$/; ///^(\+\d{1,3}[- ]?)?\d{10}$/
const UnixPathCheck = /^\/([a-zA-Z0-9.\-._]+([ ][a-zA-Z0-9.\-._]+)*\/)*([a-zA-Z0-9.\-._]+([ ][a-zA-Z0-9.\-._]+)*)*$/;

class CustomTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidated: false,
      defaltValue: this.props.defaultValue,
      errorText: '',
      value: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editUserData !== this.props.editUserData) {
      this.setState({
        defaltValue: nextProps.defaultValue
      });
    }
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({
        defaltValue: nextProps.defaultValue
      });
    }
  }
  validateEmail(event) {
    var isValidEmail = !!event.target.value.match(EmailCheck);
    if (isValidEmail) {
      this.setState({ errorText: '' })
    } else {
      this.setState({
        errorText: 'Invalid Email ',
        isValidated: false
      })
    }
  }

  validateAlphaOnly(event) {
    var isValidinput = !!event.target.value.match(LattersOnly);
    if (isValidinput) {
      this.setState({ errorText: '' })
    } else {
      this.setState({
        errorText: 'Only latters are allowed',
        isValidated: false
      });
      let str = (String(event.target.value).slice(0, -1));
      event.target.value = str;
    }
  }

  validateAlphaWithSpaceOnly(event) {
    var isValidinput = !!event.target.value.match(LattersWithSpaceOnly);
    if (isValidinput) {
      this.setState({ value: event.target.value, errorText: '' })
    } else {
      this.setState({
        value: event.target.value,
        errorText: 'Only latters are allowed',
        isValidated: false
      });
      let str = (String(event.target.value).slice(0, -1));
      event.target.value = str;
    }
  }

  validateRequired(event) {
    if (event.target.value.length <= 0) {
      this.setState({
        value: event.target.value,
        errorText: 'Value is required',
        isValidated: false
      })
    }
  }
  validateMobile(event) {
    var isValidinput = !!event.target.value.match(MobilenoCheck);
    if (isValidinput) {
      this.setState({ value: event.target.value, errorText: '' })
    } else {
      this.setState({
        errorText: 'Only numbers are allowed',
        isValidated: false
      })

    }
  }
  validatewithUnixPath(event) {
    var isValidinput = !!event.target.value.match(UnixPathCheck);
    if (isValidinput) {
      this.setState({ value: event.target.value, errorText: '' })
    } else {
      this.setState({
        errorText: 'Path should be according to UNIX path',
        isValidated: false
      })

    }
  }
  setvalid(event) {
    this.setState({
      value: event.target.value,
      errorText: '',
      isValidated: true
    })
  }
  updateParent(event) {
    this.props.UpdateValues(event.target.value, this.props.target, this.state.isValidated);
  }
  onChange(event) {
    if (event.target.value.length <= 0 || (event.target.value.length > this.props.maxLength || this.props.minLength > event.target.value.length)) {
      if (this.props.isRequired && event.target.value.length <= 0) {
        this.validateRequired(event);
      } else if (this.props.maxLength || this.props.minLength) {
        if (event.target.value.length > this.props.maxLength || this.props.minLength > event.target.value.length) {
          this.setState({
            errorText: `This field requires minimum ${this.props.minLength} and maximum ${this.props.maxLength} words or numbers`,
            isValidated: true
          })
        }
      } else {
        this.setState({
          value: event.target.value,
        })
      }
    } else {
      if (this.props.type === "email") {
        this.validateEmail(event)
      } else if (this.props.onlyAlpha) {
        this.validateAlphaOnly(event)
      } else if (this.props.IsMobile) {
        this.validateMobile(event);
      } else if (this.props.onlyAlphaWithSpace) {
        this.validateAlphaWithSpaceOnly(event)
      } else if (this.props.Unixpath) {
        this.validatewithUnixPath(event)
      }
      else {
        this.setvalid(event);
      }
    }
    this.updateParent(event);
  }

  isValidEmailAddress(event) {
    if (this.props.type === "email") {
      this.setState({
        value: event.target.value,
        isValidated: !event.target.value.match(EmailCheck)
      });
    }
  }
  render() {
    const { classes, label, isRequired, type, disabled, maxLength, minLength } = this.props;
    // console.log(this.state.defaltValue)
    const name = _.uniqueId("input-");
    return (
      <div className={classes.container}>
        <TextField
          fullWidth
          required={isRequired && true}
          // error={this.state.isValidated}
          name={name}
          type={type || "email"}
          disabled={disabled || false}
          // defaultValue={this.state.defaltValue || ''}
          value={this.state.defaltValue || this.state.value || ''}
          label={label || 'Name'}
          placeholder={label || 'Name'}
          onChange={this.onChange.bind(this)}
          id={name}
          InputProps={{
            maxLength: (maxLength && maxLength > 0) ? maxLength : -1,
              minLength: (minLength && minLength > 0) ? minLength : -1,
            disableUnderline: true,
            classes: {
              root: classes.bootstrapRoot,
              input: classes.bootstrapInput,
            },
          }}
          onBlur={this.isValidEmailAddress.bind(this)}
          InputLabelProps={{
            shrink: true,
            className: classes.bootstrapFormLabel,
          }}
        // onChange={this.handleChange.bind(this)}
        />
        {/* {this.state.isValidated ? */}
        <FormHelperText id="error" className={classes.errorClass}>{this.state.errorText}</FormHelperText>
        {/* : null} */}
      </div>
    );
  }
}

export default withStyles(styles)(CustomTextField);