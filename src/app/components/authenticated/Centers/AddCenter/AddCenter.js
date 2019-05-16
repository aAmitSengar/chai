import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './AddCenterStyle';
import SVG from 'react-inlinesvg';
import Drawers from '../../../common/drawers/drawers';
import UserLogo from '../../../../../images/user/user.svg'
import plusCircle from '../../../../../images/icons/plus-circle.svg'
import CustomTextField from '../../../common/Inputs/TextInput/CustomTextField'
import { Divider } from '@material-ui/core';
import CancelButton from '../../../common/Inputs/Buttons/CancelButton';
import UiDropDown from '../../../common/UiDropDown/UiDropDown';
import SubmitButton from '../../../common/Inputs/Buttons/SubmitButton';
import MultipleSelects from '../../../common/Inputs/MultipleSelect/MultipleSelect'
import _ from "lodash";

class AddCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsOpen: false,
            product: false,
            location: false,
            vendor: false,
            ManagedBy: false,
            ManagedFor: false,
            Roles: false,
            productValue: [],
            locationValue: [],
            vendorValue: [],
            RolesValue: '',
            id: '',
            DisplayName: '',
            email: '',
            Mobile: '',
            isFormValid: false,
            fileUrl: null
        }
        this.uploadImage = this.uploadImage.bind(this);
        this.onChange = this.onChange.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.editCenterData !== this.props.editCenterData) {          
            this.setState({              
                id: nextProps.editCenterData.id || '',
                DisplayName: nextProps.editCenterData.DisplayName || '',
                email: nextProps.editCenterData.Email || '',
                Mobile: nextProps.editCenterData.Mobile || ''
            });
        }
    }

    handleChanges_Role(open, target, value) {
        if (target === 'Roles') {
            this.setState({ Roles: !open, RolesValue: value });
        }
    }
    handleChanges_id(value, target, isvalid) {
        console.log(value)
        this.setState({
            id: value,
            isFormValid: isvalid
        });
    }
    handleChanges_DisplayName(value, target, isvalid) {
        this.setState({
            DisplayName: value,
            isFormValid: isvalid
        });
    }
    handleChanges_email(value, target, isvalid) {
        this.setState({
            email: value,
            isFormValid: isvalid
        });
    }
    handleChanges_Phone(value, target, isvalid) {
        this.setState({
            Mobile: value,
            isFormValid: isvalid
        });
    }
    setlocations(val) {
        this.setState({
            locationValue: val
        });
    }
    setProducts(val) {
        this.setState({
            productValue: val,
            vendorValue: [],
            locationValue: []
        });
    }
    setVenders(val) {
        this.setState({
            vendorValue: val,
            locationValue: []
        });
    }

    cancelAddUser() {
        this.handleClick()
    }
   

    submit() {
       
        this.props.onSubmit({
            id: this.state.id,
            DisplayName: this.state.DisplayName,
            email: this.state.email,
            role: this.state.RolesValue,
            mobile: this.state.Mobile,
            // VLPList: this.getlist()
        });

        this.handleClick();
    }
     
    updateUser() {
        this.props.updateUser({
            id: this.state.id,
            DisplayName: this.state.DisplayName,
            email: this.state.email,
            role: this.state.RolesValue,
            mobile: this.state.Mobile,
        });
        this.handleClick();
    }
   
    handleClick() {
        this.props.closeDrawer();
    }
    isValid() {
        if (this.state.id
            && this.state.DisplayName
            && this.state.email
            && this.state.RolesValue
            && this.state.Mobile
        ) {
            return true;
        }
        return false;
    }
    uploadImage() {
        console.log('not implemented')
        document.getElementById("fileInput").click()
    }
    onChange = (file) => {
        var files = file;
        this.setState({
            fileName: files.name,
            fileUrl: URL.createObjectURL(files)
        });
        
        // let data = new FormData();
        // data.append('file', file);
        // data.append('asd', 1);
        // data.append('adsasd', 2);
        // console.log(data); 
        // console.log(data.get('file'));
        // console.log(data.get('asd'));
    }
    svgWrapper = ({ dangerouslySetInnerHTML, className }) => {
        return (
            <span
                onClick={(e) => this.uploadImage(e)}
                dangerouslySetInnerHTML={dangerouslySetInnerHTML}
                className={className}
            />
        );
    }

    render() {
        const { classes, IsOpen, editCenterData } = this.props;
        console.log(editCenterData);
        
        return (
            <Drawers open={IsOpen} anchor={"right"} closeDrawer={this.handleClick.bind(this)}>
                <form className={classes.addUser} autoComplete="off">
                    <div className={[classes.addUser_innerDiv].join(' ')}>
                        {this.state.fileUrl ?
                            <img src={this.state.fileUrl}  className={classes.userImage} alt =""/>
                            : <img src={UserLogo}  className={classes.userImage} alt=""/>
                        //     : <SVG src={UserLogo} className={classes.userImage}>
                        //         User
                        // </SVG>
                        }
                        <input type="file" name="file" id="fileInput" style={{ display: 'none' }} onChange={e => { this.onChange(e.currentTarget.files[0]) }} />
                        <SVG src={plusCircle} className={classes.PlusButton} wrapper={this.svgWrapper} />
                    </div>
                    <div className={classes.addUser_form}>
                        <div className={classes.innerDiv}>
                            <div className={classes.input}>
                                <CustomTextField label="Unique Name" onlyAlpha={true} isRequired={true} type="text" defaultValue={this.state.id} UpdateValues={this.handleChanges_id.bind(this)} />
                            </div>
                            <div className={classes.input}>
                                <CustomTextField className={classes.input} label="Display Name" defaultValue={this.state.DisplayName} onlyAlpha={true} isRequired={true} type="text" UpdateValues={this.handleChanges_DisplayName.bind(this)} />
                            </div>
                        </div>
                        <div className={classes.innerDiv}>
                            <div className={classes.input}>
                                <CustomTextField label="Email Id" isRequired={true} type="email" defaultValue={this.state.email} UpdateValues={this.handleChanges_email.bind(this)} />
                            </div>
                            <div className={classes.input}>
                                <CustomTextField label="Phone No." IsMobile={true} isRequired={true} type="text" defaultValue={this.state.Mobile} UpdateValues={this.handleChanges_Phone.bind(this)} />
                            </div>
                        </div>

                        <Divider classes={{
                            inset: false,
                            root: classes.dividerClass
                        }} />
                        <div className={classes.addUser_actions}>
                            {Object.keys(editCenterData ||{}).length === 0 && true ?
                                <SubmitButton disabled={!this.isValid()}  RoleKey={"USERS"} RoleAction={"ADD"} label="Add User" submit={this.submit.bind(this)} />
                                : <SubmitButton disabled={!this.isValid()}  RoleKey={"USERS"} RoleAction={"EDIT"} label="Update User" submit={this.updateUser.bind(this)} />
                            }
                            <CancelButton cancel={this.cancelAddUser.bind(this)} />

                        </div>
                    </div>
                </form>
            </Drawers>
        )
    }
}

export default withStyles(styles)(AddCenter);
