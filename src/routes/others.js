import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "../components/layout";

import Blank from "../components/pages/others/blank";
import ErrorPage from "../components/pages/others/error-page";
import ForgotPassword from "../components/pages/others/forgot-password";
import LockedScreen from "../components/pages/others/locked-screen";
import LogViewer from "../components/pages/others/log-viewer";
import PageNotFound from "../components/pages/others/page-not-found";
import SessionTimeout from "../components/pages/others/session-timeout";
import SignIn from "../components/pages/others/sign-in";
import SignUp from "../components/pages/others/sign-up";
import TimeLine from "../components/pages/others/timeline";
import UserProfile from "../components/pages/others/user-profile";
import Invoice from "../components/pages/others/invoice";

export default function OtherPagesRoutes() {
  return (
    <Switch>
      <Route
        exact
        path={`/pages`}
        render={() => <Redirect to={`/pages/user-profile`} />}
      />

      <Route exact path={`/pages/forgot-password`} component={ForgotPassword} />
      <Route exact path={`/pages/locked-screen`} component={LockedScreen} />
      <Route exact path={`/pages/sign-in`} component={SignIn} />
      <Route exact path={`/pages/sign-up`} component={SignUp} />
      <Layout>
        <Route exact path={`/pages/404`} component={PageNotFound} />
        <Route exact path={`/pages/500`} component={ErrorPage} />
        <Route exact path={`/pages/blank`} component={Blank} />
        <Route exact path={`/pages/invoice`} component={Invoice} />
        <Route
          exact
          path={`/pages/session-timeout`}
          component={SessionTimeout}
        />
        <Route exact path={`/pages/timeline`} component={TimeLine} />
        <Route exact path={`/pages/user-profile`} component={UserProfile} />
        <Route exact path={`/pages/log-viewer`} component={LogViewer} />
      </Layout>
    </Switch>
  );
}
