import React from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
import UiTableHead from './UiTableHead';
import styles from './UiTableStyles';
import ActionButtons from '../../common/Inputs/Buttons/ActionButtons';
// import moment from 'moment';
import TableSearch from '../TableSearch/TableSearch';

class EnhancedTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			order: this.props.order || 'asc',
			orderBy: this.props.orderBy || 'Email',
			selected: this.props.selected || [],
			data: this.props.data,
			columnData: this.props.columnData,
			page: 0,
			rowsPerPage: 10,
			showExpand: -1,
			fieldTableData: {},
			tableData: this.props.data
		};
		this.openSideDrawer = this.openSideDrawer.bind(this);
		this.handleRequestSort = this.handleRequestSort.bind(this);
	}
	componentWillReceiveProps(nextProp) {
		if (nextProp.selected !== this.props.selected) {
			this.setState({
				selected: nextProp.selected
			});
		}
		if (nextProp.data !== this.props.data) {
			this.setState({
				// data: nextProp.data,
				tableData: nextProp.data
			});
		}
	}

	getSorting(order, orderBy) {
		return order === 'desc'
			? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
			: (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
	}
	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		this.setState({ order, orderBy });
	};

	handleSelectAllClick = (event, checked) => {
		const { tableType } = this.props;
		const { tableData } = this.state;
		var selectedRows = [];
		if (tableType === 'ALERT_TABLE') {
			if (checked) {
				selectedRows = tableData.map((n) => n.ALARM_ID);
				this.setState({
					selected: selectedRows
				});
				this.props.updateSelectedRows(selectedRows);
			} else {
				this.setState({ selected: selectedRows });
				this.props.updateSelectedRows(selectedRows);
			}
		} else if (tableType === 'MANAGE_KPI_SYSTEM_TABLE' || tableType === 'MANAGE_KPI_SERVICE_TABLE') {
			if (checked) {
				selectedRows = tableData.map((n) => n.KPI_ID);
				this.setState({
					selected: selectedRows
				});
				this.props.updateSelectedRows(selectedRows);
			} else {
				this.setState({ selected: selectedRows });
				this.props.updateSelectedRows(selectedRows);
			}
		} else if (tableType === 'TASK_TABLE') {
			if (checked) {
				selectedRows = tableData.map((n) => n.TASK_ID);
				this.setState({
					selected: selectedRows
				});
				this.props.updateSelectedRows(selectedRows);
			} else {
				this.setState({ selected: selectedRows });
				this.props.updateSelectedRows(selectedRows);
			}
		} else if (tableType === 'EVENT_TABLE') {
			if (checked) {
				selectedRows = tableData.map((n) => n._id);
				this.setState({
					selected: selectedRows
				});
				this.props.updateSelectedRows(selectedRows);
			} else {
				this.setState({ selected: selectedRows });
				this.props.updateSelectedRows(selectedRows);
			}
		} else if (tableType === 'EVENT_AUDIT_TRAIL_TABLE') {
			if (checked) {
				selectedRows = tableData.map((n) => n._id);
				this.setState({
					selected: selectedRows
				});
				this.props.updateSelectedRows(selectedRows);
			} else {
				this.setState({ selected: selectedRows });
				this.props.updateSelectedRows(selectedRows);
			}
		}
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = (event) => {
		this.setState({ rowsPerPage: event.target.value });
	};
	handleClick = (event, id) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		this.setState({ selected: newSelected });
		this.props.updateSelectedRows(newSelected);
	};
	isSelected = (id) => this.state.selected.indexOf(id) !== -1;

	//handle button events
	openSideDrawer(g) {
		this.props.toggleSideDrawer(g);
	}
	handleChange12 = (panel, idx) => (event, expanded) => {
		this.setState({
			expanded: expanded ? idx : -1
		});
	};
	showFieldDetails(rowData, idx) {
		this.setState({
			fieldTableData: rowData,
			showExpand: idx === this.state.showExpand ? -1 : idx
		});
	}
	renderConfigTable(n, idx) {
		const { tableType } = this.props;
		if (tableType === 'USER_TABLE') {
			return this.renderUserData(n, idx);
		} else if (tableType === 'ROLE_TABLE') {
			return this.renderRoleData(n, idx);
		} else if (tableType === 'MEMBER_TABLE') {
			return this.renderMemberTable(n, idx);
		} else if(tableType === 'CENTERS_TABLE'){
			return this.renderCenterTable(n, idx);
		}else if(tableType === 'PARENTS_TABLE'){
			return this.renderParentTable(n, idx);
		}
	}

	renderRoles(rowdata) {
		const { classes } = this.props;
		if (rowdata.permissions && typeof rowdata.permissions === 'string') {
			let permissions = JSON.parse(rowdata.permissions || {});
			var template = (
				<div className={classes.displayArray}>
					{_.map(permissions, (item, idx) => {
						return item.isActive
							? _.map(_.get(item, 'privileges'), (privileges) => {
									let privilege = _.get(privileges, 'name');
									return privileges.isActive ? (
										<span key={idx + 'span-' + privilege}>{privilege}</span>
									) : null;
								})
							: null;
					})}
				</div>
			);
			return template;
		}
		return null;
	}

	renderRoleData(n, idx) {
		const { classes } = this.props;
		return (
			<TableRow hover tabIndex={-1} key={idx} className={classes.tBodyStyle}>
				{/* <TableCell component="th" scope="row">
          <Checkbox checked={true} />
        </TableCell>*/}
				<TableCell component="th" scope="row" data-title={'SN: '}>
					{this.state.page * this.state.rowsPerPage + idx + 1}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Role Name: '}>
					{n.name}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Role Description: '}>
					{n.description || '---'}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Permissions: '}>
					{/* <div className={classes.displayArray}>{_.map(n.permissions, (item, idx) => <span key={idx + 'span'}>{item === 'undefined' ? '' : item}</span>) || ''}</div> */}
					{/* <div className={classes.displayArray}>{n.permissions || ''}</div> */}
					{this.renderRoles(n) || '---'}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Actions: '}>
					<div className={classes.actionDisplay}>
						<ActionButtons
							buttonType="edit"
							RoleKey="ROLES"
							RoleAction={'EDIT'}
							handleClick={this.props.editRole}
							value={n}
						/>
						<ActionButtons
							buttonType="remove"
							RoleKey="ROLES"
							RoleAction={'DELETE'}
							handleClick={this.props.deleteRole}
							value={n}
						/>
					</div>
				</TableCell>
			</TableRow>
		);
	}
	ChipClass(stateOfAlarm) {
		const { classes } = this.props;
		if (stateOfAlarm) {
			switch (stateOfAlarm.toLowerCase()) {
				case 'healthy':
					return classes.actionDisplay_Normal;
				case 'minor':
					return classes.actionDisplay_Minor;
				case 'major':
					return classes.actionDisplay_Major;
				case 'critical':
					return classes.actionDisplay_Critical;
				case 'warning':
					return classes.actionDisplay_Warning;
				default:
					return classes.actionDisplay_Normal;
			}
		}
	}

	renderPLVs(PLVs) {
		const { classes } = this.props;
		return (
			<div className={classes.displayArray}>
				{_.map(PLVs, (item, idx) => {
					if (item[0] && item[1] && item[2]) {
						return <span key={idx + 'span'}>{item[0] + '(' + item[1] + ', ' + item[2] + ')'}</span>;
					} else {
						return <span key={'nodataspan'}>---</span>;
					}
				})}
			</div>
		);
	}
	renderUserData(n, idx) {
		const { classes } = this.props;
		const isSelected = this.isSelected(n.Email);
		return (
			<TableRow
				hover
				// onClick={event => this.handleClick(event, n.Email)}
				role="checkbox"
				aria-checked={isSelected}
				tabIndex={-1}
				key={n.Email + '-' + idx}
				selected={isSelected}
				className={classes.tBodyStyle}
			>
				{/* <TableCell component="th" scope="row" padding="none">
          <Checkbox checked={isSelected} />
        </TableCell> */}
				<TableCell component="th" scope="row" data-title={'Sr: '}>
					{this.state.page * this.state.rowsPerPage + idx + 1}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Name: '}>
					{n.FirstName + ' ' + n.LastName}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Email: '}>
					{n.Email}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Mobile: '}>
					{n.Mobile}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Role: '}>
					{n.Role}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Nodes Handlling: '}>
					{this.renderPLVs(n.PLV)}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Actions: '}>
					<div className={classes.actionDisplay}>
						<ActionButtons
							buttonType="edit"
							RoleKey={'USERS'}
							RoleAction={'EDIT'}
							handleClick={this.props.editInfo}
							value={n}
						/>
						<ActionButtons
							buttonType="details"
							RoleKey={'USERS'}
							RoleAction={'VIEW'}
							handleClick={this.props.toggleSideDrawer}
							value={n}
						/>
						<ActionButtons
							buttonType="remove"
							RoleKey={'USERS'}
							RoleAction={'DELETE'}
							handleClick={this.props.deleteUser}
							value={n}
						/>
					</div>
				</TableCell>
			</TableRow>
		);
	}
	renderParentTable(n, idx) {
		const { classes } = this.props;
		const isSelected = this.isSelected(n.Email);
		return (
			<TableRow
				hover
				// onClick={event => this.handleClick(event, n.Email)}
				role="checkbox"
				aria-checked={isSelected}
				tabIndex={-1}
				key={n.Email + '-' + idx}
				selected={isSelected}
				className={classes.tBodyStyle}
			>
				{/* <TableCell component="th" scope="row" padding="none">
          <Checkbox checked={isSelected} />
        </TableCell> */}
				<TableCell component="th" scope="row" data-title={'Sr: '}>
					{this.state.page * this.state.rowsPerPage + idx + 1}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'userName: '}>
					{n.userName}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Center Name: '}>
					{n.displayName}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Email: '}>
					{n.email || 'xxxxxxxxxx@xxx.com'}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Mobile: '}>
					{n.mobile || 'xxxxxxxxxx'}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Center: '}>
					{n.center || '--'}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Status: '}>
					{n.status || '--'}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Actions: '}>
					<div className={classes.actionDisplay}>
						<ActionButtons
							buttonType="edit"
							RoleKey={'PARENTS'}
							RoleAction={'EDIT'}
							handleClick={this.props.editInfo}
							value={n}
						/>
						<ActionButtons
							buttonType="details"
							RoleKey={'PARENTS'}
							RoleAction={'VIEW'}
							handleClick={this.props.toggleSideDrawer}
							value={n}
						/>
						<ActionButtons
							buttonType="remove"
							RoleKey={'USERS'}
							RoleAction={'DELETE'}
							handleClick={this.props.deleteUser}
							value={n}
						/>
					</div>
				</TableCell>
			</TableRow>
		);
	}

	renderCenterTable(n, idx) {
		const { classes } = this.props;
		const isSelected = this.isSelected(n.Email);
		return (
			<TableRow
				hover
				// onClick={event => this.handleClick(event, n.Email)}
				role="checkbox"
				aria-checked={isSelected}
				tabIndex={-1}
				key={n.Email + '-' + idx}
				selected={isSelected}
				className={classes.tBodyStyle}
			>
				{/* <TableCell component="th" scope="row" padding="none">
          <Checkbox checked={isSelected} />
        </TableCell> */}
				<TableCell component="th" scope="row" data-title={'Sr: '}>
					{this.state.page * this.state.rowsPerPage + idx + 1}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Unique Code: '}>
					{n.id}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Center Name: '}>
					{n.DisplayName}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Email: '}>
					{n.Email || 'xxxxxxxxxx@xxx.com'}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Mobile: '}>
					{n.Mobile || 'xxxxxxxxxx'}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Actions: '}>
					<div className={classes.actionDisplay}>
						<ActionButtons
							buttonType="edit"
							RoleKey={'USERS'}
							RoleAction={'EDIT'}
							handleClick={this.props.editInfo}
							value={n}
						/>
						<ActionButtons
							buttonType="details"
							RoleKey={'USERS'}
							RoleAction={'VIEW'}
							handleClick={this.props.toggleSideDrawer}
							value={n}
						/>
						<ActionButtons
							buttonType="remove"
							RoleKey={'USERS'}
							RoleAction={'DELETE'}
							handleClick={this.props.deleteUser}
							value={n}
						/>
					</div>
				</TableCell>
			</TableRow>
		);
	}


	renderMemberTable(n, idx) {
		const { classes } = this.props;
		const isSelected = this.isSelected(n.Email);
		return (
			<TableRow
				hover
				// onClick={event => this.handleClick(event, n.Email)}
				role="checkbox"
				aria-checked={isSelected}
				tabIndex={-1}
				key={n.Email + '-' + idx}
				selected={isSelected}
				className={classes.tBodyStyle}
			>
				<TableCell component="th" scope="row" data-title={'Sr: '}>
					{this.state.page * this.state.rowsPerPage + idx + 1}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Member Name: '}>
					{n.name}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Email: '}>
					{n.email}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Mobile: '}>
					{n.mobile}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Department: '}>
					{n.dept}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Groups: '}>
					{n.group}
				</TableCell>
				<TableCell component="th" scope="row" data-title={'Actions: '}>
					<div className={classes.actionDisplay}>
						<ActionButtons
							buttonType="edit"
							RoleKey={'NOTIFY'}
							RoleAction={'EDIT_MEMBERS'}
							handleClick={this.props.editMember}
							value={n}
						/>
						<ActionButtons
							buttonType="remove"
							RoleKey={'NOTIFY'}
							RoleAction={'DELETE_MEMBERS'}
							handleClick={this.props.deleteMember}
							value={n}
						/>
					</div>
				</TableCell>
			</TableRow>
		);
	}

	setFilteredList(newList) {
		this.setState({
			tableData: newList
		});
	}
	render() {
		const { data, columnData, classes, tableType, needCheckBox, needHash, needSearch } = this.props;
		const { tableData, order, orderBy, selected, rowsPerPage, page } = this.state;
		return (
			<Paper className={classes.root}>
				<div className={classes.tableDiv}>
					{
						<Table className={[ classes.table, 'responsiveTable' ].join(' ')} aria-labelledby="tableTitle">
							<UiTableHead
								className={classes.thead}
								columnData={columnData}
								numSelected={selected.length}
								order={order}
								orderBy={orderBy}
								onSelectAllClick={this.handleSelectAllClick}
								onRequestSort={this.handleRequestSort}
								rowCount={tableData.length}
								tableType={tableType}
								needCheckBox={needCheckBox}
								needHash={needHash}
								searchComponent={
									needSearch ? (
										<TableSearch
											list={data}
											tableType={tableType}
											updated={this.setFilteredList.bind(this)}
										/>
									) : null
								}
							/>
							{tableData && tableData.length > 0 ? (
								<TableBody className={classes.fontStyle}>
									{_.orderBy(
										tableData,
										(item) => (_.get(item, orderBy) || '').toString().toLowerCase(),
										[ order ]
									)
										// data
										//   .sort(this.getSorting(order, orderBy))
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((n, idx) => {
											return this.renderConfigTable(n, idx);
										})}
								</TableBody>
							) : (
								<TableBody>
									<TableRow className={classes.tBodyStyle}>
										<TableCell
											colSpan={columnData.length + 3}
											component="th"
											scope="row"
											data-title={'Actions: '}
										>
											<h4 className={classes.alignCenter}>No Data Available</h4>
										</TableCell>
									</TableRow>
								</TableBody>
							)}
						</Table>
					}

					{tableData &&
					tableData.length > 0 && (
						<TablePagination
							classes={{ menuItem: classes.pagination }}
							className={classes.pagination}
							component="div"
							count={tableData.length}
							rowsPerPage={rowsPerPage}
							page={page}
							backIconButtonProps={{
								'aria-label': 'Previous Page'
							}}
							nextIconButtonProps={{
								'aria-label': 'Next Page'
							}}
							labelRowsPerPage="Showing"
							onChangePage={this.handleChangePage}
							onChangeRowsPerPage={this.handleChangeRowsPerPage}
						/>
					)}
				</div>
			</Paper>
		);
	}
}

export default withStyles(styles)(EnhancedTable);
