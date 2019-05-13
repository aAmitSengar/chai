import C from '../constants';

export default function dispatchToggleNavDrawer(status) {
    return dispatch => {
        dispatch(toggleNavDrawerAsync(status))
    }
}

function toggleNavDrawerAsync(status) {
    return {
        type: C.TOGGLE_NAV_DRAWER,
        payload: {
            visible: status
        }
    }
}
