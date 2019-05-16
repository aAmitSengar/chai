import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import APITransport from '../../../actions/apitransport/apitransport';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './ParentStyle'; 
import AppBar from '@material-ui/core/AppBar';
import UiTable from '../../common/UiTable/UiTable';
import { Link } from 'react-router-dom';
// import ListRolesAPI from '../../../actions/apis/Parents/Parentroles';
// import createParentAPI from '../../../actions/apis/Parents/createParent';
 import BusyIndicator from '../../common/BusyIndicator';
// import ListParentsAPI from '../../../actions/apis/Parents/listParents';
// import updateParentAPI from '../../../actions/apis/Parents/updateParent';
// import deleteParentAPI from '../../../actions/apis/Parents/deleteParent';

import AddParent from './AddParent/AddParent';
import AddRole from './AddParent/AddParent';
import ParentInfo from './ParentInfo/ParentInfo'; 
import { Row, Col } from 'reactstrap';
import ConfirmationBox from '../../common/ConfirmationBox/ConfirmationBox';
import Toast from '../../common/Toast'; 
import _ from 'lodash';
import RemoveButton from '../../common/Inputs/Buttons/ActionButtons';
import CustomTabs from '../../common/Tabs/Tabs'
import { hasRoutePermission } from '../../../utils/AuthPermissions'
// import TableSearch from '../../common/TableSearch/TableSearch';
 
