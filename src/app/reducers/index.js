import login from './umc/login';
import apistatus from './apistatus/apistatus';
import navdrawer from './navdrawer/navdrawer';



import usersList from './users/listUsers';
import createUser from './users/createUser';
import deleteUser from './users/deleteUser';
import updateUser from './users/modifyUser';
import rolesList from './users/rolesList';

import privilegesList from "./RolesPrivilege/privilegesList";
import createRole from "./RolesPrivilege/createRole";
import modifyRole from "./RolesPrivilege/modifyRole";
import deleteRole from "./RolesPrivilege/deleteRole";



import forgotpassword from './umc/forgot';
import resetPassword from './umc/resetPassword';
import resetPwdCheck from './umc/resetPwdCheck';
import changePassword from './umc/changePassword';

import listProducts from './product/listProducts';

import createCenter from './centers/createCenter';
import deleteCenter from './centers/deleteCenter';
import listCenter from './centers/listCenter';
import modifyCenter from './centers/modifyCenter';


import createParent from './parents/createParent';
import deleteParent from './parents/deleteParent';
import listParent from './parents/listParent';
import modifyParent from './parents/modifyParent';



export default {
    login: login,

    apistatus: apistatus,
    navdrawer: navdrawer,

    forgotPasswordRes: forgotpassword,
    usersList: usersList,


    rolesList: rolesList,

    createUser: createUser,
    privilegesList: privilegesList,
    createRole: createRole,
    modifyRole: modifyRole,
    deleteRole: deleteRole,
    deleteUser: deleteUser,
    updateUser: updateUser,

    resetPassword: resetPassword,

    resetPwdCheck: resetPwdCheck,
    changePassword: changePassword,

    productList: listProducts,


    createCenter: createCenter,
    deleteCenter: deleteCenter,
    CentersList: listCenter,
    updateCenter: modifyCenter,

    createParent: createParent,
    deleteParent: deleteParent,
    parentsList: listParent,
    updateParent: modifyParent

};