import {
  Navigate,
  Route,
  Routes,
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import { AUTH_ROUTES, PRIVATE_ROUTES } from "./routeConfig";
import RequiredAuth from "./RequiredAuth";
import { Suspense } from "react";
import useLocalStorage from "../utils/useLocalStorage";
import { PATHS } from "../utils/Constants";

const PageRoutes = () => {
  const [currentUser] = useLocalStorage("currentLoggedInUser", []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {AUTH_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}

          {PRIVATE_ROUTES.map(({ path, component: Component, children }) => (
            <Route
              key={path}
              path={path}
              element={
                <RequiredAuth>
                  <Component />
                </RequiredAuth>
              }
            >
              {children?.map(
                ({ path: childPath, component: ChildComponent }) => (
                  <Route
                    key={childPath}
                    path={childPath}
                    element={<ChildComponent />}
                  />
                )
              )}
              <Route path="" element={<Navigate to={PATHS.home} replace />} />
            </Route>
          ))}

          <Route
            path=""
            element={
              currentUser[0]?.isLoggedIn ? (
                <Navigate to={PATHS.home} replace />
              ) : (
                <Navigate to={PATHS.login} replace />
              )
            }
          />

          <Route
            path="*"
            element={
              <div>
                Page Not Found! Navigate to home? <br />
                <Link to="/home">Go to Home</Link>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default PageRoutes;
