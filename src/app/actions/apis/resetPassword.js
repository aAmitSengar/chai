import API from './api';
import C from '../constants';

export default class ResetPasswordAPI extends API {
    constructor(newPassword, timeout = 200) {
        super('post', timeout, true);
            this.type = C.RESET_PASSWORD;
            this.newPassword = newPassword;
            this.status = '';
    }

    processResponse(res) {
        super.processResponse(res)
        if (res) {
            this.status = res.status;            
            return true
        }
        return false;
    }
    getPayload() {
        return {
            'status': this.status,
        }
    }

    getBody() {
        return {}
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/resetPassword?newPassword=${this.newPassword}`
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

}