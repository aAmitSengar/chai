import C from '../../actions/constants';
import _ from "lodash";

function formateData(payload) {
    return _.map(payload, function (k, v) {
        return {
            name: v || '--',
            description: k.description || '--',
            permissions: k.permissions || []
        }
    })
}

export default function (state = {}, action) {
    switch (action.type) {
        case C.LIST_ROLES:
            return formateData(action.payload);
        default:
            return state;
    }

}