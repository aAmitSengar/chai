import API from './api';
import C from '../constants';

export default class ServiceAPI extends API {
    constructor(timeout = 2000) {
        super('get', timeout, true);
        this.type   = C.API_SERVICE_GRAPH;
    }

    processResponse(res) {
        super.processResponse(res)
        if (res && res.length > 1) {
            this.res = res;
            return true;
        }
        return false;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/service`;
    }
    
    getBody() {
        return {}
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    }

    getPayload() {
        return {
            records: this.res
        }
    }

} 