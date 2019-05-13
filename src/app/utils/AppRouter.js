import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { hasRoutePermission } from './AuthPermissions';

import Login from '../components/login/Login';
import Home from '../components/home/Home';
// import Monitor from '../components/Monitor/Monitor';
// import KPI from '../components/authenticated/KPI/KPI';
// import KPIEvents from '../components/authenticated/KpiEvents/KpiEvent';
// import KPITasks from '../components/authenticated/KpiTasks/KpiTasks';
// import HeatMap from '../components/authenticated/Heatmap/HeatMap';
import User from '../components/authenticated/User/User';
// import Configure from '../components/authenticated/Configure/Configure';
// import ManageKpi from '../components/authenticated/KPI/ManageKpi/ManageKpi';
// import KpiBuilder from '../components/authenticated/KpiBuilder/KpiBuilder';
// import Alert from '../components/authenticated/Alerts/Alert';
import Forgot from '../components/common/forgot';
import ResetPassword from '../components/common/ResetPassword';
import NotFound from '../components/common/NotFound';
// import Notify from '../components/authenticated/Notify/Notify';


const PrivateRoute = ({ component: Component, authenticate, ...rest }) => {
    // let _hasPerpission = rest.RoleKey === "USERS" ? hasRoutePermission(rest.RoleKey) || hasRoutePermission("ROLES") : hasRoutePermission(rest.RoleKey);
    let _hasPerpission=true;
    return (
        <Route {...rest} render={(props) => authenticate
            ?
            (_hasPerpission
                ?
                <Component {...props} />
                : <NotFound />
            )
            :
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}
            />}
        />
    )
}

class AppRouter extends Component {
    authenticateUser = () => {
        // let token = sessionStorage.getItem('token');
        // if (token) {
            return true;
        // }
        // return false;
    }

    render() {
        return (

            //<BrowserRouter> 
            // <Route path="/" render={props => { const subdomain = window.location.hostname.split('.'); 
            // if (subdomain && subdomain.length > 1) 
            // return <PartnerLayout {...props} subdomain={subdomain[0]}/>; return <AppLayout {...props}/>; }}/> 
            // </BrowserRouter>
            <Switch >
                <Route exact path="/" component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/forgot" component={Forgot} />
                <Route exact={true} path="/resetPassword/:id" component={ResetPassword} />
                <PrivateRoute path="/home" component={Home} RoleKey={"DASHBOARD"} authenticate={this.authenticateUser()}  />
                               
                <PrivateRoute path="/user" RoleKey={"USERS"} component={User}  authenticate={this.authenticateUser()}/>            
            </Switch>
        );

    }

}

export default AppRouter;