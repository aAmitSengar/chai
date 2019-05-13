import C from '../constants';

export default function dispatchAlertFilterReportingTime(alertList,startDate,endDate) {
    return dispatch => {
        dispatch(alertFilterRreportingTime(alertList,startDate,endDate))
    }
}

function alertFilterRreportingTime(alertList,startDate,endDate) {
    return {
        type: C.ALERT_REPORTING_TIME_FILTER,
        payload: {
            alertList:alertList,
            startDate: startDate,
            endDate: endDate
        }
    }
}
