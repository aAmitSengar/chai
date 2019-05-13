/**
 * KPIGraph API
 */
import API from '../api';
import C from '../../constants';
import _ from 'lodash';

export default class CreateRoleAPI extends API {

    constructor(data, timeout = 2000) {
        super('post', timeout, true);
        this.type = C.ROLE_PRIVILEGE_CREATE;
        this.data = data
        this.createRole = {};
    }

    processResponse(res) {
        super.processResponse(res)
        if (res) {
            this.createRole = res;
            return true;
        }
        return false;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/createRole`;
    }

    getBody() {
        const loginRole = _.get(JSON.parse(sessionStorage.getItem('data')), 'Role');
        _.set(this.data, 'loginRole', loginRole)
        return this.data
    }

    getPayload() {
        return this.createRole;
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