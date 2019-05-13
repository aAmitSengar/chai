import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from 'reactstrap';
import styles from './Styles';
import Dialogs from '../Dialogs/Dialogs';
import CustomTextAreaField from '../Inputs/TextAreaInput/CustomTextAreaField';
import SubmitButton from '../Inputs/Buttons/SubmitButton';
import CancelButton from '../Inputs/Buttons/CancelButton';
import FormControl from "@material-ui/core/FormControl";
import SecurityLevelsTemplate from './Templates/SecurityLevelsTemplate'
import _ from 'lodash';
import RemoveButton from '../../common/Inputs/Buttons/ActionButtons';


class AcknowledgePopupModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IsOpen: false,
            kpiDetail: this.props.kpiDetail
        };
        this.toggle = this.toggle.bind(this);
        this.renderSecurityLevels = this.renderSecurityLevels.bind(this);
        this.updateLevel = this.updateLevel.bind(this);
    }
    handleClick(event) {
        // event.preventDefault();
        this.setState({
            IsOpen: true,
            inputMessage: ''
            // anchorEl: event.currentTarget,
        });
    }
    toggle() {
        this.setState({
            IsOpen: !this.state.IsOpen,
            SeverityLevel:this.state.kpiDetail.Breach_Level
        });
    }
    submit() {
        
        var ackObj = {
            kpiDetail: this.state.kpiDetail,
            inputMessage: this.state.inputMessage,
            SeverityLevel: this.state.SeverityLevel
        }
        this.props.Acknowledge(ackObj);
        this.toggle();
    }
    updateInputValue(value) {
        this.setState({
            inputMessage: value
        });
    }
    componentWillMount() {
        this.updateLevel(this.state.kpiDetail.Breach_Level)
    }
    updateLevel(level) {
        this.setState({
            SeverityLevel:level
        })
    }
    renderSecurityLevels() {
        const { kpiStatusList, classes } = this.props;
        // console.log(this.state.SeverityLevel)
        const sLevels = [
            <SecurityLevelsTemplate key={"idxHeal"} UpdateLevel={this.updateLevel} leveldata={_(kpiStatusList).filter(val => val.name === 'HEALTHY').first()} severitylevel={this.state.SeverityLevel} />,
            <SecurityLevelsTemplate key={"idxCri"} UpdateLevel={this.updateLevel} leveldata={_(kpiStatusList).filter(val => val.name === 'MINOR').first()} severitylevel={this.state.SeverityLevel} />,
            <SecurityLevelsTemplate key={"idxMaj"} UpdateLevel={this.updateLevel} leveldata={_(kpiStatusList).filter(val => val.name === 'MAJOR').first()} severitylevel={this.state.SeverityLevel} />,
            <SecurityLevelsTemplate key={"idxMin"} UpdateLevel={this.updateLevel} leveldata={_(kpiStatusList).filter(val => val.name === 'CRITICAL').first()} severitylevel={this.state.SeverityLevel} />,
        ];
        // _.each(kpiStatusList, function (val, idx) {
        //     if (val.name)
        //         sLevels.push(<SecurityLevelsTemplate key={"idx" + idx} leveldata={val} kpiLevel={kpiDetail.Breach_Level} />)
        // });
        const levels = (<div>
            <h6> Select a severity level</h6>
            <div className={classes.securityLevels}>
                {sLevels}
            </div>

        </div>);
        return levels;
    }

    render() {
        const { classes,RoleKey ,RoleAction} = this.props;


        return (
            <div className={classes.headerButtons}>
                {/* <Button className={classes.button} onClick={this.handleClick.bind(this)}>
                    <SVG src={acknowledge}
                        className={classes.menuIcons}
                    >
                        Acknowledge
                    </SVG>
                    <span> Acknowledge</span>
                </Button> */}
                 <RemoveButton buttonType={"ack_KPI"} text={"Acknowledge"} RoleKey={RoleKey || "KPI"} RoleAction={RoleAction ||"ACK"} handleClick={this.handleClick.bind(this)} />
                <Dialogs IsOpen={this.state.IsOpen} title={"How severe was \"" + this.state.kpiDetail.KPI_NAME + "\" Breach"}>
                    <div>
                        {this.renderSecurityLevels()}
                        <FormControl fullWidth className={classes.popoverTextBoxMargin}>
                            <CustomTextAreaField type="email" isRequired={true} label="Message (optional)" placeholder="Rectify the breach on time with app. Made corrective actions..!" UpdateValues={this.updateInputValue.bind(this)} />
                        </FormControl>
                        <div className={classes.actionContainer}>
                            <SubmitButton RoleKey={"KPI"}  RoleAction={"ACK"} label="Submit" submit={this.submit.bind(this)} />
                            <label className={classes.orLabel}>or</label>
                            <CancelButton label="Cancel" cancel={this.toggle.bind(this)} />
                        </div>
                    </div>
                </Dialogs>
            </div >
        );
    }
}

export default withStyles(styles)(AcknowledgePopupModel);