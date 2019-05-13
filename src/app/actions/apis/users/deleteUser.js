/**
 * DELETE USER API
 */
import API from '../api';
import C from '../../constants';

export default class deleteUserAPI extends API {
    constructor(userdata, timeout = 2000) {
        super('post', timeout, true);
        this.type = C.DELETE_USER;
        this.userdata = userdata;
        this.deleteUser = {}
    }

    processResponse(res) {
        super.processResponse(res)
        if (res) {
            this.deleteUser = res;
            return true;
        }
        return false;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/deleteUser`;
    }

    getPayload() {
        return this.deleteUser;
    }

    getBody() {
        return {
            "UserRole": this.userdata.Role,
            "UserName": this.userdata.Email
        }
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    }
    getCustomConfigs() {
        return {
            timeout: this.timeout
        }
    }
}