import C from '../../actions/constants';
// import moment from 'moment';
// import _ from "lodash";

export default function (state = {}, action) {
    switch (action.type) {
        case C.UPDATE_USER: 
            return action.payload;            
        default:
            return state;
    }
    
}