import React from 'react';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import UiTableHead from './UiTableHead'
import styles from './UiTableStyles'
import ActionButtons from '../../common/Inputs/Buttons/ActionButtons'
import SVG from 'react-inlinesvg';
import plusCircle from '../../../../images/icons/plus-circle.svg';
import minusCircle from '../../../../images/icons/minus-circle.svg'
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import moment from 'moment';
import FieldTable from '../../common/Table/Table';
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
    this.openSideDrawer = this.openSideDrawer.bind(this)
    this.handleRequestSort = this.handleRequestSort.bind(this)
  }
  componentWillReceiveProps(nextProp) {
    if (nextProp.selected !== this.props.selected) {
      this.setState({
        selected: nextProp.selected
      })
    }
    if (nextProp.data !== this.props.data) {
      this.setState({
        // data: nextProp.data,
        tableData: nextProp.data
      })
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
        selectedRows = tableData.map(n => n.ALARM_ID)
        this.setState({
          selected: selectedRows
        });
        this.props.updateSelectedRows(selectedRows);
      }
      else {
        this.setState({ selected: selectedRows });
        this.props.updateSelectedRows(selectedRows);
      }
    } else if (tableType === 'MANAGE_KPI_SYSTEM_TABLE' || tableType === 'MANAGE_KPI_SERVICE_TABLE') {
      if (checked) {
        selectedRows = tableData.map(n => n.KPI_ID)
        this.setState({
          selected: selectedRows
        });
        this.props.updateSelectedRows(selectedRows);
      }
      else {
        this.setState({ selected: selectedRows });
        this.props.updateSelectedRows(selectedRows);
      }
    } else if (tableType === 'TASK_TABLE') {
      if (checked) {
        selectedRows = tableData.map(n => n.TASK_ID)
        this.setState({
          selected: selectedRows
        });
        this.props.updateSelectedRows(selectedRows);
      }
      else {
        this.setState({ selected: selectedRows });
        this.props.updateSelectedRows(selectedRows);
      }
    } else if (tableType === 'EVENT_TABLE') {
      if (checked) {
        selectedRows = tableData.map(n => n._id)
        this.setState({
          selected: selectedRows
        });
        this.props.updateSelectedRows(selectedRows);
      }
      else {
        this.setState({ selected: selectedRows });
        this.props.updateSelectedRows(selectedRows);
      }
    } else if (tableType === 'EVENT_AUDIT_TRAIL_TABLE') {
      if (checked) {
        selectedRows = tableData.map(n => n._id)
        this.setState({
          selected: selectedRows
        });
        this.props.updateSelectedRows(selectedRows);
      }
      else {
        this.setState({ selected: selectedRows });
        this.props.updateSelectedRows(selectedRows);
      }
    }

  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
    this.props.updateSelectedRows(newSelected);
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;

  //handle button events
  openSideDrawer(g) {
    this.props.toggleSideDrawer(g)
  }
  handleChange12 = (panel, idx) => (event, expanded) => {
    this.setState({
      expanded: expanded ? idx : -1,
    });
  };
  showFieldDetails(rowData, idx) {
    this.setState({
      fieldTableData: rowData,
      showExpand: idx === this.state.showExpand ? -1 : idx
    })
  }
  renderConfigTable(n, idx) {
    const { tableType } = this.props
    if (tableType === 'PHYSICAL_TABLE') {
      return this.renderConfigurePhysicalData(n, idx)
    } else if (tableType === 'DATA_TABLE') {
      // return this.renderConfigureDataTable(n, idx)
    } else if (tableType === 'USER_TABLE') {
      return this.renderUserData(n, idx)
    } else if (tableType === 'ALERT_TABLE') {
      return this.renderAlertData(n, idx)
    } else if (tableType === 'ROLE_TABLE') {
      return this.renderRoleData(n, idx)
    } else if (tableType === 'MANAGE_KPI_SYSTEM_TABLE') {
      return this.renderManageSystemKpiTable(n, idx)
    } else if (tableType === 'MANAGE_KPI_SERVICE_TABLE') {
      return this.renderManageServiceKpiTable(n, idx)
    } else if (tableType === 'TASK_TABLE') {
      return this.renderTasksTable(n, idx)
    } else if (tableType === 'EVENT_TABLE') {
      return this.renderEventTable(n, idx)
    } else if (tableType === 'EVENT_AUDIT_TRAIL_TABLE') {
      return this.renderEventAuditTrailTable(n, idx)
    } else if (tableType === 'MEMBER_TABLE') {
      return this.renderMemberTable(n, idx)
    }else if (tableType === 'NOTIFY_GROUP_TABLE') {
      return this.renderNotifyGroupTable(n, idx)
    } else if (tableType === 'NOTIFY_RULE_TABLE') {
      return this.renderNotifyRuleTable(n, idx)
    }else if (tableType === 'NOTIFY_LOGS_TABLE') {
      return this.renderNotifyLogsTable(n, idx)
    }

  }
  renderEventTable(n, idx) {
    const { classes, needCheckBox, needHash } = this.props;
    const isSelected = this.isSelected(n._id);
    var statusClass = this.ChipClass(n.ALARM_SEVERITY || 'none');
    // let date = moment(n.TIME);
    return (
      <TableRow
        hover
        aria-checked={isSelected}
        tabIndex={-1}
        key={n._id}
        selected={isSelected}
        className={classes.tBodyStyle}
      >
        {needCheckBox ?
          <TableCell component="th" scope="row" className={classes.checkboxcolumn} data-title={"Select: "}>
            <Checkbox checked={isSelected}
              onChange={event => this.handleClick(event, n._id)} />
          </TableCell>
          : null
        }
        {needHash ?
          <TableCell component="th" scope="row" className={classes.hashcolumn} data-title={"SN: "}>
            {this.state.page * this.state.rowsPerPage + idx + 1}
          </TableCell>
          : null
        }
        <TableCell component="th" scope="row" data-title={"Product Name: "}>
          <h4>{n.PRODUCT_NAME}</h4>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Event Name: "}>
          <h4>{n.displayName}</h4>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Node IP: "}>
          <span> {n.IP}</span>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Reported Time: "}>
          {/* <div>
             <span>  {date.calendar(null, {
              lastDay: '[Yesterday]',
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              lastWeek: '[last] dddd',
              nextWeek: 'dddd',
              sameElse: 'L'
            })}</span>
            <span>  {moment(date).format('DD/MM/YYYY')}</span>
            <span>  {moment(date.toLocaleString()).format('hh:mm:ss')}</span>
          </div> */}
          <span>{n.time}</span>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Event Type: "}>
          <span>{n.TYPE}</span>
        </TableCell>

        <TableCell component="th" scope="row" data-title={"Actions: "}>
          <div className={statusClass}>
            {/* need to change ALERTS to EVENTS*/}
            <ActionButtons buttonType="details" RoleKey={"ALERTS"} RoleAction={"VIEW"} handleClick={this.props.openDetails} value={n} />
            <ActionButtons buttonType="notify" RoleKey={"ALERTS"} RoleAction={"NOTIFY"} handleClick={this.props.notifyto} value={n} />
            <ActionButtons buttonType="edit" RoleKey={"ALERTS"} RoleAction={"VIEW"} handleClick={this.props.updateEvent} value={n} />
            <ActionButtons buttonType="remove" RoleKey={"ALERTS"} RoleAction={"VIEW"} handleClick={this.props.deleteEvent} value={n} />
          </div>
        </TableCell>
      </TableRow>
    );
  }
  renderEventAuditTrailTable(n, idx) {
    const { classes, needCheckBox, needHash } = this.props;
    const isSelected = this.isSelected(n._id);
    var statusClass = this.ChipClass(n.ALARM_SEVERITY || 'none');
    let date = moment(n.TIME);
    return (
      <TableRow
        hover
        aria-checked={isSelected}
        tabIndex={-1}
        key={n._id}
        selected={isSelected}
        className={classes.tBodyStyle}
      >
        {needCheckBox ?
          <TableCell component="th" scope="row" className={classes.checkboxcolumn} data-title={"Select: "}>
            <Checkbox checked={isSelected}
              onChange={event => this.handleClick(event, n._id)} />
          </TableCell>
          : null
        }
        {needHash ?
          <TableCell component="th" scope="row" className={classes.hashcolumn} data-title={"SN: "}>
            {this.state.page * this.state.rowsPerPage + idx + 1}
          </TableCell>
          : null
        }
        <TableCell component="th" scope="row" data-title={"Product Name: "}>
          <h4>{n.PRODUCT_NAME}</h4>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Node IP: "}>
          <span> {n.IP_ADDRESS}</span>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Reported Time: "}>
          <div>
            {/* <span>  {date.calendar(null, {
              lastDay: '[Yesterday]',
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              lastWeek: '[last] dddd',
              nextWeek: 'dddd',
              sameElse: 'L'
            })}</span> */}
            <span>  {moment(date).format('DD/MM/YYYY')}</span>
            <span>  {moment(date.toLocaleString()).format('hh:mm:ss')}</span>
          </div>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Severity: "}>
          <span>{n.TYPE}</span>
        </TableCell>

        <TableCell component="th" scope="row" data-title={"Actions: "}>
          <div className={statusClass}>
            {/* need to change ALERTS to EVENTS*/}
            <ActionButtons buttonType="details" RoleKey={"ALERTS"} RoleAction={"VIEW"} handleClick={this.props.openDetails} value={n} />
            <ActionButtons buttonType="notify" RoleKey={"ALERTS"} RoleAction={"NOTIFY"} handleClick={this.props.notifyto} value={n} />
          </div>
        </TableCell>
      </TableRow>
    );
  }
  renderTasksTable(n, idx) {
    const { classes, needCheckBox, needHash } = this.props;
    const isSelected = this.isSelected(n.TASK_ID);
    var statusClass = this.ChipClass(n.ALARM_SEVERITY || 'none');
    let date = moment(n.RUN_TIME);
    return (
      <TableRow
        hover
        aria-checked={isSelected}
        tabIndex={-1}
        key={n.TASK_ID}
        selected={isSelected}
        className={classes.tBodyStyle}
      >
        {needCheckBox ?
          <TableCell component="th" scope="row" className={classes.checkboxcolumn} data-title={"Select: "}>
            <Checkbox checked={isSelected}
              onChange={event => this.handleClick(event, n.TASK_ID)} />
          </TableCell>
          : null
        }
        {needHash ?
          <TableCell component="th" scope="row" className={classes.hashcolumn} data-title={"SN: "}>
            {this.state.page * this.state.rowsPerPage + idx + 1}

          </TableCell>
          : null
        }
        <TableCell component="th" scope="row" data-title={"Alert Name: "}>
          <h4>{n.SCRIPT_NAME}</h4>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Severity: "}>
          <span>{n.NODE_NAME}</span>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Node IP: "}>
          <span> {n.NODE_IP}</span>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Reported Time: "}>
          <div>
            <span>  {moment(date).format('DD/MM/YYYY')}</span>
            <span>  {moment(date.toLocaleString()).format('hh:mm:ss')}</span>
          </div>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Repeted Count: "}>
          <span> {n.TYPE}</span>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Repeted Count: "}>
          <span> {n.STATUS}</span>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Actions: "}>
          <div className={statusClass} >
            {/* need to change ALERTS to TASK*/}
            <ActionButtons buttonType="edit" RoleKey={"USERS"} RoleAction={"DELETE"} handleClick={this.props.updateTask} value={n} />
            <ActionButtons buttonType="details" RoleKey={"ALERTS"} RoleAction={"VIEW"} handleClick={this.props.taskDetails} value={n} />
            <ActionButtons buttonType="remove" RoleKey={"USERS"} RoleAction={"DELETE"} handleClick={this.props.deleteTask} value={n} />
          </div>
        </TableCell>
      </TableRow>
    );
  }
  renderRoles(rowdata) {
    const { classes } = this.props;
    if (rowdata.permissions && typeof (rowdata.permissions) === 'string') {
      let permissions = JSON.parse(rowdata.permissions || {})
      var template = (
        <div className={classes.displayArray}>
          {_.map(permissions, (item, idx) => {
            return item.isActive
              ?
              (
                _.map(_.get(item, 'privileges'), privileges => {
                  let privilege = _.get(privileges, 'name')
                  return (privileges.isActive ?
                    <span key={idx + 'span-' + privilege}>
                      {privilege}
                    </span>
                    : null
                  )
                })
              )
              : null
          })
          }
        </div>);
      return template;
    } return null;
  }
  renderManageSystemKpiTable(n, idx) {
    const { classes, needCheckBox, needHash } = this.props;
    const isSelected = this.isSelected(n.KPI_ID);
    let statusClass = this.ChipClass(n.KPI_LEVEL);

    return (
      <TableRow
        aria-checked={isSelected}
        tabIndex={-1}
        key={n.KPI_ID}
        selected={isSelected}
        className={classes.tBodyStyle}
      >
        {needCheckBox ?
          <TableCell component="th" scope="row" className={classes.checkboxcolumn} data-title={"Select: "}>
            <Checkbox checked={isSelected}
              onChange={event => this.handleClick(event, n.KPI_ID)} />
          </TableCell>
          : null
        }
        {needHash ?
          <TableCell component="th" scope="row" data-title={"SN: "}>
            {this.state.page * this.state.rowsPerPage + idx + 1}
          </TableCell>
          : null
        }
        <TableCell component="th" scope="row" data-title={"KPI Name: "}>
          {n.KPI_NAME}
        </TableCell>
        {/* <TableCell component="th" scope="row">
          <span> {n.KPI_STATUS}</span>
        </TableCell> */}
        <TableCell component="th" scope="row" data-title={"Level: "}>
          {n.KPI_LEVEL}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Duration: "}>
          {n.KPI_DURATION}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Node IP: "}>
          {n.KPI_NODEIP}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Vendor: "}>
          {n.KPI_VENDOR}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Location: "}>
          {n.KPI_LOCATION}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Product: "}>
          {n.KPI_PRODUCT}
        </TableCell>

        <TableCell component="th" scope="row" data-title={"Actions: "}>
          <div className={[classes.actionDisplay, statusClass].join(' ')}>
            <ActionButtons buttonType="switch" isChecked={n.KPI_STATUS === 'ACTIVE' ? true : false} RoleKey={"KPI"} RoleAction={"EDIT"} handleClick={this.props.kpiStatus} value={n} />
            <ActionButtons buttonType="edit" RoleKey={"KPI"} RoleAction={"EDIT"} handleClick={this.props.editKpi} value={n} />
            <ActionButtons buttonType="details" RoleKey={"KPI"} RoleAction={"VIEW"} handleClick={this.props.ShowDetails} value={n} />
            <ActionButtons buttonType="remove" RoleKey={"KPI"} RoleAction={"DELETE"} handleClick={this.props.deleteKpiData} value={n} />
          </div>
        </TableCell>
      </TableRow>
    );
  }
  renderManageServiceKpiTable(n, idx) {
    const { classes, needCheckBox, needHash } = this.props;
    const isSelected = this.isSelected(n.KPI_ID);
    let statusClass = this.ChipClass(n.KPI_LEVEL);
    return (
      <TableRow
        aria-checked={isSelected}
        tabIndex={-1}
        key={n.KPI_ID}
        selected={isSelected}
        className={classes.tBodyStyle}
      >
        {needCheckBox ?
          <TableCell component="th" scope="row" className={classes.checkboxcolumn} data-title={"Select: "}>
            <Checkbox checked={isSelected}
              onChange={event => this.handleClick(event, n.KPI_ID)} />
          </TableCell>
          : null
        }
        {needHash ?
          <TableCell component="th" scope="row" data-title={"SN: "}>
            {this.state.page * this.state.rowsPerPage + idx + 1}
          </TableCell>
          : null
        }
        <TableCell component="th" scope="row" data-title={"KPI Name: "} >
          {n.KPI_NAME}
        </TableCell>
        {/* <TableCell component="th" scope="row"  data-title={"Service Name: "}>
          <span> {n.KPI_SERVICE_NAME || '--'}</span>
        </TableCell> */}
        {/* <TableCell component="th" scope="row">
          <span> {n.KPI_STATUS}</span>
        </TableCell> */}
        <TableCell component="th" scope="row" data-title={"Level: "}>
          <span> {n.KPI_LEVEL}</span>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Duration: "}>
          <span> {n.KPI_DURATION}</span>
        </TableCell>
        {/* <TableCell component="th" scope="row"  data-title={"Service Component: "}>
          <span>  {n.KPI_SERVICE_COMPONENT}</span>
        </TableCell> */}
        {/* <TableCell component="th" scope="row">
          <span> {n.KPI_STATUS}</span>
        </TableCell> */}

        <TableCell component="th" scope="row" data-title={"Actions: "}>
          <div className={[classes.actionDisplay, statusClass].join(' ')}>
            <ActionButtons buttonType="switch" isChecked={n.KPI_STATUS === 'ACTIVE' ? true : false} RoleKey={"KPI"} RoleAction={"EDIT"} handleClick={this.props.kpiStatus} value={n} />
            <ActionButtons buttonType="edit" RoleKey={"KPI"} RoleAction={"EDIT"} handleClick={this.props.editKpi} value={n} />
            <ActionButtons buttonType="details" RoleKey={"KPI"} RoleAction={"VIEW"} handleClick={this.props.ShowDetails} value={n} />
            <ActionButtons buttonType="remove" RoleKey={"KPI"} RoleAction={"DELETE"} handleClick={this.props.deleteKpiData} value={n} />
          </div>
        </TableCell>
      </TableRow>
    );
  }
  renderRoleData(n, idx) {
    const { classes } = this.props;
    return (
      <TableRow
        hover
        tabIndex={-1}
        key={idx}
        className={classes.tBodyStyle}
      >
        {/* <TableCell component="th" scope="row">
          <Checkbox checked={true} />
        </TableCell>*/}
        <TableCell component="th" scope="row" data-title={"SN: "}>
          {this.state.page * this.state.rowsPerPage + idx + 1}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Role Name: "}>
          {n.name}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Role Description: "}>
          {n.description || '---'}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Permissions: "}>
          {/* <div className={classes.displayArray}>{_.map(n.permissions, (item, idx) => <span key={idx + 'span'}>{item === 'undefined' ? '' : item}</span>) || ''}</div> */}
          {/* <div className={classes.displayArray}>{n.permissions || ''}</div> */}
          {this.renderRoles(n) || "---"}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Actions: "}>
          <div className={classes.actionDisplay}>
            <ActionButtons buttonType="edit" RoleKey="ROLES" RoleAction={"EDIT"} handleClick={this.props.editRole} value={n} />
            <ActionButtons buttonType="remove" RoleKey="ROLES" RoleAction={"DELETE"} handleClick={this.props.deleteRole} value={n} />
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
  renderAlertData(n, idx) {
    const { classes, needCheckBox, needHash } = this.props;
    const isSelected = this.isSelected(n.ALARM_ID);
    var statusClass = this.ChipClass(n.ALARM_SEVERITY || 'none');
    let date = moment(n.RAISED_TIME, "YYYY MM Do, h:mm:ss a");
    return (
      <TableRow
        hover
        aria-checked={isSelected}
        tabIndex={-1}
        key={n.ALARM_ID}
        selected={isSelected}
        className={classes.tBodyStyle}
      >
        {needCheckBox ?
          <TableCell component="th" scope="row" className={classes.checkboxcolumn} data-title={"Select: "}>
            <Checkbox checked={isSelected}
              onChange={event => this.handleClick(event, n.ALARM_ID)} />
          </TableCell>
          : null
        }
        {needHash ?
          <TableCell component="th" scope="row" className={classes.hashcolumn} data-title={"SN: "}>
            <span> {this.state.page * this.state.rowsPerPage + idx + 1}</span>
          </TableCell>
          : null
        }
        <TableCell component="th" scope="row" data-title={"Alert Name: "}>
          <h4>{n.ALARM_NAME}</h4>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Reported Time: "}>
          <div>
            {/* <span>  {date.calendar(null, {
              lastDay: '[Yesterday]',
              sameDay: '[Today]',
              nextDay: '[Tomorrow]',
              lastWeek: '[last] dddd',
              nextWeek: 'dddd',
              sameElse: 'L'
            })}</span> */}
            <span>  {date.format('DD/MM/YYYY')}</span>
            <span>  {date.format('hh:mm:ss')}</span>
          </div>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Severity: "}>
          <span>{n.ALARM_SEVERITY}</span>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Nodes: "}>
          <span> {n.PLV ? this.renderPLVs([n.PLV.split('_')]) : '--'}</span>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Node IP: "}>
          <span> {n.IP_ADDRESS}</span>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Repeted Count: "}>
          <span> {n.ALARM_REPEATED_COUNT}</span>
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Actions: "}>
          <div className={statusClass} >
            <ActionButtons
              buttonType="details"
              handleClick={this.props.configureShowDetails}
              RoleKey={"ALERTS"} RoleAction={"VIEW"}
              value={n} />
            <ActionButtons
              id={`notify_id_${n.ALARM_ID}_${idx}`}
              target={`notify_id_${n.ALARM_ID}_${idx}`}
              buttonType="notify"
              handleClick={this.props.notifyto}
              RoleKey={"ALERTS"} RoleAction={"NOTIFY"}
              value={n} />
          </div>
        </TableCell>
      </TableRow>
    );
  }

  renderConfigurePhysicalData(n, idx) {
    const { classes } = this.props;
    return (
      <TableRow
        hover
        tabIndex={-1}
        key={idx}
        className={classes.tBodyStyle}
      >
        <TableCell component="th" scope="row" data-title={"SN: "} >
          {this.state.page * this.state.rowsPerPage + idx + 1}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Server Name: "} >
          {n.SERVER_NAME}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"ID: "} >
          {n.id}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Product: "} >
          {n.PRODUCT_NAME}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Vendor: "} >
          {n.VENDOR_NAME}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Location: "} >
          {n.LOCATION}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Warranty: "} >
          {n.WARRANTY}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Status: "} >
          <p className={[n.Status.toLowerCase() === 'connected' && classes.statusConnectedColor, n.Status.toLowerCase() === 'pending' && classes.statusPendingColor, n.Status.toLowerCase() === 'disconnected' && classes.statusDisconnectedColor].join(' ')}>
            {n.Status}
          </p>

        </TableCell>
        <TableCell component="th" scope="row" data-title={"Actions: "} >
          <div className={classes.actionDisplay}>
            {
              n.Status.toLowerCase() === 'connected' &&
              <ActionButtons buttonType="connected" RoleKey={"CONFIGURE"} RoleAction={"DISCONNECT"} handleClick={this.props.disconnectConfigure} value={n} />
            }
            {
              n.Status.toLowerCase() === 'pending' &&
              <ActionButtons buttonType="pending" RoleKey={"CONFIGURE"} RoleAction={"CONNECT"} handleClick={this.props.addNewMinion} value={n} />
            }
            {
              n.Status.toLowerCase() !== 'disconnected' && n.Status.toLowerCase() !== 'pending' &&
              <ActionButtons buttonType="details" RoleKey={"CONFIGURE"} RoleAction={"VIEW_SERVER_DETAILS"} handleClick={this.props.configureShowDetails} value={n} />
            }
            {
              n.Status.toLowerCase() === 'disconnected' &&
              <ActionButtons buttonType="remove" RoleKey={"CONFIGURE"} RoleAction={"DISCONNECT"} handleClick={this.props.deleteMinionCompletely} value={n} />
            }
            {
              n.Status.toLowerCase() === 'connected' &&
              <ActionButtons buttonType="edit" RoleKey={"CONFIGURE"} RoleAction={"EDIT_SERVER_DETAILS"} handleClick={this.props.configureEditDetails} value={n} />
            }
          </div>
        </TableCell>
      </TableRow>
    );
  }
  renderConfigureDataTable(n, idx) {
    const { classes } = this.props;
    return (
      // <ExpansionPanel key={idx} className={classes.expansionPanel} expanded={idx === this.state.showExpand} onChange={() => this.showFieldDetails(n, idx)}>
      <ExpansionPanel key={idx} className={classes.expansionPanel} expanded={idx === this.state.showExpand} onChange={this.handleChange12(n, idx)}>
        <ExpansionPanelSummary className={classes.expansionPanelSummary}>
          <TableBody className={[classes.tBodyStyle, classes.expansionTable].join(' ')}>
            <TableRow
              hover
              tabIndex={-1}
              key={idx}
              className={classes.fieldDataStyle}
            >
              <TableCell onClick={() => this.showFieldDetails(n, idx)} component="th" scope="row" >
                <SVG src={idx !== this.state.showExpand ? plusCircle : minusCircle} className={[classes.Actionmenus, classes.orangeColor].join(' ')}>
                </SVG>
              </TableCell>
              <TableCell component="th" scope="row" data-title={"Location: "}>
                {n._source.locationName}
              </TableCell>
              <TableCell component="th" scope="row" data-title={"Vendor: "}>
                {n._source.vendorName}
              </TableCell>
              <TableCell component="th" scope="row" data-title={"Product: "}>
                {n._source.prodName}
              </TableCell>
              <TableCell component="th" scope="row" data-title={"ID: "}>
                {n._source.id}
              </TableCell>
              <TableCell component="th" scope="row" data-title={"Actions: "}>
                <div className={classes.actionDisplay}>
                  <ActionButtons buttonType="remove" RoleKey={"CONFIGURE"} RoleAction={"DELETE_CDR"} handleClick={this.props.deleteConfigureData} value={n} />
                  <ActionButtons buttonType="edit" RoleKey={"CONFIGURE"} RoleAction={"EDIT_CDR"} handleClick={this.props.editFileData} value={n} />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionDetails}>
          <FieldTable fieldTableData={this.state.fieldTableData} />
        </ExpansionPanelDetails>
      </ExpansionPanel>

    )
  }
  renderPLVs(PLVs) {
    const { classes } = this.props;
    return (
      <div className={classes.displayArray}>
        {
          _.map(PLVs, (item, idx) => {
            if (item[0] && item[1] && item[2]) {
              return (<span key={idx + 'span'}>
                {item[0] + "(" + item[1] + ", " + item[2] + ")"}
              </span>
              )
            }
            else {
             return (<span key={'nodataspan'}>---</span>)
            }
          })
        }
      </div>
    )
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
        <TableCell component="th" scope="row" data-title={"Sr: "}>
          {this.state.page * this.state.rowsPerPage + idx + 1}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Name: "} >
          {n.FirstName + ' ' + n.LastName}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Email: "}>{n.Email}</TableCell>
        <TableCell component="th" scope="row" data-title={"Mobile: "}>{n.Mobile}</TableCell>
        <TableCell component="th" scope="row" data-title={"Role: "}>{n.Role}</TableCell>
        <TableCell component="th" scope="row" data-title={"Nodes Handlling: "}>{this.renderPLVs(n.PLV)}</TableCell>
        <TableCell component="th" scope="row" data-title={"Actions: "}>
          <div className={classes.actionDisplay}>
            <ActionButtons buttonType="edit" RoleKey={"USERS"} RoleAction={"EDIT"} handleClick={this.props.editInfo} value={n} />
            <ActionButtons buttonType="details" RoleKey={"USERS"} RoleAction={"VIEW"} handleClick={this.props.toggleSideDrawer} value={n} />
            <ActionButtons buttonType="remove" RoleKey={"USERS"} RoleAction={"DELETE"} handleClick={this.props.deleteUser} value={n} />
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
        <TableCell component="th" scope="row" data-title={"Sr: "}>
          {this.state.page * this.state.rowsPerPage + idx + 1}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Member Name: "} >{n.name}</TableCell>
        <TableCell component="th" scope="row" data-title={"Email: "}>{n.email}</TableCell>
        <TableCell component="th" scope="row" data-title={"Mobile: "}>{n.mobile}</TableCell>
        <TableCell component="th" scope="row" data-title={"Department: "}>{n.dept}</TableCell>
        <TableCell component="th" scope="row" data-title={"Groups: "}>{n.group}</TableCell>
        <TableCell component="th" scope="row" data-title={"Actions: "}>
          <div className={classes.actionDisplay}>
            <ActionButtons buttonType="edit" RoleKey={"NOTIFY"} RoleAction={"EDIT_MEMBERS"} handleClick={this.props.editMember} value={n} />
            <ActionButtons buttonType="remove" RoleKey={"NOTIFY"} RoleAction={"DELETE_MEMBERS"} handleClick={this.props.deleteMember} value={n} />
          </div>
        </TableCell>
      </TableRow>
    );
  }
  renderNotifyGroupTable(n, idx) {
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
        <TableCell component="th" scope="row" data-title={"Sr: "}>
          {this.state.page * this.state.rowsPerPage + idx + 1}
        </TableCell>
        <TableCell  component="th" scope="row" data-title={"Group Name: "} >{n.name}</TableCell>
        <TableCell component="th" scope="row" data-title={"Notification Name: "}>{n.notificationName}</TableCell>
        <TableCell component="th" scope="row" data-title={"Notification Type: "}>{n.notificationType}</TableCell> 
        <TableCell component="th" scope="row" data-title={"Actions: "}>
          <div className={classes.actionDisplay}>
          <ActionButtons buttonType="details" RoleKey={"NOTIFY"} RoleAction={"GROUPS"} handleClick={this.props.Opendetails} value={n} />
            <ActionButtons buttonType="edit" RoleKey={"NOTIFY"} RoleAction={"EDIT_GROUPS"} handleClick={this.props.editGroup} value={n} />
            <ActionButtons buttonType="remove" RoleKey={"NOTIFY"} RoleAction={"DELETE_GROUPS"} handleClick={this.props.deleteGroup} value={n} />
          </div>
        </TableCell>
      </TableRow>
    );
  }  
  
  renderNotifyLogsTable(n, idx) {
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
        <TableCell component="th" scope="row" data-title={"Sr: "}>
          {this.state.page * this.state.rowsPerPage + idx + 1}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Notification Name: "} >{n.NotificationName}</TableCell>
        <TableCell component="th" scope="row" data-title={"Node IP: "}>{n.NodeIP}</TableCell>
        <TableCell component="th" scope="row" data-title={"Notification Category: "}>{n.NotificationCategory}</TableCell>  
        <TableCell component="th" scope="row" data-title={"Triggered By: "} >{n.TriggeredBy}</TableCell>
        <TableCell component="th" scope="row" data-title={"Notification Time: "}>{n.NotificationTime}</TableCell>
        <TableCell component="th" scope="row" data-title={"Count: "}>{n.Count}</TableCell> 
        <TableCell component="th" scope="row" data-title={"Actions: "}>
          <div className={classes.actionDisplay}>
          <ActionButtons buttonType="details" RoleKey={"NOTIFY"} RoleAction={"LOGS"} handleClick={this.props.Opendetails} value={n} />
            <ActionButtons buttonType="remove" RoleKey={"NOTIFY"} RoleAction={"DELETE_LOGS"} handleClick={this.props.deleteLog} value={n} />
          </div>
        </TableCell>
      </TableRow>
    );
  }

  renderNotifyRuleTable(n, idx) {
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
        <TableCell component="th" scope="row" data-title={"Sr: "}>
          {this.state.page * this.state.rowsPerPage + idx + 1}
        </TableCell>
        <TableCell component="th" scope="row" data-title={"Member Name: "} >{n.MemberName}</TableCell>
        <TableCell component="th" scope="row" data-title={"Email: "}>{n.Email}</TableCell>
        <TableCell component="th" scope="row" data-title={"Mobile: "}>{n.Phone}</TableCell>
        <TableCell component="th" scope="row" data-title={"Department: "}>{n.Department}</TableCell>
        <TableCell component="th" scope="row" data-title={"Groups: "}>{n.Groups}</TableCell>
        <TableCell component="th" scope="row" data-title={"Actions: "}>
          <div className={classes.actionDisplay}>
            <ActionButtons buttonType="edit" RoleKey={"NOTIFY"} RoleAction={"EDIT_MEMBERS"} handleClick={this.props.editMember} value={n} />
            <ActionButtons buttonType="remove" RoleKey={"NOTIFY"} RoleAction={"DELETE_MEMBERS"} handleClick={this.props.deleteMember} value={n} />
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
            tableType === 'DATA_TABLE' ?
              <div>
                <Table className={classes.table} aria-labelledby="tableTitle">
                  <UiTableHead
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
                    width="10%"
                    searchComponent={needSearch? <TableSearch list={data} tableType={tableType} updated={this.setFilteredList.bind(this)} />:null}
                  />
                </Table>
                {
                  tableData && tableData.length > 0 ?
                    <Table>
                      {
                        tableData
                          .map((n, idx) => {
                            return this.renderConfigureDataTable(n, idx)
                          })
                      }
                    </Table> :
                    <Table>
                      <TableBody>
                        <TableRow className={classes.tBodyStyle}>
                          <TableCell colSpan={columnData.length + 3} component="th" scope="row" data-title={"Actions: "}>
                            <h4>No Data Available</h4>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                }
              </div>
              :
              <Table className={[classes.table, "responsiveTable"].join(' ')} aria-labelledby="tableTitle">
                <UiTableHead className={classes.thead}
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
                  searchComponent={needSearch?<TableSearch list={data} tableType={tableType} updated={this.setFilteredList.bind(this)} />:null}
                />
                {
                  tableData && tableData.length > 0 ?
                    <TableBody className={classes.fontStyle}>
                      {
                        _.orderBy(tableData, item => (_.get(item, orderBy) || '').toString().toLowerCase(), [order])
                          // data
                          //   .sort(this.getSorting(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((n, idx) => {
                            return this.renderConfigTable(n, idx)
                          })

                      }
                    </TableBody> :
                    <TableBody>
                      <TableRow className={classes.tBodyStyle}>
                        <TableCell colSpan={columnData.length + 3} component="th" scope="row" data-title={"Actions: "}>
                          <h4 className={classes.alignCenter}>No Data Available</h4>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                }
              </Table>
          }

          {
            tableData && tableData.length > 0 &&
            <TablePagination classes={{ menuItem: classes.pagination }}
              className={classes.pagination}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              labelRowsPerPage="Showing"
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          }
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(EnhancedTable);
