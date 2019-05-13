/**
 * KPIGraph API
 */
import API from '../api';
import C from '../../constants';

export default class DeleteRoleAPI extends API {

    constructor(roleName, timeout = 2000) {
        super('post', timeout, true);
        this.type = C.ROLE_PRIVILEGE_DELETE;
        this.roleName = roleName;
        this.deleteRole = {};
    }

    processResponse(res) {
        super.processResponse(res)
        if (res) {
            this.deleteRole = res;
            return true;
        }
        return false;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/deleteRole`;
    }

    getBody() {
        return {
            'role': this.roleName
        };
    }

    getPayload() {
        return this.deleteRole
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