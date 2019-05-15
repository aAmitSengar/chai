import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialogs from '../common/Dialogs/Dialogs';
import DashboardApi from '../../actions/apis/dashboard';
import APITransport from '../../actions/apitransport/apitransport';
import BusyIndicator from '../common/BusyIndicator';
import SubmitButton from '../common/Inputs/Buttons/SubmitButton';
import CancelButton from '../common/Inputs/Buttons/CancelButton';
import Toast from '../common/Toast';
import styles from './Styles';
class Home extends Component {
    productTemplate = {
        "uniqueId": "-1",
        "imgs": ["", ""],
        "title": "",
        "price": 0,
        "description": "",
        "likes": 0,
        "availableQty": 0
    }
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            product: this.productTemplate
        };
        this.List = this.List.bind(this);
    }
    handleChange = (event, currentProduct) => {
        debugger;
        this.setState(state => ({ checked: !state.checked, product: currentProduct }));
    };
    submit() {
        this.setState(state => ({ checked: !state.checked, product: this.productTemplate }));
    }
    toggle() {
        this.setState(state => ({ checked: !state.checked, product: this.productTemplate }));
    }
    componentDidMount() {
        // let apiObj = new DashboardApi(10000, true);
        // this.props.APITransport(apiObj);
    }

    List() {
        const { classes, productsData } = this.props;

        return (
            <div className={classes.root}>
                <GridList cellHeight={330} cols={3} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Products</ListSubheader>
                    </GridListTile>
                    {productsData.map(product => (
                        <GridListTile onClick={(event) => this.handleChange(event, product)} key={product.uniqueId}>
                            <img src={product.imgs[1] || product.imgs[0]} alt={product.title} />
                            <GridListTileBar
                                title={product.title}
                                subtitle={<span>{product.description}</span>}
                                actionIcon={
                                    <IconButton className={classes.icon}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
    renderZoom() {
        const { classes } = this.props;
        const { checked, product } = this.state;
        return (<Dialogs IsOpen={checked} title={product.title} handleClose={this.toggle.bind(this)}>
            <div>
                <Paper elevation={4} className={classes.paper}>
                    <Grid container spacing={16}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt={product.title} src={product.imgs[0]} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={16}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1">
                                        {product.title}
                                    </Typography>
                                    <Typography gutterBottom>{product.description}</Typography>
                                    <Typography color="textSecondary">{product.description}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">{product.price}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <div className={classes.actionContainer}>
                    <SubmitButton RoleKey={"KPI"} RoleAction={"ACK"} label="OK" submit={this.submit.bind(this)} />
                    <label className={classes.orLabel}>or</label>
                    <CancelButton label="Cancel" cancel={this.toggle.bind(this)} />
                </div>
            </div>
        </Dialogs>)


        // {/* <Zoom in={checked} style={{ transitionDelay: checked ? '500ms' : '0ms' }}>
        //     <Paper elevation={4} className={classes.paper}>
        //         <svg className={classes.svg}>
        //             <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
        //         </svg>
        //     </Paper>
        // </Zoom> */}

    }

    render() {
        return (
            <div>
                <BusyIndicator progress={this.props.apistatus.progress} />
                <Toast show={this.props.apistatus.error} message={this.props.apistatus.message} />
                <main >
                    {/* <Grid container spacing={24}>

                    </Grid> */}
                    {this.List()}
                    {this.renderZoom()}
                </main>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        apistatus: state.apistatus,
        productsData: state.productList
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        APITransport: APITransport,
    }, dispatch)
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));