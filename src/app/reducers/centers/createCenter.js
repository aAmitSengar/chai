import C from '../../actions/constants';


export default function (state = {}, action) {
    switch (action.type) {
        case C.CREATE_CENTER: 
            return action.payload;            
        default:
            return state;
    }
    
}