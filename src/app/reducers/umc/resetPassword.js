import C from '../../actions/constants';

export default function (state={}, action) {
    switch(action.type) {
        case C.RESET_PASSWORD:
            return action.payload;

        default:
            return state;
    }
}
