import C from '../../constants';

export default function dispatchdashboardsection(counters, type, plvs) {
    return dispatch => {

        switch (type) {
            case 'KPI':
                dispatch(kpisection(counters, plvs));
                break;
            case 'RESOURCE':
                dispatch(resourceSection(counters, plvs))
                break;

            case 'ALERTS':
                dispatch(alertSection(counters, plvs))
                break;
        
            default:
                break;
        }
    }
}

function kpisection(counters, plvs) {
    return {
        type: C.KPI_BLOCK,
        payload: {
            dashboard:counters,
            plvs: plvs
        }
    }
}

function resourceSection(counters, plvs) {
    return {
        type: C.RESOURCE_BLOCK,
        payload: {
            dashboard:counters,
            plvs: plvs
        }
    }
}

function alertSection(counters, plvs) {
    return {
        type: C.ALERT_BLOCK,
        payload: {
            dashboard:counters,
            plvs: plvs
        }
    }
}