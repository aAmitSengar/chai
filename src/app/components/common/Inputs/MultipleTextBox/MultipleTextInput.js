import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Close from '@material-ui/icons/Close';
import { Row, Col } from 'reactstrap';


import styles from './TextStyle';
import _ from 'lodash'
import CustomTextField from '../TextInput/CustomTextField';
class MultipleTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            LocalList: this.props.list || []
        }
        this.renderTextFielsd = this.renderTextFielsd.bind(this);
    }
    UpdateLocalList(val, target) {
        var newList = this.state.LocalList;
        var index = target.split('.')[1];
        newList[index] = val;
        this.setState({
            LocalList: newList
        })
        this.updateParent()
    }
    removeCommand(idx) {
        var newList = this.state.LocalList;
        newList.splice(idx, 1);
        this.setState({
            LocalList: newList
        })
        this.updateParent()
    }
    AddCommand() {
        var newList = this.state.LocalList;
        newList.push('');
        this.setState({
            LocalList: newList
        })
        this.updateParent()
    }

    updateParent() {
        this.props.updateParent(this.state.LocalList)
    }

    componentDidMount() {
        if (this.state.LocalList.length === 0) {
            this.setState({
                LocalList: ['']
            })
        }
    }
    // componentWillReceiveProps(nextProps){
    //     if(nextProps.list!== this.props.list){

    //     }
    //     console.log('list',nextProps.list,this.props.list)
    // }

    renderTextFielsd() {
        const textBoxList = [];
        _.each(this.state.LocalList, (item, idx) => {
            textBoxList.push(this.getRowObject(idx, item))
        })

        return textBoxList;
    }

    getRowObject(idx, litem) {
        const { classes } = this.props;
        return (
            <Row key={`cmdList${idx}`}>
                <Col md={11}>
                    <CustomTextField label={"Enter Command"} type="text" defaultValue={litem} target={`LocalList.${idx}`} UpdateValues={this.UpdateLocalList.bind(this)} />
                </Col>
                {this.state.LocalList.length !== (idx + 1)
                    ?
                    <Col md={1}>
                        <Close className={[classes.RemoveCross, classes.marginBtn].join(' ')} onClick={this.removeCommand.bind(this, idx)} />
                    </Col>
                    :
                    <Col md={1}>
                        <AddCircleOutline className={[classes.AddPlusButton, classes.marginBtn].join(' ')} onClick={this.AddCommand.bind(this)} />
                    </Col>
                }
            </Row>
        )
    }
    render() {
        return (
            this.renderTextFielsd()
        )
    }
}

export default withStyles(styles)(MultipleTextInput);