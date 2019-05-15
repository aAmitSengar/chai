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

import listProducts from './product/listProducts'



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

    productList: listProducts

};