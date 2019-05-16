import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import APITransport from '../../../actions/apitransport/apitransport';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './CenterStyle';
import AppBar from '@material-ui/core/AppBar';
import UiTable from '../../common/UiTable/UiTable';
import { Link } from 'react-router-dom';
import BusyIndicator from '../../common/BusyIndicator';
// import ListCentersAPI from '../../../actions/apis/Centers/listCenters';
// import updateCenterAPI from '../../../actions/apis/Centers/updateCenter';
// import deleteCenterAPI from '../../../actions/apis/Centers/deleteCenter';

import AddCenter from './AddCenter/AddCenter';
import CenterInfo from './CenterInfo/CenterInfo';
import ConfirmationBox from '../../common/ConfirmationBox/ConfirmationBox';
import Toast from '../../common/Toast';
import _ from 'lodash';
import RemoveButton from '../../common/Inputs/Buttons/ActionButtons';
import { hasRoutePermission } from '../../../utils/AuthPermissions';

const columnData = [
	{ id: 'id', numeric: false, disablePadding: false, label: 'Unique Code' },
	{ id: 'DisplayName', numeric: false, disablePadding: false, label: 'Center Name' },
	{ id: 'Email', numeric: false, disablePadding: false, label: 'Email' },
	{ id: 'Mobile', numeric: false, disablePadding: false, label: 'Phone No' },

	// { id: 'PLV', numeric: false, disablePadding: false, label: 'Nodes Handlling' }
];

class Centers extends Component {
	Action: string;
	constructor(props) {
		super(props);
		this.state = {
			value: 'CENTERS.VIEW',
			deleteMessage: 'Are you sure want to delete',
			IsOpen: false,
			IsOpen_info: false,
			IsOpen_edit: false,
			isOpenDelete: false,
			IsOpenAddRole: false,
			deletedCenter: null,
			deletedRole: null,
			infoData: {},
			editRoleData: {},
			displayTost: false,
			displayTostMessage: '',
			ShowTost: false,
			tostMessage: this.props.addCenterStatus.message || '',
			tableData: this.props.CentersList || []
		};
		this.Action = '';
	}

	listAllCenters() {
		// let listCenters = new ListCentersAPI(20000);
		// this.props.APITransport(listCenters)
	}
	listAllRoles() {
		// let listRolesAPI = new ListRolesAPI(20000);
		// this.props.APITransport(listRolesAPI);
	}
	/**-------------------------Center section--------------------------------------------------------------- */
	AddCenter_submit(values) {
		this.Action = 'addCenter';
		// let createCenter = new createCenterAPI(values, 20000);
		// this.props.APITransport(createCenter);
		// this.listAllCenters();
	}
	deleteCenter() {
		this.Action = 'delete';
		// let d = new deleteCenterAPI(this.state.deletedCenter, 20000)
		// this.props.APITransport(d)
	}
	updateCenter(Centerdata) {
		this.Action = 'update';
		// let d = new updateCenterAPI(Centerdata, 20000);
		// this.props.APITransport(d);
	}
	/**-------------------------Center section--------------------------------------------------------------- */

	setdeleteRole(rowdata) {
		this.setState({
			isOpenDelete: !this.state.isOpenDelete,
			deleteMessage: 'Are you sure want to delete the Role',
			deletedRole: rowdata
		});
	}

