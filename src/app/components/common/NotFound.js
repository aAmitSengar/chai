import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import '../../../styles/main.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import variables from '../../styles/variables';
import Typography from '@material-ui/core/Typography';
const styles = {
    card: {
        'background-color': variables.white,
        color: 'black',
        'padding-bottom': 100,
    },
    align: {
        'text-align': 'center'
    },
    color: {
        color: variables.red,
        fontFamily: variables.SecondaryFont,
        fontWeight: variables.f_600
    },
    color1: {
        color: variables.black,
        fontFamily: variables.SecondaryFont,
        fontWeight: variables.f_400
    }
};
class NotFound extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent className={classes.align}>
                    <Typography variant="headline" component="h2" className={classes.color}>
                        Resource not found!!
                </Typography>
                    <Typography className={classes.color1}>
                        The resource you are looking for is not found.
                </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withRouter(withStyles(styles)(NotFound))