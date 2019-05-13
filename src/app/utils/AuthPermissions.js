import _ from 'lodash';
class AuthPermissions {
    constructor() {
        this.currentPrivileges = getPrivileges()
    }

}

function getPrivileges() {
    const rawData = sessionStorage.getItem('data');
    var data = JSON.parse(rawData || '{}');
    if (data && data.assignedMenu) {
        var prev = JSON.parse(data.assignedMenu)
        return prev;
    }
    return {};
}

export function hasRoutePermission(RoleKey, RoleAction) {
    // let permission = new AuthPermissions();

    // let _hasPermission = false;
    // if (permission.currentPrivileges) {
    //     _.each(permission.currentPrivileges, function (role) {
    //         if (RoleKey === role.key && role.isActive) {
    //             // console.log(role.key);
    //             // console.log(role.isActive)
    //             _hasPermission = true; 
    //         }
    //     })
    //     return _hasPermission;
    // }
    // return false;
    return true;
}

export default function hasPermission(RoleKey, RoleAction) {
    // let permission = new AuthPermissions();

    // let _hasPermission = false;
    // if (permission.currentPrivileges) {
    //     _.each(permission.currentPrivileges, function (role) {
    //         if (RoleKey === role.key && role.isActive) {
    //             // console.log(role.key);
    //             // console.log(role.isActive)
    //             _.each(role.privileges, function (item) {
    //                 if ((RoleAction === item.key && item.isActive)|| RoleAction === 'ALLOW') {
    //                     _hasPermission = true;
    //                     // console.log("---------", item.key)
    //                     // console.log("---------", item.isActive)
    //                 }

    //             })
    //         }
    //     })
    //     return _hasPermission;
    // }
    // return false;
    return true;
}




// module.exports = {
//     hasPermission,
//     hasRoutePermission
// }