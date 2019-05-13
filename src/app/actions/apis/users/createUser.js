/**
 * KPIGraph API
 */
import API from '../api';
import C from '../../constants';
import _ from 'lodash';
// import CONFIGS from '../../configs/configs';

export default class createUserAPI extends API {
    constructor(userdata, timeout = 2000) {
        super('post', timeout, true);
        this.type = C.CREATE_USER;
        this.userdata = userdata;
        this.createUser = {}
    }

    processResponse(res) {
        super.processResponse(res)
        if (res) {
            this.createUser = res;
            return true;
        }
        return false;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/createUser`;
    }

    getPayload() {
        return this.createUser;
    }

    getBody() {
        const createdBy = _.get(JSON.parse(sessionStorage.getItem('data')), 'email');
        const opid = sessionStorage.getItem('opid');

        return {
            "CreatorName": "LOCALHOST",
            "FirstName": this.userdata.firstName,
            "LastName": this.userdata.lastName,
            "CreatorRole": "SuperUser",
            "OperatorName": "LOCALHOST",
            "OperatorId": opid,
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