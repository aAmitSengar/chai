/**
 * KPIGraph API
 */
import API from '../api';
import C from '../../constants';
import _ from 'lodash';
// import CONFIGS from '../../configs/configs';

export default class updateUserAPI extends API {
    constructor(userdata, timeout = 2000) {
        super('post', timeout, true);
        this.type = C.UPDATE_USER;
        this.userdata = userdata;
        this.updateUser = {}
    }

    processResponse(res) {
        super.processResponse(res)
        if (res) {
            this.updateUser = res;
            return true;
        }
        return false;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/modifyUser`;
    }

    getPayload() {
        return this.updateUser;
    }

    getBody() {
        const createdBy = _.get(JSON.parse(sessionStorage.getItem('data')), 'email');
        return {
            "CreatorName": "LOCALHOST",
            "FirstName": this.userdata.firstName,
            "LastName": this.userdata.lastName,
            "CreatorRole": "SuperUser",
            "OperatorName": "LOCALHOST",
            "UserName": this.userdata.email,
            "Email": this.userdata.email,
            "Mobile": this.userdata.mobile,
            "UserRole": this.userdata.role,
            "VLPList": this.userdata.VLPList,
            "CreatedBy": createdBy || "LOCALHOST"
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