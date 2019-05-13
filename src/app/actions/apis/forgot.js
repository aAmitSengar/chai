/**
 * Forgot Password API
 */
import API from './api';
import C from '../constants';

export default class forgotPasswordAPI extends API {
    constructor(email, timeout = 2000) {
        super('GET', timeout, false);
        this.type = C.FORGOT_PASSWORD;
        this.email = email;
        this.forgotPasswordRes = '';
    }

    toString() {
    }

    processResponse(res) {
        super.processResponse(res);
        if (res.status===1) {
            this.forgotPasswordRes = res;            
            return true
        }
        return false
    }

    getPayload() {
        return  this.forgotPasswordRes;        
    }

    getBody() {
        return {}
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/forgotPassword?email=${this.email}`
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
}

