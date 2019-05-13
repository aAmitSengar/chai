import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './AddUserStyle';
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

class AddUser extends Component {
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
            firstName: '',
            lastName: '',
            email: '',
            Mobile: '',
            isFormValid: false,
            fileUrl: null
        }
        this.uploadImage = this.uploadImage.bind(this);
        this.onChange = this.onChange.bind(this);

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.editUserData !== this.props.editUserData) {
            const _product = [];
            const _vender = [];
            const _location = [];
            _.each(nextProps.editUserData.PLV, item => {
                _product.push(item[0])
                _vender.push(item[2])
                _location.push(item[1])
            });
            this.setState({
                productValue: _.uniq(_product),
                vendorValue: _.uniq(_vender),
                locationValue: _.uniq(_location),
                RolesValue: nextProps.editUserData.Role,
                firstName: nextProps.editUserData.FirstName || '',
                lastName: nextProps.editUserData.LastName || '',
                email: nextProps.editUserData.Email || '',
                Mobile: nextProps.editUserData.Mobile || ''
            });
        }
    }

    handleChanges_Role(open, target, value) {
        if (target === 'Roles') {
            this.setState({ Roles: !open, RolesValue: value });
        }
    }
    handleChanges_firstname(value, target, isvalid) {
        console.log(value)
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
    getlist() {
        let VPList = [];
        // _.each(this.state.productValue, function (product) {
        //     _.each(this.state.vendorValue, function (vender) {
        //         _.each(this.state.locationValue, function (location) {
        //             VPList.push({
        //                 product: product,
        //                 vendor: vender,
        //                 location: location
        //             });
        //         })
        //     }.bind(this))
        // }.bind(this));
        // const lst = JSON.parse(sessionStorage.getItem("data"))
        // var newlist = [];
        // _.each(VPList, function (plv) {
        //     _.each(lst.PLV, function (_plv) {
        //         if (_plv.Product === plv.product
        //             && _plv.Vendor === plv.vendor
        //             && _plv.Location === plv.location) {
        //             newlist.push(_plv)
        //         }
        //     })
        // })

        return VPList;
    }

    submit() {
       
        this.props.onSubmit({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            role: this.state.RolesValue,
            mobile: this.state.Mobile,
            // VLPList: this.getlist()
        });

        this.handleClick();
    }
     
    updateUser() {
        this.props.updateUser({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            role: this.state.RolesValue,
            mobile: this.state.Mobile,
            // VLPList: this.getlist()
        });
        this.handleClick();
    }
    prepareFilterLocation() {
        // let list = JSON.parse(sessionStorage.getItem("data"));

        // let product = _.uniq(_.map(list.PLV, 'Product'));
        // let location = _.uniq(_.map(list.PLV, 'Location'));
        // let vendor = _.uniq(_.map(list.PLV, 'Vendor'));
        return { Product: [], Location: [], Vendor:[] }
    }
    getFilteredData(product, vendor) {
        let list = JSON.parse(sessionStorage.getItem("data")) || {PLV:[]};
        let values = _.chain(list.PLV || [])
            .filter(item => _.some(product, pro => pro === item.Product))
            .filter(item => {
                if (vendor) {
                    return _.some(vendor, loc => loc === item.Vendor)
                } else {
                    return true
                }
            })
            .value();
        console.log(values)
        return values;
    }
    handleClick() {
        this.props.closeDrawer();
    }
    isValid() {
        if (this.state.firstName
            && this.state.lastName
            && this.state.email
            && this.state.RolesValue
            && this.state.Mobile
            && this.state.productValue.length > 0
            && this.state.vendorValue.length > 0
            && this.state.locationValue.length > 0
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
        const { classes, IsOpen, editUserData } = this.props;
        let filterObj = this.prepareFilterLocation();
        let rolesArray = _.map(this.props.roles, item => item.name)
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
                                <CustomTextField label="First Name" onlyAlpha={true} isRequired={true} type="text" defaultValue={this.state.firstName} UpdateValues={this.handleChanges_firstname.bind(this)} />
                            </div>
                            <div className={classes.input}>
                                <CustomTextField className={classes.input} label="Last Name" defaultValue={this.state.lastName} onlyAlpha={true} isRequired={true} type="text" UpdateValues={this.handleChanges_lastname.bind(this)} />
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
                        <div className={classes.addUser_innerDiv_custom}>
                            <div className={classes.dropdownItem}>
                                <div className={classes.filterHead}>Select Product</div>
                                <MultipleSelects handleSelected={this.setProducts.bind(this)} target={'Product'} open={this.state.product} defaultValue={this.state.productValue} item={filterObj.Product} />
                            </div>
                            <div className={classes.dropdownItem}>
                                <div className={classes.filterHead}>Select Vendor</div>
                                <MultipleSelects handleSelected={this.setVenders.bind(this)} target={'Vendor'} open={this.state.vendor} defaultValue={this.state.vendorValue} item={_.uniq(_.map(this.getFilteredData(this.state.productValue), item => item.Vendor))} />
                            </div>
                            <div className={classes.dropdownItem}>
                                <div className={classes.filterHead}>Select Location</div>
                                <MultipleSelects handleSelected={this.setlocations.bind(this)} target={'Location'} open={this.state.location} defaultValue={this.state.locationValue} item={_.uniq(_.map(this.getFilteredData(this.state.productValue,this.state.vendorValue), item => item.Location))} />
                            </div>                           

                        </div>

                        <Divider classes={{
                            inset: false,
                            root: classes.dividerClass
                        }} />
                        {/* <div className={classes.addUser_innerDiv}>
                            <div className={classes.dropdownItem}>
                                <div className={classes.filterHead}>Managed by</div>
                                <UiDropDown width={"100%"} select={this.selectItem} target={'ManagedBy'} open={this.state.ManagedBy} item={filterObj.Location} />
                            </div>
                            <div className={[classes.dropdownItem, classes.removeRightMargin].join(' ')}>
                                <div className={classes.filterHead}>Managed For (Nodes)</div>
                                <UiDropDown width={"100%"} select={this.selectItem} target={'ManagedFor'} open={this.state.ManagedFor} item={filterObj.Location} />
                            </div>
                        </div> */}
                        <div className={classes.addUser_innerDiv}>
                            <div className={[classes.dropdownItem, classes.removeRightMargin].join(' ')}>
                                <div className={classes.filterHead}>Role</div>
                                <UiDropDown width={"100%"} select={this.handleChanges_Role.bind(this)} defaultSelectedItem={this.state.RolesValue} target={'Roles'} open={this.state.Roles} item={rolesArray} />
                            </div>
                        </div>
                        <div className={classes.addUser_actions}>
                            {Object.keys(editUserData).length === 0 && true ?
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

export default withStyles(styles)(AddUser);
