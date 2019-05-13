/**
 * Forgot Password API
 */
import API from './api';
import C from '../constants';

export default class resetPwdCheckAPI extends API {
    constructor(token, timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.RESET_PASSWORD;
        this.token = token;
        this.resetPwdRes = '';
    }

    toString() {
    }

    processResponse(res) {
        super.processResponse(res);
        if (res.status===1) {
            this.resetPwdRes = res;            
            return true
        }
        return false
    }

    getPayload() {
        return  this.resetPwdRes;        
    }

    getBody() {
        return {}
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/resetOnLinkClick?token=${this.token}`
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
}

