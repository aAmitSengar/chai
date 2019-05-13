import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { Row, Col } from 'reactstrap';
import { Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import UiDropDown from '../UiDropDown/UiDropDown';
import styles from './Styles';
import MultipleSelects from '../../common/Inputs/MultipleSelect/MultipleSelect';

import APITransport from '../../../actions/apitransport/apitransport';

class LvpNodeIpSelector extends Component {



    constructor(props) {
        super(props);
        this.state = {
            localPLVS: this.props.globalPLV || [],            
            Products:[],
            Venders:[],
            Locations:[],
            product:false,
            location:false,
            vendor:false,
            productValue:[],
            vendorValue:[],
            locationValue:[],
            allSelected:false,
            selectAll:false
        }
    }
    prepareFilterLocation() {
        let list = this.props.globalPLV || [];
        let product = _.uniq(_.map(list, 'Product'));
        let location = _.uniq(_.map(list, 'Location'));
        let vendor = _.uniq(_.map(list, 'Vendor'));
        return { Product: product, Location: location, Vendor: vendor }
    }

    selectItem(open, target, value) {

        if (target === 'Product') {
            this.setState({ product: !open, productValue: value });
        }
        if (target === 'Vendor') {
            this.setState({ vendor: !open, vendorValue: value });
        }
        if (target === 'Location') {
            this.setState({ location: !open, locationValue: value });
        }
    }

    getFilteredData(location, vendor) {
        let values = _.chain(this.state.localPLVS)
            .filter(item => _.some(location, pro => pro === item.Location))
            .filter(item => {
                if (vendor) {
                    return _.some(vendor, loc => loc === item.Vendor)
                } else {
                    return true
                }
            })
            .value();
        return values;
    }


    plvSelectionStatus() {
        let plvs = this.getSelectedPLVs(this.state.productValue, this.state.locationValue, this.state.vendorValue, { plvs: this.state.localPLVS });
        let selectSome = false;
        let selectAll = true;

        plvs.map((item, index) => {
            if (!item.status) {
                selectAll = false;
            }
            else {
                selectSome = true;
            }
        });


        if (selectAll) {
            this.setState({
                allSelected: true,
                selectAll: true,
            });
            return;
        }
        if (selectSome) {
            this.setState({
                allSelected: false
            });
            return;
        }
        if (!selectSome) {

            this.setState({
                allSelected: true,
                selectAll: false,
            })
            return;
        }
    }

    getSelectedPLVs(product, location, vendor, plvs) {
        //let filter_string = "";

        if (!product.length && !location.length && !vendor.length) {
            return plvs.plvs;
        }

        let values = _.chain(plvs.plvs)
            .filter(item => _.some(location, pro => pro === item.Location))
            .filter(item => {
                if (vendor.length) {
                    return _.some(vendor, ven => ven === item.Vendor)
                } else {
                    return true
                }
            })
            .filter(item => {
                if (product.length) {
                    return _.some(product, loc => loc === item.Product)
                } else {
                    return true
                }
            })
            .value();

        return values;
    }

    getFilteredData(location, vendor) {
        let values = _.chain(this.state.localPLVS)
            .filter(item => _.some(location, pro => pro === item.Location))
            .filter(item => {
                if (vendor) {
                    return _.some(vendor, loc => loc === item.Vendor)
                } else {
                    return true
                }
            })
            .value();
        return values;
    }


    updatePlvSelection() {
        let filteredPlvs = this.getSelectedPLVs(this.state.productValue, this.state.locationValue, this.state.vendorValue, { plvs: this.state.localPLVS });
        let plvs = this.state.localPLVS;
        if (filteredPlvs.length) {
            plvs.map((item, index) => {
                let updatedIndex = _.findIndex(filteredPlvs, item);
                if (updatedIndex === -1) {
                    plvs[index].status = false;
                }
                else {
                    plvs[index].status = true;
                }
            });
        }
        this.setState({ localPLVS: plvs });
    }


    setLocations(val) {
        this.setState({
            locationValue: val,
        }, function () {
            this.updatePlvSelection();
            this.resetSelection();
            this.plvSelectionStatus();
        });
    }

    setProducts(val) {
        this.setState({
            productValue: val,
        }, function () {
            this.updatePlvSelection();
            this.plvSelectionStatus();
        });
    }

    setVendors(val) {
        this.setState({
            vendorValue: val,
        }, function () {
            this.updatePlvSelection();
            this.resetSelection();
            this.plvSelectionStatus();
        });
    }

    resetSelection() {
        let plvs = this.getFilteredData(this.state.locationValue, this.state.vendorValue);
        this.setState({ vendorValue: _.uniq(_.map(plvs, item => item.Vendor)), productValue: _.uniq(_.map(plvs, item => item.Product)) });
    }

    render() {


        const { classes } = this.props;
        let filterObj = this.prepareFilterLocation();
        return(
            <div className={classes.container}>
                <Row>
                    <Col md={6}>
                        <div className={classes.input}>
                            <label className={classes.dropDownLabel}>Select Locations</label>
                            <MultipleSelects minWidth={100} handleSelected={this.setLocations.bind(this)} target={'Vendor'} open={this.state.location} defaultValue={this.state.locationValue} item={filterObj.Location} />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className={classes.input}>
                            <label className={classes.dropDownLabel}>Select Venders</label>
                            <MultipleSelects minWidth={100} handleSelected={this.setVendors.bind(this)} target={'Vendor'} open={this.state.vendor} defaultValue={this.state.vendorValue} item={_.uniq(_.map(this.getFilteredData(this.state.locationValue), item => item.Vendor))} />
                            {/* <UiDropDown width='100%' select={this.selectItem.bind(this)} target={'Venders'} defaultSelectedItem={this.state.Venders} open={this.state.IsOpen_Venders} item={_.uniq(_.map(this.getFilteredData(this.state.Products), item => item.Vendor))} />*/}

                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div className={classes.input}>
                            <label className={classes.dropDownLabel}>Select Product</label>
                            <MultipleSelects minWidth={100} handleSelected={this.setProducts.bind(this)} target={'Product'} open={this.state.product} defaultValue={this.state.productValue} item={_.uniq(_.map(this.getFilteredData(this.state.locationValue, this.state.vendorValue), item => item.Product))} />
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className={classes.input}>
                            <label className={classes.dropDownLabel}>Select IP</label>
                            {/* <MultipleSelects width='100%' handleSelected={this.setlocations.bind(this)} target={'Locations'} defaultValue={this.state.Locations}  item={_.uniq(_.map(this.getFilteredData(this.state.Products, this.state.Venders), item => item.Location))} /> */}
                            <UiDropDown width='100%' select={this.selectItem.bind(this)} target={'IPS'} defaultSelectedItem={this.state.IPS} open={this.state.IsOpen_IPSs} item={this.props.ipAddresses} />
                        </div>
                    </Col>
                    <Divider classes={{
                        inset: false,
                        root: classes.dividerClass
                    }} />
                </Row>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        globalPLV: state.globalplv.PLVS,
        ipAddresses: state.builder.NODEIPLIST || ['000:000:000:000'], // need to add for testing state.ipAddresses ipAddresses and put
        apistatus: state.apistatus,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        APITransport: APITransport
    }, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(LvpNodeIpSelector));
