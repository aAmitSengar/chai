import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './AddRoleStyle';
import Drawers from '../../../common/drawers/drawers';
import { Container } from 'reactstrap';
import SubmitButton from '../../../common/Inputs/Buttons/SubmitButton';
import CancelButton from '../../../common/Inputs/Buttons/CancelButton';
import CustomTextField from '../../../common/Inputs/TextInput/CustomTextField';
import CustomTextAreaField from '../../../common/Inputs/TextAreaInput/CustomTextAreaField';
import Paper from '@material-ui/core/Paper';
import MultiSelectCollapsible from '../../../common/Inputs/MultiSelectCollapsible/MultiSelectCollapsible';
 

class AddRole extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsOpen: false,
            roleName: '',
            roleDescription: '',
            privileges: [],
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.editRoleData !== this.props.editRoleData) {
            this.setState({
                roleName: nextProps.editRoleData.name,
                roleDescription: nextProps.editRoleData.description,
                privileges: JSON.parse(nextProps.editRoleData.permissions || '[]')
            });
        }
        if (nextProps.privilegesList !== this.props.privilegesList) {
            this.setState({
                privileges: nextProps.privilegesList,
            });
        }
    }

    handleChanges_Role(value) {
        this.setState({ roleName: value });
    }
    handleClick() {
        this.props.closeDrawer();
    }
    setSelected(values) {
        this.setState({
            privileges: values || []
        })
    }
    updateInputValue(value) {
        this.setState({ roleDescription: value });
    }
    submit() {
        var object = {};
        object.role = this.state.roleName;
        object.permissions = this.state.privileges;
        object.description = this.state.roleDescription;
        console.log(object)
        this.handleClick()
        this.props.submit(object)
    }
    update() {
        var object = {};
        object.role = this.state.roleName;
        object.permissions = this.state.privileges;
        object.description = this.state.roleDescription;
        console.log(object)
        this.handleClick()
        this.props.update(object)
    }

    isValid() {
        if (this.state.roleName
            && this.state.privileges.length > 0
            && this.state.roleDescription
        ) {
            return true;
        }
        return false;
    }
    render() {
        const { classes, IsOpen, editRoleData, privilegesList } = this.props;
        return (
            <Drawers open={IsOpen} anchor={"right"} closeDrawer={this.handleClick.bind(this)}>
                <Container className={classes.container}>
                    <div className={classes.container1}>
                        <CustomTextField label="Enter the role name" disabled={Object.keys(editRoleData).length > 0} onlyAlpha={true} isRequired={true} type="text" defaultValue={this.state.roleName} UpdateValues={this.handleChanges_Role.bind(this)} />
                        <CustomTextAreaField type="text" label="Description" placeholder="Description" defaultValue={this.state.roleDescription} UpdateValues={this.updateInputValue.bind(this)} />
                    </div>
                    <div className={classes.container2}>
                        <Paper className={classes.expansionPanel}>
                            <MultiSelectCollapsible
                                items={privilegesList}
                                selectedItems={this.state.privileges}
                                setSelected={this.setSelected.bind(this)}
                            />
                        </Paper>
                    </div>
                    <div className={classes.addRole_actions}>
                        {Object.keys(editRoleData).length > 0
                            ?
                            <SubmitButton label="Update Role" RoleKey={"ROLES"} RoleAction={"EDIT"}  disabled={!this.isValid()} submit={this.update.bind(this)} />
                            :
                            <SubmitButton label="Add Role" RoleKey={"ROLES"} RoleAction={"ADD"}  disabled={!this.isValid()} submit={this.submit.bind(this)} />
                        }

                        <CancelButton cancel={this.handleClick.bind(this)} />

                    </div>
                </Container>
            </Drawers>
        )
    }
}

export default withStyles(styles)(AddRole);
