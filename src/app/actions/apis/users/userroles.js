/**
 * KPIGraph API
 */
import API from '../api';
import C from '../../constants';
import CONFIGS from '../../../configs/configs';

export default class ListRolesAPI extends API {
    
    constructor(timeout = 2000) {
        super('get', timeout, true);
        this.type = C.LIST_ROLES;
        this.rolesList = []; 
    }

    processResponse(res) {
        super.processResponse(res)
        if (res.status) {
            this.rolesList = res.data;
            return true;
        }
        return false;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/listAllRole`;
    }

    getBody() {
        // return {
        //     'kpi_name' : this.kpi_name
        // }
    }

    getPayload() {
        return this.rolesList;
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
            auth: {
                username: CONFIGS.DEV_SALT,
                password: CONFIGS.DEV_PEPPER
            },
            timeout: this.timeout
        }
    }
}