const columnData = [
    { id: 'userName', numeric: false, disablePadding: false, label: 'Login Name' },
    { id: 'displayName', numeric: false, disablePadding: false, label: 'User Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'mobile', numeric: false, disablePadding: false, label: 'Phone No' },
    { id: 'center', numeric: false, disablePadding: true, label: 'Center Name' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' }
];


class Parents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'PARENTS.VIEW',
            deleteMessage: 'Are you sure want to delete',
            IsOpen: false,
            IsOpen_info: false,
            IsOpen_edit: false,
            isOpenDelete: false,
            IsOpenAddRole: false,
            deletedParent: null,
            deletedRole: null,
            infoData: {},
            editRoleData: {},
            displayTost: false,
            displayTostMessage: "",
            ShowTost: false,
            tostMessage: this.props.addParentStatus.message || '',
            tableData: this.props.ParentsList|| [],

        }
        this.Action = "";
    }

    listAllParents() {
        // let listParents = new ListParentsAPI(20000);
        // this.props.APITransport(listParents)
    }
    listAllRoles() {
        // let listRolesAPI = new ListRolesAPI(20000);
        // this.props.APITransport(listRolesAPI);
    }
    /**-------------------------Parent section--------------------------------------------------------------- */
    AddParent_submit(values) {
        this.Action = 'addParent';
        // let createParent = new createParentAPI(values, 20000);
        // this.props.APITransport(createParent);
        // this.listAllParents();
    }
    deleteParent() {
        this.Action = "delete";
        // let d = new deleteParentAPI(this.state.deletedParent, 20000)
        // this.props.APITransport(d)
    }
    updateParent(Parentdata) {
        this.Action = 'update';
        // let d = new updateParentAPI(Parentdata, 20000);
        // this.props.APITransport(d);
    }
    /**-------------------------Parent section--------------------------------------------------------------- */
   
    setdeleteRole(rowdata) {
        this.setState({
            isOpenDelete: !this.state.isOpenDelete,
            deleteMessage: 'Are you sure want to delete the Role',
            deletedRole: rowdata
        })
    }

    componentDidMount() {
        if (hasRoutePermission('Parents')) {
            this.listAllParents();
            this.listAllRoles();
        }

    }
    componentWillReceiveProps(prevProps, nextProps) {

        this.setState({
            tableData: this.props.ParentsList,
        });

        if (this.Action) {
            if (this.Action === 'addParent' && this.props.addParentStatus) {
                if (this.props.addParentStatus.status) {
                    this.setState({
                        ShowTost: true,
                        tostMessage: prevProps.addParentStatus.data || ''
                    })
                    this.Action = "";
                    if (this.props.addParentStatus.status === "1") {
                        this.listAllParents();
                    }
                }
            }

            if (this.Action === 'update' && this.props.updateParenttatus) {
                if (this.props.updateParenttatus.status) {
                    this.setState({
                        ShowTost: true,
                        tostMessage: this.props.updateParenttatus.data || ''
                    });
                    this.Action = "";
                    if (this.props.updateParenttatus.status === "1") {
                        this.listAllParents();
                    }
                }
            }
            if (this.Action === 'delete' && this.props.deleteParentStatus) {
                if (this.props.deleteParentStatus.status) {
                    this.setState({
                        ShowTost: true,
                        tostMessage: this.props.deleteParentStatus.data || ''
                    });
                    this.Action = "";
                    if (this.props.deleteParentStatus.status === "1") {
                        this.listAllParents();
                    }
                }
            }
            if (this.Action === 'addrole' && this.props.createRoleStatus) {
                if (this.props.createRoleStatus.status) {
                    this.setState({
                        ShowTost: true,
                        tostMessage: this.props.createRoleStatus.data || 'Role added successfully'
                    });
                    this.Action = "";
                    if (this.props.createRoleStatus.status === 1) {
                        this.listAllRoles();
                    }
                }
            }
            if (this.Action === 'updaterole' && this.props.modifyRoleStatus) {
                if (this.props.modifyRoleStatus.status) {
                    this.setState({
                        ShowTost: true,
                        tostMessage: this.props.modifyRoleStatus.data || 'Role Updated successfully'
                    });
                    this.Action = "";
                    if (this.props.modifyRoleStatus.status === 1) {
                        this.listAllRoles();
                    }
                }
            }
            if (this.Action === 'deleterole' && this.props.deleteRoleStatus) {
                if (this.props.deleteRoleStatus.status) {
                    this.setState({
                        ShowTost: true,
                        tostMessage: this.props.deleteRoleStatus.data || 'Role Deleted successfully'
                    });
                    this.Action = "";
                    if (this.props.deleteRoleStatus.status === 1) {
                        this.listAllRoles();
                    }
                }
            }
        }
    }

    handleClick() {
       
            this.setState({
                IsOpen: !this.state.IsOpen,
                infoData: {}
            });
        
    }
    handleInfoClick(rowdata) {
        this.setState({
            IsOpen_info: !this.state.IsOpen_info,
            infoData: rowdata
        });
    }
    handleCancelInfoClick() {
        this.setState({
            IsOpen_info: !this.state.IsOpen_info,
        });
    }
    handleEditClick(rowdata) {
        this.setState({
            IsOpen: !this.state.IsOpen,
            infoData: rowdata
        });
    }

    setdeleteParent(data) {
        this.setState({
            isOpenDelete: !this.state.isOpenDelete,
            deleteMessage: 'Are you sure want to delete the Parent',
            deletedParent: data
        })
    }
    handleOk() {
        this.setState({
            isOpenDelete: !this.state.isOpenDelete
        })

        if (this.state.value === 'ROLES.VIEW') {
            this.deleteRole();
        } else {
            this.deleteParent();
        }

    }
    hangleClose() {
        this.setState({
            isOpenDelete: !this.state.isOpenDelete,
            deletedParent: null,
            deletedRole: null
        })
    }
    toggleSideDrawer(event) {
        console.log(event)
    }
    handleEditRoleClick(rowdata) {
        this.setState({
            editRoleData: rowdata,
            IsOpenAddRole: !this.state.IsOpenAddRole
        })
    }
    handleChange = (event, value) => {
        this.setState({ value });
    };

    closeTost() {
        this.setState({ ShowTost: false });
    }

    // setFilteredList(newList){
    //     this.setState({
    //         tableData: newList
    //     });
    // }

    render() {
        const { classes } = this.props;
        //console.log("ShowTost", this.state.ShowTost);
        return (
            <div>
                {/* {this.renderTost()} */}
                <Toast show={this.state.ShowTost} message={this.state.tostMessage} closeTost={this.closeTost.bind(this)} />
                <BusyIndicator progress={this.props.apistatus.progress} />
                {

                    <div className={classes.tableBackground}>
                        <AppBar position="static" color="default" className={classes.appbg}>
                            <Toolbar className={classes.toolbar}>
                                <Typography className={classes.header} variant="h6" color="inherit">Parent's <br />
                                {/* hoverLink */}
                                    <b><Link to={`/home`} className={classes.link1}>Dashboard </Link> <span className={classes.arrow}> > </span><span className={classes.fontS}> Parents</span></b>
                                </Typography>
                                <div className={classes.fillspace}></div>
                                <div>
                                    {  
                                        <RemoveButton buttonType={"AddButton"} text={"Add Parent"} RoleKey={"PARENTS"} RoleAction={"ADD"} handleClick={this.handleClick.bind(this)} />
                                    }
                                </div>

                            </Toolbar>
                        </AppBar>
                        {/* <Row className={classes.buttonGroup}>
                            <Col md="6">
                                <CustomTabs tabType={"SimpleTab"} myTabs={myTabs} value={this.state.value} handleChange={this.handleChange} />
                            </Col>
                        </Row> */}
                        <AddParent IsOpen={this.state.IsOpen}
                            RESPONSE={this.state.RESPONSE}
                            // plvs={this.state.plvs}
                            // roles={this.props.rolesList}
                            editParentData={this.state.infoData}
                            closeDrawer={this.handleClick.bind(this)}
                            onSubmit={this.AddParent_submit.bind(this)}
                            updateParent={this.updateParent.bind(this)}
                        />
                       
                        <ParentInfo infoData={this.state.infoData}
                            roles={this.props.rolesList}
                            IsOpen={this.state.IsOpen_info}
                            closeDrawer={this.handleCancelInfoClick.bind(this)}
                        />
                        {                           
                            <UiTable
                                data={this.state.tableData}
                                columnData={columnData}
                                tableType="PARENTS_TABLE"
                                orderBy={'Email'}
                                needCheckBox={false}
                                needHash={true}
                                needSearch={true}
                                toggleSideDrawer={this.handleInfoClick.bind(this)}
                                editInfo={this.handleEditClick.bind(this)}
                                deleteParent={this.setdeleteParent.bind(this)}
                            />
                        }
                       
                        <ConfirmationBox IsOpen={this.state.isOpenDelete} cancelButton='Cancel' okButton='Ok' hangleClose={this.hangleClose.bind(this)} handleOk={this.handleOk.bind(this)}>
                            <span>{this.state.deleteMessage}</span>
                        </ConfirmationBox>


                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ParentsList: state.parentsList,
        login: state.login,
        // RESPONSE: state.dashboard.RESPONSE,
        // plvs: state.dashboard.PLVS,
        rolesList: state.rolesList,
        privilegesList: state.privilegesList,
        apistatus: state.apistatus,

        addParentStatus: state.createParent,
        updateParenttatus: state.updateParent,
        deleteParentStatus: state.deleteParent
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Parents)));


