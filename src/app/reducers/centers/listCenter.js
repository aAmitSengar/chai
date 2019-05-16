import C from '../../actions/constants';
// import moment from 'moment';
// import _ from "lodash";

export default function (state = {}, action) {
    switch (action.type) {
        case C.LIST_CENTER:
            // console.log('action.payload', action.payload)
            return action.payload;
        // case C.CREATE_USER:
        //     return action.payload;
        // case C.UPDATE_USER:
        //     return action.payload;
        // case C.DELETE_USER:
        //     return action.payload;
        default:
            return state;
    }

}