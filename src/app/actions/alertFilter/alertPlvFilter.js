import C from '../constants';

export default function dispatchAlertFilter(alertList,levels) {
    return dispatch => {
        dispatch(alertFilter(alertList,levels))
    }
}

function alertFilter(alertList,plv) {
    return {
        type: C.ALERT_PLV_FILTER,
        payload: {
            alertList:alertList,
            plv: plv
        }
    }
}
