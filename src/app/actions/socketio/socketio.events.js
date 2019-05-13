import C from '../constants';

export default function dispatchProcessEventReceived(emitType, event, plvs) {
    let data;
    if (typeof event === 'object') {
        data = event
    } else {
        data = JSON.parse(event)
    }
    if (data.PLV && data.type && data.event && data.level) {
        if (emitType === 'counters' && data.subtype === 'Combined') {
            return dispatch => {
                dispatch(processCombinedSubTypeEventReceived(data, plvs))
            }
        } else {
            return dispatch => {
                dispatch(processSingleSubTypeEventReceived(data, plvs))
            }
        }
    }
}

function processCombinedSubTypeEventReceived(data, plvs) {
    return {
        type: C.SOCKETIO_COUNTERS_COMBINED,
        payload: {
            data: data,
            plvs: plvs
        }
    }
}

function processSingleSubTypeEventReceived(data, plvs) {
    return {
        type: C.SOCKETIO_COUNTERS_SINGULAR,
        payload: {
            data: data,
            plvs: plvs
        }
    }
}
