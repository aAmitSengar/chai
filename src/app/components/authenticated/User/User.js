import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import APITransport from '../../../actions/apitransport/apitransport';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './UserStyle'; 
import AppBar from '@material-ui/core/AppBar';
import UiTable from '../../common/UiTable/UiTable';
import { Link } from 'react-router-dom';
import ListRolesAPI from '../../../actions/apis/users/userroles';
import createUserAPI from '../../../actions/apis/users/createUser';
import CreateRoleAPI from '../../../actions/apis/RolesPrivileges/createRole';
import BusyIndicator from '../../common/BusyIndicator';
import ListUsersAPI from '../../../actions/apis/users/listUsers';
import updateUserAPI from '../../../actions/apis/users/updateUser';
import deleteUserAPI from '../../../actions/apis/users/deleteUser';
import DeleteRoleAPI from '../../../actions/apis/RolesPrivileges/deleteRole';
import ModifyRoleAPI from '../../../actions/apis/RolesPrivileges/modifyRole';
import AddUser from './AddUser/AddUser';
import AddRole from './AddRole/AddRole';
import UserInfo from './UserInfo/UserInfo'; 
import { Row, Col } from 'reactstrap';
import ConfirmationBox from '../../common/ConfirmationBox/ConfirmationBox';
import Toast from '../../common/Toast'; 
import _ from 'lodash';
import RemoveButton from '../../common/Inputs/Buttons/ActionButtons';
import CustomTabs from '../../common/Tabs/Tabs'
import { hasRoutePermission } from '../../../utils/AuthPermissions'
// import TableSearch from '../../common/TableSearch/TableSearch';
 