	componentDidMount() {
		if (hasRoutePermission('CenterS')) {
			this.listAllCenters();
			this.listAllRoles();
		} else if (hasRoutePermission('ROLES')) {
			this.listAllRoles();
			this.setState({ value: 'ROLES.VIEW' });
		}
	}
	componentWillReceiveProps(prevProps, nextProps) {
		this.setState({
			tableData: this.props.CentersList
		});

		if (this.Action) {
			if (this.Action === 'addCenter' && this.props.addCenterStatus) {
				if (this.props.addCenterStatus.status) {
					this.setState({
						ShowTost: true,
						tostMessage: prevProps.addCenterStatus.data || ''
					});
					this.Action = '';
					if (this.props.addCenterStatus.status === '1') {
						this.listAllCenters();
					}
				}
			}

			if (this.Action === 'update' && this.props.updateCentertatus) {
				if (this.props.updateCentertatus.status) {
					this.setState({
						ShowTost: true,
						tostMessage: this.props.updateCentertatus.data || ''
					});
					this.Action = '';
					if (this.props.updateCentertatus.status === '1') {
						this.listAllCenters();
					}
				}
			}
			if (this.Action === 'delete' && this.props.deleteCenterStatus) {
				if (this.props.deleteCenterStatus.status) {
					this.setState({
						ShowTost: true,
						tostMessage: this.props.deleteCenterStatus.data || ''
					});
					this.Action = '';
					if (this.props.deleteCenterStatus.status === '1') {
						this.listAllCenters();
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
			IsOpen_info: !this.state.IsOpen_info
		});
	}
	handleEditClick(rowdata) {
		this.setState({
			IsOpen: !this.state.IsOpen,
			infoData: rowdata
		});
	}

	setdeleteCenter(data) {
		this.setState({
			isOpenDelete: !this.state.isOpenDelete,
			deleteMessage: 'Are you sure want to delete the Center',
			deletedCenter: data
		});
	}
	handleOk() {
		this.setState({
			isOpenDelete: !this.state.isOpenDelete
		});

		if (this.state.value === 'ROLES.VIEW') {
			this.deleteRole();
		} else {
			this.deleteCenter();
		}
	}
	deleteRole() {
		throw new Error("Method not implemented.");
	}
	hangleClose() {
		this.setState({
			isOpenDelete: !this.state.isOpenDelete,
			deletedCenter: null,
			deletedRole: null
		});
	}
	toggleSideDrawer(event) {
		console.log(event);
	}
	handleEditRoleClick(rowdata) {
		this.setState({
			editRoleData: rowdata,
			IsOpenAddRole: !this.state.IsOpenAddRole
		});
	}
	handleChange = (event, value) => {
		this.setState({ value });
	};

	closeTost() {
		this.setState({ ShowTost: false });
	}

	render() {
		const { classes } = this.props;
		//console.log("ShowTost", this.state.ShowTost);
		return (
			<div>
				{/* {this.renderTost()} */}
				<Toast
					show={this.state.ShowTost}
					message={this.state.tostMessage}
					closeTost={this.closeTost.bind(this)}
				/>
				<BusyIndicator progress={this.props.apistatus.progress} />
				{
					<div className={classes.tableBackground}>
						<AppBar position="static" color="default" className={classes.appbg}>
							<Toolbar className={classes.toolbar}>
								<Typography className={classes.header} variant="h6" color="inherit">
									Centers <br />
									<b>
										<Link to={`/home`} className={classes.link1}>
											Dashboard{' '}
										</Link>{' '}
										<span className={classes.arrow}> > </span>
										<span className={classes.fontS}> Centers</span>
									</b>
								</Typography>
								<div className={classes.fillspace} />
								<div>
									{
										<RemoveButton
											buttonType={'AddButton'}
											text={'Add Center'}
											RoleKey={'CenterS'}
											RoleAction={'ADD'}
											handleClick={this.handleClick.bind(this)}
										/>
									}

								</div>
							</Toolbar>
						</AppBar>

						<AddCenter
							IsOpen={this.state.IsOpen}
							RESPONSE={this.state.RESPONSE}
							// plvs={this.state.plvs}
							// roles={this.props.rolesList}
							editCenterData={this.state.infoData}
							closeDrawer={this.handleClick.bind(this)}
							onSubmit={this.AddCenter_submit.bind(this)}
							updateCenter={this.updateCenter.bind(this)}
						/>

						<CenterInfo
							infoData={this.state.infoData}
							roles={this.props.rolesList}
							IsOpen={this.state.IsOpen_info}
							closeDrawer={this.handleCancelInfoClick.bind(this)}
						/>
						{
							<UiTable
								data={this.state.tableData}
								columnData={columnData}
								tableType="CENTERS_TABLE"
								orderBy={'Email'}
								needCheckBox={false}
								needHash={true}
								needSearch={true}
								toggleSideDrawer={this.handleInfoClick.bind(this)}
								editInfo={this.handleEditClick.bind(this)}
								deleteUser={this.setdeleteCenter.bind(this)}
							/>
						}

						<ConfirmationBox
							IsOpen={this.state.isOpenDelete}
							cancelButton="Cancel"
							okButton="Ok"
							hangleClose={this.hangleClose.bind(this)}
							handleOk={this.handleOk.bind(this)}
						>
							<span>{this.state.deleteMessage}</span>
						</ConfirmationBox>
					</div>
				}
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	debugger;
	return {
		CentersList: state.CentersList,
		login: state.login,
		rolesList: state.rolesList,
		privilegesList: state.privilegesList,
		apistatus: state.apistatus,
		addCenterStatus: state.createCenter,
		updateCentertatus: state.updateCenter,
		deleteCenterStatus: state.deleteCenter
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return bindActionCreators(
		{
			APITransport: APITransport
		},
		dispatch
	);
};
export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Centers)));
