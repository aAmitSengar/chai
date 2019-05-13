/**
 * KPIGraph API
 */
import API from '../api';
import C from '../../constants';
import _ from 'lodash';

export default class ModifyRoleAPI extends API {

    constructor(data, timeout = 2000) {
        super('post', timeout, true);
        this.type = C.ROLE_PRIVILEGE_MODIFY;
        this.data = data || {};
        this.modifyRole = {};
    }

    processResponse(res) {
        super.processResponse(res)
        if (res) {
            this.modifyRole = res;
            return true;
        }
        return false;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/modifyRole`;
    }

    getBody() {
        const loginRole = _.get(JSON.parse(sessionStorage.getItem('data')), 'Role');
        _.set(this.data, 'loginRole', loginRole)
        return this.data
    }

    getPayload() {
        return this.modifyRole;
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