/**
 * KPIGraph API
 */
import API from '../api';
import C from '../../constants';
import CONFIGS from '../../../configs/configs';

export default class RolesPrivilegesAPI extends API {

    constructor(timeout = 2000) {
        super('get', timeout, true);
        this.type = C.ROLE_PRIVILEGE;
        this.privilegesList = {};
    }

    processResponse(res) {
        super.processResponse(res)
        if (res) {
            this.privilegesList = res.data;
            return true;
        }
        return false;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/a`;
    }

    getBody() {
        return this.data
    }

    getPayload() {
        return this.privilegesList;
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