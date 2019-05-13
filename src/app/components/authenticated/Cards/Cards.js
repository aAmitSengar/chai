import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import variables from '../../../styles/variables';

import {CardStyle as style} from './CardStyles';

const cardStyle = {
    backgroundColor:variables.widget_background,
    height:'100%'
}

class Cards extends Component {
    constructor(props) {
        super(props);
        this.clickEvent = this.clickEvent.bind(this);
    }
    clickEvent(event) {
        if(typeof this.props.cardClick === 'function') {
            this.props.cardClick('ALL',event);    
        }
    }
    render() {
        const classes= this.props.classes;              
        return (
        <Card style={this.props.cardStyle || cardStyle} >
        <CardHeader classes={{title:classes.title,root:classes.cardheader}} title={this.props.title} onClick={(event) => this.clickEvent(event)}></CardHeader>
            <CardContent classes={{root:classes.cardContent}}>
                <Typography component="div">
                {this.props.children}
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
        )

    }
}

Cards.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(style)(Cards)