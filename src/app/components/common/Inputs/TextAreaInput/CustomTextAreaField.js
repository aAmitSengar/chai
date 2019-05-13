import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styles from './TextAreaStyle';

class CustomTextAreaField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaltValue: this.props.defaultValue
        }
    }
    handleChange = event => {
        this.props.UpdateValues(event.target.value);
    };

    render() {
        const { classes, label, placeholder } = this.props;
        return (
            <div className={classes.container}>
                <TextField
                    fullWidth
                    defaultValue={this.state.defaltValue || ''}
                    label={label || 'Name'}
                    placeholder={placeholder || label || 'Name'}
                    id="input-area"
                    multiline
                    // autoFocus={true}
                    rows={4}
                    rowsMax={6}
                    InputProps={{
                        disableUnderline: true,
                        classes: {
                            root: classes.bootstrapRoot,
                            input: classes.bootstrapInput,
                        },
                    }}
                    InputLabelProps={{
                        shrink: true,
                        className: classes.bootstrapFormLabel,
                    }}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default withStyles(styles)(CustomTextAreaField);