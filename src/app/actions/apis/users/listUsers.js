/**
 * KPIGraph API
 */
import API from '../api';
import C from '../../constants';
import _ from 'lodash';

export default class ListUsersAPI extends API {

    constructor(timeout = 2000) {
        super('post', timeout, true);
        this.type = C.LIST_USERS;
        this.usersList = [];
    }

    processResponse(res) {
        super.processResponse(res)
        if (res) {
            this.usersList = res.data;
            return true;
        }
        return false;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/listAllUser`;
    }

    getBody() {
        const userName = _.get(JSON.parse(sessionStorage.getItem('data')), 'email');
        const operatorName = _.get(JSON.parse(sessionStorage.getItem('data')), 'operatorName');
        return {
            "OperatorName": operatorName,
            "UserName": userName
        }
    }

    getPayload() {
        return this.usersList;
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