import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
//import { Button } from 'reactstrap';
import styles from './Styles';
import Popovers from '../Popovers/Popovers';
//import notify from '../../../../images/icons/notify.svg'
//import SVG from 'react-inlinesvg';
import CustomTextField from '../../common/Inputs/TextInput/CustomTextField';
import CustomTextAreaField from '../Inputs/TextAreaInput/CustomTextAreaField';
import SubmitButton from '../Inputs/Buttons/SubmitButton';
import CancelButton from '../Inputs/Buttons/CancelButton';
import RemoveButton from '../../common/Inputs/Buttons/ActionButtons';

// const EmailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class NotifyPopover extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: this.props.is_open || false,
            NotifyObject: {
                email: [],
                Message: '',
                subject: ''
            }
        };
        this.closePopOver = this.closePopOver.bind(this);
    }
    // componentDidMount() {
    //     document.addEventListener('mousedown', this.closePopOver);
    // }
    // componentWillUnmount() {
    //     document.removeEventListener('mousedown', this.closePopOver);
    // }
    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
        this.props.closePopOver();
    }
    closePopOver() {
        this.props.closePopOver();
    }
    Submit() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
        if (this.props.page === 'ALERT') {
            this.props.sendMessage(this.state.NotifyObject);
        } else {
            this.props.notify(this.state.NotifyObject);
        }
        this.closePopOver()
    }
    handleEmailChange(value) {
        var obj = this.state.NotifyObject;
        obj.email = [value];
        this.setState({
            NotifyObject: obj
        });
    }
    handleSubjectChange(value) {
        var obj = this.state.NotifyObject;
        obj.subject = value;
        this.setState({
            NotifyObject: obj
        });
    }
    handleMessageChange(value) {
        var obj = this.state.NotifyObject;
        obj.message = value;
        this.setState({
            NotifyObject: obj
        });
    }
    IsValid() {
        const { needSubject } = this.props;
        if (this.state.NotifyObject.email) {
            //&& !!String(this.state.NotifyObject.email).match(EmailCheck);
            if (needSubject) {
                if (this.state.NotifyObject.subject) {
                    return true;
                }
            } else {
                return true;
            }
        }
        return false;
    }

    renderPopover() {
        const { classes, target, placement, needSubject, RoleKey, RoleAction } = this.props;
        let popoverObj = (<Popovers id="notifyPopover" placement={placement || "bottom-end"} popoverOpen={this.props.is_open} title="Notify to" target={target || "Popover1"} toggle={this.closePopOver} cancelPoppover={this.closePopOver}>
            <div className={classes.popoverContainer}>
                <FormControl fullWidth className={classes.formControl}>
                    <CustomTextField UpdateValues={this.handleEmailChange.bind(this)} isRequired={true} type="text" label="Email Id" defaltValue="support@teledna.com" />
                    {
                        needSubject
                            ?
                            <CustomTextField UpdateValues={this.handleSubjectChange.bind(this)} isRequired={true} type="text" label="Subject" defaltValue="" />
                            :
                            null
                    }
                    <CustomTextAreaField label="Message" UpdateValues={this.handleMessageChange.bind(this)} />
                </FormControl>
                <div className={classes.actionContainer}>
                    <SubmitButton RoleKey={RoleKey || "KPI"} RoleAction={RoleAction || "NOTIFY"} label="Send Now" disabled={!this.IsValid()} submit={this.Submit.bind(this)} />
                    <label className={classes.orLabel}>or</label>
                    <CancelButton label="Cancel" cancel={this.closePopOver} />
                </div>
            </div>

        </Popovers>);
        return popoverObj;
    }
    render() {
        const { classes, RoleKey, RoleAction } = this.props;
        return (
            <div className={classes.container}>
                {
                    this.props.isButtonNeeded ?
                        // <Button className={classes.button} id="Popover1" onClick={() => this.toggle()}>
                        //     <SVG src={notify} className={classes.menuIcons}>
                        //         Notify
                        //     </SVG>
                        //     <span> Notify</span>
                        // </Button>
                        <RemoveButton buttonType={"Notify_KPI"} text={"Notify"} RoleKey={RoleKey || "KPI"} RoleAction={RoleAction || "NOTIFY"} handleClick={this.toggle.bind(this)} />
                        : null
                }
                {this.props.is_open ? this.renderPopover() : null}

            </div>
        );
    }
}

export default withStyles(styles)(NotifyPopover);