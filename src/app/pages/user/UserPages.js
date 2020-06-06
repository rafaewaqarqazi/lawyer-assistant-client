import React, {Suspense} from 'react';
import {LayoutSplashScreen} from "../../../_metronic";
import {Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "../lawyer/Dashboard";
import JobDetails from "../../Components/jobs/JobDetails";
import Account from "../Account";
import UserRoute from "../../router/UserRoute";
import JobsApplied from "./JobsApplied";
import Interviews from "../lawyer/Interviews";
import Tests from "../lawyer/Tests";
import Applications from "../lawyer/Jobs/Applications";
import Home from "../Home";
import Login from "../auth/Login";
import Registration from "../auth/Registration";
import UserLayout from "../../Components/layout/user/UserLayout";
import {shallowEqual, useSelector} from "react-redux";
import KtContent from "../../../_metronic/layout/KtContent";
import LawyerDetails from "../../Components/users/LawyerDetails";
import LawyerList from "../lawyer/LawyersList";

const UserPages = () => {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  );
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>

        <Route path="/" component={Home} exact/>
        { !isAuthorized && <Route path="/auth/login" component={Login} exact/>}
        { !isAuthorized && <Route path="/auth/registration" component={Registration} exact/>}
        <Route path="/lawyers/list" component={() => (
          <UserLayout>
            <KtContent><LawyerList/></KtContent>
          </UserLayout>
        )} exact/>
        <Route path="/lawyer/details/:lawyerId" component={() => (
          <UserLayout>
            <KtContent><LawyerDetails/></KtContent>
          </UserLayout>
        )} exact/>
        <Route path="/blogs" component={() => (
          <UserLayout>
            <KtContent><Applications/></KtContent>
          </UserLayout>
        )} exact/>
        <Route path="/blogs/:blogId" component={() => (
          <UserLayout>
            <KtContent><Interviews/></KtContent>
          </UserLayout>
        )} exact/>
        <UserRoute path="/account" component={() => (
          <UserLayout>
            <KtContent><Account/></KtContent>
          </UserLayout>
        )} exact/>
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
};

export default UserPages;