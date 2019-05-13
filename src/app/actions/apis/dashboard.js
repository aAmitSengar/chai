/**
 * Dashboard API
 */
import API from './api';
import C from '../constants';

export default class DashboardApi extends API {

    constructor(timeout = 2000, auth = true, queryParams = null) {
        super('GET', timeout, auth);
        this.type           = C.DASHBORD_COUNTERS;
        this.queryParams    = queryParams;
    }

    toString() {
    }

    processResponse(res) {
        super.processResponse(res);
        if (res && res.KPI) {
            this.res   = res;
            return true
        }
        return false
    }

    getPayload() {
        return {
            'res': this.res,
        }
    }

    getBody() {
        return {}
    }

    apiEndPoint() {
        if (this.queryParams) {
            return `${super.apiEndPoint()}/basecounters?time=${this.queryParams}`
        }
        return `${super.apiEndPoint()}/basecounters`
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    }


}