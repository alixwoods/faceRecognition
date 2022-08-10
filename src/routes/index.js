import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";

import Layout from "../components/layout";

let Dashboard = React.lazy(() => import("./dashboard"));
let MediaPages = React.lazy(() => import("./media"));
let TagsEdit = React.lazy(() => import("../components/pages/tags/tags-edit"));
let CategoriesEdit = React.lazy(() =>
  import("../components/pages/categories/categories-edit")
);
let ProductsPages = React.lazy(() => import("./products"));
let PostsPages = React.lazy(() => import("./posts"));
let EcommercePages = React.lazy(() => import("./ecommerce"));
let UsersPages = React.lazy(() => import("./users"));
let MultivendorPages = React.lazy(() => import("./multivendor"));
let ElementsPages = React.lazy(() => import("./elements"));
let FormsPages = React.lazy(() => import("./forms"));
let TablesPages = React.lazy(() => import("./tables"));
let OtherPages = React.lazy(() => import("./others"));
let UserManagement = React.lazy(() => import("./UserMangement/UserManagement"));
let signUp = React.lazy(() => import("./signUp"));
let FinishToken = React.lazy(() => import("./FinishToken/FinishToken"));
let Comments = React.lazy(() => import("./Comments"));
let Reports = React.lazy(() => import("./Reports"));
let AccessUsers = React.lazy(() => import("./AccessUsers/AccessUsers"));
let ManageAccess = React.lazy(() => import("./ManageAccess/ManageAccess"));
let ChangePassword = React.lazy(() =>
  import("./changePassword/changePassword")
);
let LoanCalculate = React.lazy(() => import("./LoanCalculate"));
let DealingItems = React.lazy(() => import("./DealingItems"));
let Buyers = React.lazy(() => import("./Buyers"));
let Loans = React.lazy(() => import("./Loans"));
let Action = React.lazy(() => import("./Action"));
let EditProfile = React.lazy(() => import("./EditProfile"));
let deals = React.lazy(() => import("./deals"));
let handicaps = React.lazy(() => import("./handicaps"));
let monthly = React.lazy(() => import("./monthly"));
let noLoan = React.lazy(() => import("./noLoan"));
let moratorium = React.lazy(() => import("./moratorium"));
let DealDetail = React.lazy(() => import("./detailTest"));
let CheckClearing = React.lazy(() => import("./CheckClearing"));
let Postponement = React.lazy(() => import("./Postponement"));
let Obligation = React.lazy(() => import("./obligation"));
let Kartable = React.lazy(() => import("./Kartable"));

let Acceleration = React.lazy(() => import("./Acceleration"));
let ChecksReport = React.lazy(() => import("./ChecksReport"));

let FaceRecognition = React.lazy(() => import("./FaceRecognition"));

export default function Routes() {
  return (
    <HashRouter>
      <React.Suspense
        fallback={
          <div className="loading-overlay">
            <div className="bounce-loader">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
        }
      >
        <Switch>
          <Route path={`/pages`} component={OtherPages} />
          <Route path={`/signUp`} component={signUp} />
          <Route path={`/FinishToken`} component={FinishToken} />

          <Layout>
            <Route exact path={`/`} component={Dashboard} />
            <Route exact path={`/media`} component={MediaPages} />
            <Route exact path={`/ManageAccess`} component={ManageAccess} />
            <Route exact path={`/Comments`} component={Comments} />{" "}
            <Route exact path={`/Reports`} component={Reports} />
            <Route exact path={`/AccessUsers`} component={AccessUsers} />
            <Route path={`/UserManagement`} component={UserManagement} />
            <Route path={`/changePassword`} component={ChangePassword} />
            <Route path={`/DealingItems`} component={DealingItems} />
            <Route path={`/Action`} component={Action} />
            <Route path={`/EditProfile`} component={EditProfile} />
            <Route path={`/deals`} component={deals} />
            <Route path={`/monthly`} component={monthly} />
            <Route path={`/handicaps`} component={handicaps} />
            <Route path={`/ChecksReport`} component={ChecksReport} />
            <Route path={`/Loans`} component={Loans} />
            <Route path={`/moratorium`} component={moratorium} />
            <Route path={`/noLoan`} component={noLoan} />
            <Route path={`/Buyers`} component={Buyers} />
            <Route path={`/LoanCalculate`} component={LoanCalculate} />
            <Route path={`/products`} component={ProductsPages} />
            <Route path={`/posts`} component={PostsPages} />
            <Route exact path={`/tags/:id`} component={TagsEdit} />
            <Route exact path={`/categories/:id`} component={CategoriesEdit} />
            <Route path={`/ecommerce`} component={EcommercePages} />
            <Route path={`/multivendor`} component={MultivendorPages} />
            <Route path={`/users`} component={UsersPages} />
            <Route path={`/elements`} component={ElementsPages} />
            <Route path={`/forms`} component={FormsPages} />
            <Route path={`/tables`} component={TablesPages} />
            <Route path={`/DealDetail`} component={DealDetail} />
            <Route path={`/CheckClearing`} component={CheckClearing} />
            <Route path={`/Postponement`} component={Postponement} />
            <Route path={`/Obligation`} component={Obligation} />
            <Route path={`/Kartable`} component={Kartable} />

            <Route path={`/Acceleration`} component={Acceleration} />
            <Route path={`/FaceRecognition`} component={FaceRecognition} />

          </Layout>
        </Switch>
      </React.Suspense>
    </HashRouter>
  );
}
