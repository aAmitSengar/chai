import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styles from './UiTextFieldStyle';

class CustomTextAreaField extends React.Component {
    handleChange = event => {
        this.props.textValue(event.target.value);
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <TextField
                    fullWidth
                    defaultValue={this.props.defaultValue}
                    value={this.props.value}
                    label={this.props.label}
                    placeholder={this.props.placeholder}
                    type={this.props.type?this.props.type:'text'}
                    autoFocus={false}
                    disabled={this.props.disabled}
                    InputProps={{
                        disableUnderline: true,
                        classes: {
                            root: [classes.inputroot,(this.props.error)?classes.error:''].join(' '),
                            input: classes.textInput,
                            disabled:classes.disabled
                        },
                    }}
                    InputLabelProps={{
                        shrink: true,
                        className: classes.textLabel,
                    }}
                    maxLength={this.props.maxLength}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default withStyles(styles)(CustomTextAreaField);