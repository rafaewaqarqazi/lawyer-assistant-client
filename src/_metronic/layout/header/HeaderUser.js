import React from 'react';
import Topbar from "./Topbar";
import Brand from "../brand/Brand";
import {NavLink} from "react-router-dom";
import {shallowEqual, useSelector} from "react-redux";
import * as routerHelpers from "../../../app/router/RouterHelpers";

const HeaderUser = () => {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null
    }),
    shallowEqual
  );
  return (
    <div className="kt-header kt-grid__item" style={{position: 'fixed', top: 0, right: 0, left: 0, zIndex: 1000}}>
      <div className="kt-header-menu-wrapper flex-grow-1" >
        <div className="container d-flex align-items-center">
          <Brand/>
          <NavLink to="/lawyers/list" activeClassName='active' className="header-link ml-4">Lawyers List</NavLink>
          {
            isAuthorized &&
            <NavLink to="/lawyers/my" activeClassName='active' className="header-link ">My Lawyers</NavLink>
          }
          {
            isAuthorized &&
            <NavLink to="/cases/my" activeClassName='active' className="header-link ">My Cases</NavLink>
          }
          {
            isAuthorized &&
            <NavLink to="/dashboard" activeClassName='active' className="header-link ">Dashboard</NavLink>
          }

        </div>
      </div>
      <Topbar />
    </div>
  );
};

export default HeaderUser;
