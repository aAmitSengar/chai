/**
 * Forgot Password API
 */
import API from './api';
import C from '../constants';

export default class changePasswordAPI extends API {
    constructor(token, newPassword, timeout = 2000) {
        super('POST', timeout, false);
        this.type = C.CHANGE_PASSWORD;
        this.newPassword = newPassword;
        this.token = token;
        this.changePasswordRes = '';
    }

    processResponse(res) {
        super.processResponse(res);
        if (res.status === 1) {
            this.changePasswordRes = res;
            return true
        }
        return false
    }

    getPayload() {
        return this.changePasswordRes;
    }

    getBody() {
        return {
            'token': this.token,
            'password': this.newPassword,
        }
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/changePassword`;
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

    getCustomConfigs() {
        return {
            timeout: this.timeout
        }
    }
}

