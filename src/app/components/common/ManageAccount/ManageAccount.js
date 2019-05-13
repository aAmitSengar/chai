import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawers from '../../common/drawers/drawers';
import Styles from './Styles';
import SVG from 'react-inlinesvg';
import UserLogo from '../../../../images/user/user.svg';
import plusCircle from '../../../../images/icons/plus-circle.svg';
import CustomTextField from '../../common/Inputs/TextInput/CustomTextField';
// import { Divider } from '@material-ui/core';
import CancelButton from '../../common/Inputs/Buttons/CancelButton';
//import UiDropDown from '../../common/UiDropDown/UiDropDown';
import SubmitButton from '../../common/Inputs/Buttons/SubmitButton';
//import MultipleSelects from '../../common/Inputs/MultipleSelect/MultipleSelect'
import _ from "lodash";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import updateUserAPI from '../../../actions/apis/users/updateUser';
import APITransport from '../../../actions/apitransport/apitransport';
import Toast from '../../common/Toast';

class ManageAccount extends Component {
    constructor(props) {
        super(props);
        let data = JSON.parse(sessionStorage.getItem('data'));
        if(data){
        this.state = {
            fileUrl: null,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            Mobile: data.mobile || '',
            isFormValid: false,
            role: data.Role || '',
            nodes: data.PLV || '',
            ShowTost: false,
            tostMessage: '',
        }
    }else{
        this.state = {
            fileUrl: null,
            firstName: '',
            lastName:  '',
            email:  '',
            Mobile: '',
            isFormValid: false,
            role:  '',
            nodes: '',
            ShowTost: false,
            tostMessage: '',
        }
    }
        this.uploadImage = this.uploadImage.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    uploadImage() {
        console.log('not implemented');
        document.getElementById("fileInput").click()
    }


    onChange = (file) => {
        var files = file;
        this.setState({
            fileName: files.name,
            fileUrl: URL.createObjectURL(files)
        });
    }

    handleClick() {
        this.props.closeDrawer();
    }

    handleChanges_firstname(value, target, isvalid) {
        this.setState({
            firstName: value,
            isFormValid: isvalid
        });
    }

    handleChanges_lastname(value, target, isvalid) {
        this.setState({
            lastName: value,
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

    isValid() {
        if (this.state.firstName || this.state.lastName || this.state.Mobile) {
            return true;
        }
        return false;
    }

    cancelAddUser() {
        this.handleClick();
    }

    updateUser() {
        let userData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            mobile: this.state.Mobile,
            email: this.state.email,
            role: this.state.role,
            VLPList: []
        }

        this.setState({
            tostMessage: ''
        });

        // let user = new updateUserAPI(userData, 20000);
        // this.props.APITransport(user);

        this.handleClick();
    }

    mapNodes() {
        const { classes } = this.props;
        let nodes = this.state.nodes || '';
        let node = [];
        if (nodes !== '') {
            _.each(nodes, function (value, key) {
                node.push(<span key={value.Product + "_" + key} className={classes.nodes}>{value.Product + " (" + value.Vendor + ", " + value.Location + ")"}</span>)
            });
        }
        return node;
    }

    closeTost() {
        this.setState({ ShowTost: false });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.updateUsertatus) {
            if (nextProps.updateUsertatus.status) {
                if (this.state.tostMessage !== nextProps.updateUsertatus.data) {
                    this.setState({
                        ShowTost: true,
                        tostMessage: nextProps.updateUsertatus.data || '',
                    });
                }
            }
        }
    }

    render() {
        const { classes, IsOpen } = this.props;
        return (
            <div>
                <Toast show={this.state.ShowTost} message={this.state.tostMessage} closeTost={this.closeTost.bind(this)} />
                {/* <BusyIndicator progress={this.props.apistatus.progress} /> */}

                <Drawers open={IsOpen} anchor={"right"} closeDrawer={this.handleClick.bind(this)}>
                    <form className={classes.addUser} autoComplete="off">
                        <div className={[classes.addUser_innerDiv].join(' ')}>
                            {this.state.fileUrl ?
                                <img src={this.state.fileUrl} className={classes.userImage} alt="" />
                                : <img src={UserLogo} className={classes.userImage} alt="" />
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
                                    <CustomTextField label="First Name" onlyAlphaWithSpace={true} type="text" defaultValue={this.state.firstName} UpdateValues={this.handleChanges_firstname.bind(this)} />
                                </div>
                                <div className={classes.input}>
                                    <CustomTextField className={classes.input} label="Last Name" defaultValue={this.state.lastName} onlyAlphaWithSpace={true} type="text" UpdateValues={this.handleChanges_lastname.bind(this)} />
                                </div>
                            </div>

                            <div className={classes.innerDiv}>
                                <div className={classes.input}>
                                    <CustomTextField label="Email Id" type="email" defaultValue={this.state.email} disabled={true} />
                                </div>
                                <div className={classes.input}>
                                    <CustomTextField label="Role" defaultValue={this.state.role} disabled={true} type="text" />
                                </div>
                            </div>

                            <div className={classes.innerDiv}>
                                <div className={classes.input}>
                                    <CustomTextField label="Phone Number" IsMobile={true} type="text" defaultValue={this.state.Mobile} UpdateValues={this.handleChanges_Phone.bind(this)} />
                                </div>
                            </div>

                            <div>
                                <span className={classes.nodeTitle}>Nodes</span>
                                <div className={classes.listDivsPrevNode}>
                                    {this.mapNodes()}
                                </div>
                            </div>

                            <div className={classes.addUser_actions}>
                                <SubmitButton disabled={!this.isValid()} RoleKey={"USERS"} RoleAction={"EDIT"} label="Update User" submit={this.updateUser.bind(this)} />
                                <CancelButton cancel={this.cancelAddUser.bind(this)} />
                            </div>


                            {/* <Divider classes={{
                                inset: false,
                                root: classes.dividerClass
                            }} /> */}


                        </div>
                    </form>
                </Drawers>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        updateUsertatus: state.updateUser,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}
export default withStyles(Styles)(connect(mapStateToProps, mapDispatchToProps)(ManageAccount));
