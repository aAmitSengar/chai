import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './UiNodeSelecterStyle';
import SVG from 'react-inlinesvg';
import filterIcon from '../../../../images/icons/filter-lvp.svg';
// import DashboardPLVFilter from '../../authenticated/Filters/DashboardPLVFilter';
import Popovers from '../../common/Popovers/Popovers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class UiNodeSelecter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popoverOpen: false,
            title: "",
            target: 'alert_filter_plv',
            type: "",
            plvSelection: this.props.globalPLV || []
        };
        this.cancelPLV = this.cancelPLV.bind(this);
        this.selectPLV = this.selectPLV.bind(this);
    }
    openPopOver(title, target) {
        this.setState({
            popoverOpen: !this.state.popoverOpen,
            title: title,
            target: target,
        });
        if(typeof(this.props.updateState) ==='function'){
            this.props.updateState(!this.state.popoverOpen)
        }
    }

    cancelPLV() {
        this.setState({ popoverOpen: false });
        if(typeof(this.props.updateState) ==='function'){
            this.props.updateState(false)
        }
    }

    selectPLV(plvs) {
        this.setState({ plvSelection: plvs }); 
    }

    selectedPLS() {
        if (this.props.globalPLV) {
            return this.props.globalPLV.reduce((total, item) => {
                return total + (item.status ? 1 : 0)
            }, 0)
        }
        return 0;
    }
    cancelPoppover(isOpen) {
        this.setState({ popoverOpen: isOpen });
    }
    kpibuilderNode() {
        const { classes } = this.props;
        return (
            <div className={[classes.container, this.props.error ? classes.error : ''].join(' ')} onClick={(event) => this.props.selectList()}>
                {this.props.placeholder}
                {this.props.button === 'SUBMIT' &&
                    <div className={classes.menubtn}>
                        <button className={classes.button}>{this.props.label}</button>
                    </div>
                }
                {!this.props.button &&
                    <div className={classes.menuIcons}>
                        <SVG
                            src={filterIcon}
                            className={classes.menuIcons}
                        >
                        </SVG>
                    </div>
                }

            </div>
        )
    }

    render() {
        const { classes } = this.props;
        if(this.props.selectList){
           return this.kpibuilderNode();
        }
        else {
            return (

                <div className={classes.container} id="alert_filter_plv" onClick={() => this.openPopOver('Select Nodes', 'alert_filter_plv')}>
                    <Popovers title={this.state.title} popoverOpen={this.state.popoverOpen} target={this.state.target} cancelPoppover={this.cancelPoppover.bind(this)}>
                        {/* <KPILocationSearch selectPLV={this.selectPLV} plvSelect={this.state.plvSelection} actionFilter={"ALERT_FILTER"} cancelPLV={this.cancelPLV} /> */}
                    </Popovers>
                    <div className={classes.menuIcons}>
                        <SVG
                            src={filterIcon}
                            className={classes.menuIcons}
                        >
                        </SVG>
                    </div>
                    <span>
                        NODES ({this.selectedPLS()})
                        </span>
                </div>
            );
        }
        
    }
}
const mapStateToProps = (state) => {
    return {
        // globalPLV: state.globalplv.PLVS,
        apistatus: state.apistatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    }, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UiNodeSelecter));
