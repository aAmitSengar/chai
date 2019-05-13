import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './TemplateStyles';
import FontAwesomeIcon from "react-fontawesome";


class SecurityLevelsTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SeverityLevel: this.props.severitylevel
        };
        this.selectSeverityLevel = this.selectSeverityLevel.bind(this);
    }
    
    componentDidMount(){
        this.setState({
            SeverityLevel:this.props.severitylevel
        })
    }
    selectSeverityLevel(event) {
        this.setState({
            SeverityLevel:event.name
        });
       this.props.UpdateLevel(event.name)
    }

    render() {
        const { classes, leveldata, severitylevel } = this.props;
        return (
            <div className={classes.securityLevelsroot}>
                <div className={classes.securityInnedDiv} onClick={() => this.selectSeverityLevel(leveldata)}>
                    <label>{leveldata.name}
                        {
                            (severitylevel === leveldata.name) ?
                                <span>
                                    <FontAwesomeIcon name="checked" className={["fal fa-check", classes.rigthAlign].join(' ')} style={{
                                        color: `${leveldata.color}`
                                    }} />
                                </span>
                                : null

                        }
                    </label>
                    <span className={classes.securityLevel} style={{
                        background: `${leveldata.color}`
                    }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                </div>
            </div >
        );
    }
}

export default withStyles(styles)(SecurityLevelsTemplate);