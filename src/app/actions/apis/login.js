/**
 * Login API
 */
import API from './api';
import C from '../constants';

export default class LoginAPI extends API {
    constructor(email, password, role, timeout = 2000) {
        super('POST', timeout, false);
        this.type       = C.LOGIN;

        this.email      = email;
        this.password   = password;
        this.role       = role;

        this.assignedMenu   = null;
        this.operatorName   = null;
        this.permissions    = null;
        this.lastName       = null;
        this.firstName      = null;
        this.opid           = null;
        this.userName       = null;

        this.token          = null;
        this.expires        = null;
        this.userid         = null;

    }

    toString() {
        return `${super.toString()} email: ${this.email} role: ${this.role} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`
    }

    processResponse(res) {
        super.processResponse(res)
        if (res.status && res.data.token) {
            this.token          = res.data.token;
            this.role           = res.data.loginRole;
            this.menu           = res.data.assignedMenu;
            this.operatorName   = res.data.operatorName;
            this.permissions    = res.data.permissions;
            this.lastName       = res.data.lastName;
            this.firstName      = res.data.firstName;
            this.opid           = res.data.opid;
            this.userName       = res.data.userName;
            this.email          = res.data.email;
    
            sessionStorage.setItem('token', this.token)
            sessionStorage.setItem('email', this.email)
            sessionStorage.setItem('opid', this.opid);
            sessionStorage.setItem('data', JSON.stringify(res.data))
            return true;
        }
        return false;
    }

    apiEndPoint() {
        return `${super.apiEndPoint()}/LoginAuth`;
    }

    getBody() {
        return {
            'email' : this.email,
            'password' : this.password,
            'role' : this.role,
            'userid' : this.userid,
            'name': this.name
        }
    }

    getHeaders() {
        return {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }

    getPayload() {
        return {
            email: this.email,
            token: this.token,
            role: this.role,
            name: this.name,
            userid: this.userid,
            menu: this.menu,
            operatorName: this.operatorName,
            permissions: this.permissions,
            lastName: this.lastName,
            firstName: this.firstName,
            opid: this.opid,
            userName: this.userName
        }
    }

    getCustomConfigs() {
        return {
            timeout: this.timeout
        }
    }
}