const columnData = [
    { id: 'FirstName', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'Email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'Mobile', numeric: false, disablePadding: false, label: 'Phone No' },
    { id: 'Role', numeric: false, disablePadding: true, label: 'Role Name' },
    { id: 'PLV', numeric: false, disablePadding: false, label: 'Nodes Handlling' }
];

const columnData1 = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'permissions', numeric: false, disablePadding: false, label: 'Permission' },
];
const myTabs = [
    { name: 'Users', RoleKey: "USERS", RoleAction: "VIEW" },
    { name: 'Roles', RoleKey: "ROLES", RoleAction: "VIEW" }
]
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'USERS.VIEW',
            deleteMessage: 'Are you sure want to delete',
            IsOpen: false,
            IsOpen_info: false,
            IsOpen_edit: false,
            isOpenDelete: false,
            IsOpenAddRole: false,
            deletedUser: null,
            deletedRole: null,
            infoData: {},
            editRoleData: {},
            displayTost: false,
            displayTostMessage: "",
            ShowTost: false,
            tostMessage: this.props.addUserStatus.message || '',
            tableData: [],

        }
        this.Action = "";
    }

    listAllUsers() {
        // let listUsers = new ListUsersAPI(20000);
        // this.props.APITransport(listUsers)
    }
    listAllRoles() {
        // let listRolesAPI = new ListRolesAPI(20000);
        // this.props.APITransport(listRolesAPI);
    }
    /**-------------------------User section--------------------------------------------------------------- */
    AddUser_submit(values) {
        this.Action = 'adduser';
        let createUser = new createUserAPI(values, 20000);
        this.props.APITransport(createUser);
        // this.listAllUsers();
    }
    deleteUser() {
        this.Action = "delete";
        let d = new deleteUserAPI(this.state.deletedUser, 20000)
        this.props.APITransport(d)
    }
    updateUser(userdata) {
        this.Action = 'update';
        let d = new updateUserAPI(userdata, 20000);
        this.props.APITransport(d);
    }
    /**-------------------------User section--------------------------------------------------------------- */
    /**-------------------------Role section--------------------------------------------------------------- */

    addRole(rowdata) {
        this.Action = 'addrole';
        let _createRoleAPI = new CreateRoleAPI(rowdata, 20000);
        this.props.APITransport(_createRoleAPI);

    }

    deleteRole() {
        this.Action = 'deleterole';
        let _deleteRoleAPI = new DeleteRoleAPI(_.get(this.state.deletedRole, 'name'), 2000);
        this.props.APITransport(_deleteRoleAPI);

    }
    updateRole(rowdata) {
        this.Action = 'updaterole';
        let modifyRoleAPI = new ModifyRoleAPI(rowdata, 20000);
        this.props.APITransport(modifyRoleAPI);

    }
    /**-------------------------Role section--------------------------------------------------------------- */

    setdeleteRole(rowdata) {
        this.setState({
            isOpenDelete: !this.state.isOpenDelete,
            deleteMessage: 'Are you sure want to delete the Role',
            deletedRole: rowdata
        })
    }

    componentDidMount() {
        if (hasRoutePermission('USERS')) {
            this.listAllUsers();
            this.listAllRoles();
        } else if (hasRoutePermission('ROLES')) {
            this.listAllRoles();
            this.setState({ value: 'ROLES.VIEW' });
        }

    }
    componentWillReceiveProps(prevProps, nextProps) {

        this.setState({
            tableData: this.props.usersList,
        });

        if (this.Action) {
            if (this.Action === 'adduser' && this.props.addUserStatus) {
                if (this.props.addUserStatus.status) {
                    this.setState({
                        ShowTost: true,
                        tostMessage: prevProps.addUserStatus.data || ''
                    })
                    this.Action = "";
                    if (this.props.addUserStatus.status === "1") {
                        this.listAllUsers();
                    }
                }
            }

            if (this.Action === 'update' && this.props.updateUsertatus) {
                if (this.props.updateUsertatus.status) {
                    this.setState({
                        ShowTost: true,
                        tostMessage: this.props.updateUsertatus.data || ''
                    });
                    this.Action = "";
                    if (this.props.updateUsertatus.status === "1") {
                        this.listAllUsers();
                    }
                }
            }
            if (this.Action === 'delete' && this.props.deleteUserStatus) {
                if (this.props.deleteUserStatus.status) {
                    this.setState({
                        ShowTost: true,
                        tostMessage: this.props.deleteUserStatus.data || ''
                    });
                    this.Action = "";
                    if (this.props.deleteUserStatus.status === "1") {
                        this.listAllUsers();
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
        if (this.state.value === 'ROLES.VIEW') {
            this.setState({
                IsOpenAddRole: !this.state.IsOpenAddRole,
                editRoleData: {}
            })
        } else {
            this.setState({
                IsOpen: !this.state.IsOpen,
                infoData: {}
            });
        }
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

    setdeleteUser(data) {
        this.setState({
            isOpenDelete: !this.state.isOpenDelete,
            deleteMessage: 'Are you sure want to delete the User',
            deletedUser: data
        })
    }
    handleOk() {
        this.setState({
            isOpenDelete: !this.state.isOpenDelete
        })

        if (this.state.value === 'ROLES.VIEW') {
            this.deleteRole();
        } else {
            this.deleteUser();
        }

    }
    hangleClose() {
        this.setState({
            isOpenDelete: !this.state.isOpenDelete,
            deletedUser: null,
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
                                <Typography className={classes.header} variant="h6" color="inherit">User's <br />
                                {/* hoverLink */}
                                    <b><Link to={`/home`} className={classes.link1}>Dashboard </Link> <span className={classes.arrow}> > </span><span className={classes.fontS}> Users</span></b>
                                </Typography>
                                <div className={classes.fillspace}></div>
                                <div>
                                    {
                                        this.state.value !== 'ROLES.VIEW' &&
                                        <RemoveButton buttonType={"AddButton"} text={"Add User"} RoleKey={"USERS"} RoleAction={"ADD"} handleClick={this.handleClick.bind(this)} />
                                    }
                                    {
                                        this.state.value === 'ROLES.VIEW' &&
                                        <RemoveButton buttonType={"AddButton"} text={"Add Role"} RoleKey={"ROLES"} RoleAction={"ADD"} handleClick={this.handleClick.bind(this)} />
                                    }

                                </div>

                            </Toolbar>
                        </AppBar>
                        <Row className={classes.buttonGroup}>
                            <Col md="6">
                                <CustomTabs tabType={"SimpleTab"} myTabs={myTabs} value={this.state.value} handleChange={this.handleChange} />
                            </Col>
                        </Row>
                        <AddUser IsOpen={this.state.IsOpen}
                            RESPONSE={this.state.RESPONSE}
                            plvs={this.state.plvs}
                            roles={this.props.rolesList}
                            editUserData={this.state.infoData}
                            closeDrawer={this.handleClick.bind(this)}
                            onSubmit={this.AddUser_submit.bind(this)}
                            updateUser={this.updateUser.bind(this)}
                        />
                        <AddRole IsOpen={this.state.IsOpenAddRole}
                            closeDrawer={this.handleClick.bind(this)}
                            editRoleData={this.state.editRoleData}
                            privilegesList={this.props.privilegesList}
                            submit={this.addRole.bind(this)}
                            update={this.updateRole.bind(this)}
                        />
                        <UserInfo infoData={this.state.infoData}
                            roles={this.props.rolesList}
                            IsOpen={this.state.IsOpen_info}
                            closeDrawer={this.handleCancelInfoClick.bind(this)}
                        />
                        {
                            this.state.value !== 'ROLES.VIEW' && !this.props.apistatus.progress && this.props.usersList &&
                            <UiTable
                                data={this.state.tableData}
                                columnData={columnData}
                                tableType="USER_TABLE"
                                orderBy={'Email'}
                                needCheckBox={false}
                                needHash={true}
                                needSearch={true}
                                toggleSideDrawer={this.handleInfoClick.bind(this)}
                                editInfo={this.handleEditClick.bind(this)}
                                deleteUser={this.setdeleteUser.bind(this)}
                            />
                        }
                        {
                            this.state.value === 'ROLES.VIEW' && !this.props.apistatus.progress && this.props.rolesList &&
                            <UiTable
                                data={this.props.rolesList}
                                columnData={columnData1}
                                orderBy={'name'}
                                tableType="ROLE_TABLE"
                                needCheckBox={false}
                                needHash={true}
                                needSearch={true}
                                toggleSideDrawer={this.handleInfoClick.bind(this)}
                                editRole={this.handleEditRoleClick.bind(this)}
                                deleteRole={this.setdeleteRole.bind(this)}
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
        usersList: state.usersList,
        login: state.login,
        // RESPONSE: state.dashboard.RESPONSE,
        // plvs: state.dashboard.PLVS,
        rolesList: state.rolesList,
        privilegesList: state.privilegesList,
        apistatus: state.apistatus,

        addUserStatus: state.createUser,
        updateUsertatus: state.updateUser,
        deleteUserStatus: state.deleteUser,
        createRoleStatus: state.createRole,
        modifyRoleStatus: state.modifyRole,
        deleteRoleStatus: state.deleteRole
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(User)));


