import React, {Suspense} from 'react';
import {LayoutSplashScreen} from "../../../_metronic";
import {Redirect, Route, Switch} from "react-router-dom";
import Account from "../Account";
import UserRoute from "../../router/UserRoute";
import Home from "../Home";
import Login from "../auth/Login";
import Registration from "../auth/Registration";
import UserLayout from "../../Components/layout/user/UserLayout";
import {shallowEqual, useSelector} from "react-redux";
import KtContent from "../../../_metronic/layout/KtContent";
import LawyerDetails from "../../Components/users/LawyerDetails";
import LawyerList from "../lawyer/LawyersList";
import ChatPage from "../ChatPage";
import MyLawyers from "../../Components/users/MyLawyers";

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
        <UserRoute path="/lawyers/my" component={() => (
          <UserLayout>
            <KtContent><MyLawyers/></KtContent>
          </UserLayout>
        )} exact/>
        <Route path="/lawyer/details/:lawyerId" component={() => (
          <UserLayout>
            <KtContent><LawyerDetails/></KtContent>
          </UserLayout>
        )} exact/>
        <UserRoute path="/chat" component={() => (
          <UserLayout>
            <KtContent><ChatPage/></KtContent>
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